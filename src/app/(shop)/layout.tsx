import { Footer, Sidebar, TopMenu } from "@/components";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-svh">
      <TopMenu />
      <Sidebar />
      <div className="px-0 sm:px-10">{children}</div>
      <Footer />
    </main>
  );
}
