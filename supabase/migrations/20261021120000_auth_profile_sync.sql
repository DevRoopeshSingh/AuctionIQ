-- T4 scaffolding only. Applied after A17 provisioning.
-- Do not run until the approved Supabase project and auth schema are available.
CREATE OR REPLACE FUNCTION public.sync_auth_user_to_profile()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', '')
  )
  ON CONFLICT (id) DO UPDATE
    SET full_name = COALESCE(NULLIF(profiles.full_name, ''), EXCLUDED.full_name);
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.sync_auth_user_to_profile();
