import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";
import { Card } from "@/components/ui/primitives";

export default function SignupPage() {
  return <AuthScaffold title="Create an account" action="signUp" />;
}

function AuthScaffold({ title, action }: { title: string; action: "signUp" | "signIn" | "resetPassword" }) {
  return (
    <section className="mx-auto max-w-lg px-4 py-12">
      <Card>
        <h1 className="font-display text-2xl font-semibold text-navy">{title}</h1>
        <p className="mb-6 mt-2 text-sm text-charcoal/70">Account access is scaffolded and will be enabled after provider setup.</p>
        <AuthForm action={action} />
        <nav aria-label="Account access" className="mt-5 flex gap-4 text-sm underline">
          <Link href="/auth/login">Sign in</Link>
          <Link href="/auth/reset">Reset password</Link>
        </nav>
      </Card>
    </section>
  );
}
