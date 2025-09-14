import { FormProvider, useForm, type Resolver } from "react-hook-form";
import UserUpdatePasswordFormFields from "../molecules/Users/UserUpdatePasswordFormFields";
import { useDialogStore } from "../../Zustand/stores/DialogStore";
import {
  UserUpdatePasswordSchema,
  type UserUpdatePasswordValues,
} from "../../models/UserModels/User.model";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserPassword } from "../../utils/connections";
import { useAuthStore } from "../../Zustand/stores/AuthStore";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useFormValuesStore } from "../../Zustand/stores/FormValueStore";

export default function UserUpdatePasswordForm() {
  const { tenantId } = useParams();
  const { getValue } = useFormValuesStore();

  const methods = useForm<UserUpdatePasswordValues>({
    mode: "onBlur",
    resolver: zodResolver(
      UserUpdatePasswordSchema
    ) as unknown as Resolver<UserUpdatePasswordValues>,
  });

  const { jwt } = useAuthStore();
  const { setDialogStatus } = useDialogStore();

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      if (!tenantId) return;
      await updateUserPassword(
        data,
        jwt,
        tenantId,
        getValue("passwordResetForm", "userId")
      );
      setDialogStatus("passwordResetForm", false);
      toast.success("Usuario editado exitosamente");
    } catch (error) {
      console.error("Error updating password:", error);
    }
  });

  return (
    <FormProvider {...methods}>
      <header className="flex w-full text-center">
        <h2 className="text-2xl font-bold w-full">Restablecer Contraseña</h2>
      </header>
      <form onSubmit={onSubmit} className="flex flex-col p-4">
        <UserUpdatePasswordFormFields />
      </form>
      <footer className="flex justify-between p-4">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setDialogStatus("passwordResetForm", false)}
        >
          Cancelar
        </button>
        <button type="submit" className="btn btn-primary" onClick={onSubmit}>
          Actualizar Usuario
        </button>
      </footer>
    </FormProvider>
  );
}
