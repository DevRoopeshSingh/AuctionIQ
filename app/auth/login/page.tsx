import { AuthForm } from "@/components/auth/auth-form";
import { Card } from "@/components/ui/primitives";

export default function LoginPage() {
  return (
    <section className="mx-auto max-w-lg px-4 py-12">
      <Card>
        <h1 className="font-display text-2xl font-semibold text-navy">Sign in</h1>
        <p className="mb-6 mt-2 text-sm text-charcoal/70">Account access is scaffolded and will be enabled after provider setup.</p>
        <AuthForm action="signIn" />
      </Card>
    </section>
  );
}
