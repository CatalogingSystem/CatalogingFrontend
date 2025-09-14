import PasswordIcon from "@mui/icons-material/Password";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import type { User } from "../pages/UsersListPage";
import { useDialogStore } from "../../Zustand/stores/DialogStore";
import { useFormValuesStore } from "../../Zustand/stores/FormValueStore";

interface Props {
  user: User;
}

export default function UserCard({ user }: Props) {
  const { setValue, initializeFormValues } = useFormValuesStore();
  const { setDialogStatus } = useDialogStore();

  const roleColor = (role: string) => {
    switch (role) {
      case "Director":
        return "role-director text-white";
      case "Investigador":
        return "role-researcher text-white";
      default:
        return "text-gray-500";
    }
  };

  const permissionLevelColor = (level?: string) => {
    switch (level) {
      case "ReadOnly":
        return "role-read-only text-white";
      case "ReadWrite":
        return "role-modification text-white";
      default:
        return "role-admin text-white";
    }
  };
  const getPermissionLevelLabel = (level?: string) => {
    switch (level) {
      case "ReadOnly":
        return "Solo Lectura";
      case "ReadWrite":
        return "Modificación";
      default:
        return "Todos";
    }
  };

  return (
    <tr className="grid grid-cols-11 p-2">
      <td className="col-span-4">{user.userName}</td>
      <td className={`col-span-3`}>
        <span className={`p-2 ${roleColor(user.role)} rounded font-semibold`}>
          {user.role}
        </span>
      </td>
      <td className={`col-span-3`}>
        <span
          className={`p-2 rounded font-semibold ${permissionLevelColor(
            user.permissionLevel
          )}`}
        >
          {getPermissionLevelLabel(user.permissionLevel)}
        </span>
      </td>
      <td className="col-span-1">
        <button
          className="btn btn-ghost w-8 h-8"
          onClick={() => {
            setDialogStatus("passwordResetForm", true);
            initializeFormValues("passwordResetForm", user);
            setValue("passwordResetForm", "userId", user.id);
          }}
        >
          <PasswordIcon />
        </button>
        <button
          className="btn btn-ghost w-8 h-8"
          onClick={() => {
            setDialogStatus("userEditForm", true);
            initializeFormValues("userEditForm", user);
            setValue("userEditForm", "userId", user.id);
          }}
        >
          <EditOutlinedIcon />
        </button>
      </td>
    </tr>
  );
}
