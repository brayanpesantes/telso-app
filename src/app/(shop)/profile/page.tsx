import { auth } from "@/auth.config";
import { Title } from "@/components";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/login?callbackUrl=/profile");
  }
  return (
    <div>
      <Title title="Perfil" />
      <pre> {JSON.stringify(session?.user, null, 2)}</pre>
      <h3>{session.user.role}</h3>
    </div>
  );
}
