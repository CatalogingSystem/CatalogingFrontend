import { useCallback, useEffect, useState } from "react";
import { useSideBarStore } from "../../Zustand/stores/SidebarStore";
import { useAuthStore } from "../../Zustand/stores/AuthStore";
import { getUsers } from "../../utils/connections";
import UserCard from "../organinsms/UserCard";
import DialogTemplate from "../templates/DialogTemplate";
import UserForm from "../organinsms/UserForm";
import { useDialogStore } from "../../Zustand/stores/DialogStore";
import PaginatedListTemplate from "../templates/PaginatedListTemplate";
import { useNavigate, useParams } from "react-router-dom";
import UpdateUserForm from "../organinsms/UpdateUserForm";
import { useListStore } from "../../Zustand/stores/ListStore";
import UserUpdatePasswordForm from "../organinsms/UserUpdatePasswordForm";

export interface User {
  id: number;
  userName: string;
  role: string;
  permissionLevel?: string;
}

export default function UsersListPage() {
  const { tenantId } = useSideBarStore();
  const { jwt } = useAuthStore();
  const { page } = useParams();
  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const { setDialogStatus } = useDialogStore();
  const { setRefreshFunction, reset } = useListStore();

  const fetchUsers = useCallback(async () => {
    if (!tenantId || !jwt || !page || isNaN(Number(page))) return;

    try {
      const res = await getUsers(jwt, tenantId, parseInt(page), 12);
      setUsers(res.items);
      setTotalUsers(res.totalItems);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, [tenantId, jwt, page]);

  const handlePageChange = ({ selected }: { selected: number }) => {
    navigate(`/${tenantId}/users/${selected + 1}`);
  };

  useEffect(() => {
    fetchUsers();
    setRefreshFunction(fetchUsers);

    return () => {
      reset();
    };
  }, [fetchUsers, reset, setRefreshFunction]);

  return (
    <PaginatedListTemplate
      title="Usuarios"
      totalItems={totalUsers}
      items={users}
      onCreate={() => setDialogStatus("userCreateForm", true)}
      pageCount={Math.ceil(totalUsers / 12)}
      onPageChange={handlePageChange}
    >
      <table className="flex flex-col w-full bordered-list p-2">
        <thead className="bg-base-200 p-2 m-2">
          <tr className="grid grid-cols-11 text-left">
            <th className="col-span-4">Nombre de Usuario</th>
            <th className="col-span-3">Rol</th>
            <th className="col-span-3">Nivel de Permiso</th>
            <th className="col-span-1">Acciones</th>
          </tr>
        </thead>
        <tbody className="flex flex-col bg-base-200 m-2 py-2 h-[70vh] overflow-y-auto">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </tbody>
      </table>

      <DialogTemplate
        onClose={() => setDialogStatus("userCreateForm", false)}
        dialogId="userCreateForm"
      >
        <UserForm />
      </DialogTemplate>
      <DialogTemplate
        onClose={() => setDialogStatus("passwordResetForm", false)}
        dialogId="passwordResetForm"
      >
        <UserUpdatePasswordForm />
      </DialogTemplate>
      <DialogTemplate
        onClose={() => setDialogStatus("userEditForm", false)}
        dialogId="userEditForm"
      >
        <UpdateUserForm />
      </DialogTemplate>
    </PaginatedListTemplate>
  );
}
