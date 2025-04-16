import { getPaginateUsers } from "@/actions";
import { Title } from "@/components";

import { redirect } from "next/navigation";
import { UsersTable } from "./ui/users-table";

export default async function OrdersPage() {
  const { ok, users = [] } = await getPaginateUsers();
  if (!ok) {
    redirect("/");
  }
  return (
    <>
      <Title title="Mantenimiento de Usuarios" />

      <div className="mb-10">
        <UsersTable users={users} />
      </div>
    </>
  );
}
