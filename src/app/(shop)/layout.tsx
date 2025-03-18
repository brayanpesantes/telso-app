import { Sidebar, TopMenu } from "@/components";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-svh px-5">
      <TopMenu />
      <Sidebar />
      <div className="px-0 sm:px-10">{children}</div>
    </main>
  );
}
