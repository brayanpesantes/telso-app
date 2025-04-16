"use client";

import { ChangeUserRole } from "@/actions";
import { User } from "@/interface";

interface Props {
  users: User[];
}
export const UsersTable = ({ users }: Props) => {
  return (
    <table className="min-w-full">
      <thead className="bg-gray-200 buser-b">
        <tr>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            email
          </th>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            Nombre completo
          </th>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            Rol
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr
            className="bg-white buser-b transition duration-300 ease-in-out hover:bg-gray-100"
            key={user.id}
          >
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {user.email}
            </td>
            <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {user.name}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 ">
              <select
                value={user.role}
                onChange={(e) => ChangeUserRole(user.id, e.target.value)}
              >
                <option value="ADMIN">ADMIN</option>
                <option value="USER">USER</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
