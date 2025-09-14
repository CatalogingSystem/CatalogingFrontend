import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import {
  UserSchema,
  type UserFormValues,
} from "../../models/UserModels/User.model";
import FormInput from "../atoms/FormInput";
import { useSideBarStore } from "../../Zustand/stores/SidebarStore";
import FormSelect from "../atoms/FormSelect";
import { useEffect, useState } from "react";
import { useDialogStore } from "../../Zustand/stores/DialogStore";
import { postUser } from "../../utils/connections";
import { useAuthStore } from "../../Zustand/stores/AuthStore";
import toast from "react-hot-toast";

const UserRole = ["Director", "Investigador"];
const UserPermissionLevel = [
  { label: "Solo Lectura", value: "ReadOnly" },
  { label: "Modicación", value: "ReadWrite" },
];

export default function UserForm() {
  const { tenantId } = useSideBarStore();
  const { jwt } = useAuthStore();
  const [isResearcher, setIsResearcher] = useState<boolean>(false);
  const { setDialogStatus } = useDialogStore();

  const methods = useForm<UserFormValues>({
    resolver: zodResolver(UserSchema),
    mode: "onBlur",
    defaultValues: {
      tenantId: tenantId,
    },
  });

  const roleWatched = useWatch({
    control: methods.control,
    name: ["role"],
  });

  const onSubmit = async (data: UserFormValues) => {
    if (!jwt || !tenantId) return;

    try {
      await postUser(data, jwt, tenantId);
      setDialogStatus("userCreateForm", false);
      toast.success("Usuario creado exitosamente");
    } catch {
      toast.error("Error al crear usuario. Por favor, inténtalo de nuevo.");
    }
  };

  useEffect(() => {
    if (!methods.formState.isSubmitting) return;

    if (methods.formState.errors) {
      const errorMessages = Object.values(methods.formState.errors).map(
        (error) => error.message
      );
      for (const error of errorMessages) {
        toast.error(error ? error : "Error desconocido");
      }
    }
  }, [methods.formState.errors, methods.formState.isSubmitting]);

  useEffect(() => {
    const role = roleWatched[0];
    setIsResearcher(role === "Investigador");
    if (role === "Director") {
      methods.setValue("permissionLevel", null);
    } else if (
      role === "Investigador" &&
      !methods.getValues("permissionLevel")
    ) {
      methods.setValue("permissionLevel", "ReadOnly");
    }
  }, [methods, roleWatched]);

  return (
    <FormProvider {...methods}>
      <header className="flex w-full text-center">
        <h2 className="text-2xl font-bold w-full">Crear Usuario</h2>
      </header>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col p-4"
      >
        <FormInput name="username" label="Nombre" register={methods.register} />
        <FormInput
          name="password"
          label="Contraseña"
          type="password"
          register={methods.register}
        />
        <FormSelect
          defaultValue="Selecciona un Rol"
          label="Rol de usuario"
          name="role"
          options={UserRole}
          register={methods.register}
        />
        {isResearcher && (
          <FormSelect
            name="permissionLevel"
            label="Nivel de permiso"
            options={UserPermissionLevel}
            register={methods.register}
          />
        )}
      </form>
      <section className="flex justify-between p-4">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setDialogStatus("userCreateForm", false)}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={methods.handleSubmit(onSubmit)}
        >
          Crear Usuario
        </button>
      </section>
    </FormProvider>
  );
}
