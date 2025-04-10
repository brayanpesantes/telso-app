export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  //   const session = await auth();
  //   if (!session?.user) {
  //     redirect("/auth/login?callbackUrl=/cheackout/address");
  //   }
  return <>{children}</>;
}
