import { useEffect, useState } from "react";
import { useAuthStore } from "../../Zustand/stores/AuthStore";
import { useSideBarStore } from "../../Zustand/stores/SidebarStore";
import { useDialogStore } from "../../Zustand/stores/DialogStore";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UserPermissionLevel,
  UserRole,
  UserUpdateSchema,
  type UserUpdateValues,
} from "../../models/UserModels/User.model";
import { putUser } from "../../utils/connections";
import toast from "react-hot-toast";
import FormInput from "../atoms/FormInput";
import FormSelect from "../atoms/FormSelect";
import { useFormValuesStore } from "../../Zustand/stores/FormValueStore";
import { useListStore } from "../../Zustand/stores/ListStore";

export default function UpdateUserForm() {
  const { tenantId } = useSideBarStore();
  const { getValue } = useFormValuesStore();
  const { jwt } = useAuthStore();
  const [isResearcher, setIsResearcher] = useState<boolean>(false);
  const { setDialogStatus } = useDialogStore();
  const { refreshFunction } = useListStore();

  const methods = useForm<UserUpdateValues>({
    resolver: zodResolver(UserUpdateSchema),
    mode: "onBlur",
    defaultValues: {
      tenantId: tenantId,
    },
  });

  useEffect(() => {
    methods.reset({
      username: getValue("userEditForm", "userName"),
      role: getValue("userEditForm", "role"),
    });
  }, [getValue, methods]);

  const roleWatched = useWatch({
    control: methods.control,
    name: ["role"],
  });

  const onSubmit = async (data: UserUpdateValues) => {
    if (!jwt || !tenantId) return;

    try {
      await putUser(data, jwt, tenantId, getValue("userEditForm", "userId"));
      setDialogStatus("userEditForm", false);
      toast.success("Usuario editado exitosamente");
      refreshFunction();
    } catch {
      toast.error("Error al editar usuario. Por favor, inténtalo de nuevo.");
    }
  };

  useEffect(() => {
    if (!tenantId) return;
    methods.setValue("tenantId", tenantId);
  }, [methods, tenantId]);

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
        <h2 className="text-2xl font-bold w-full">Actualizar Usuario</h2>
      </header>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col p-4"
      >
        <FormInput name="username" label="Nombre" register={methods.register} />
        <FormSelect
          defaultValue="Selecciona un Rol"
          label="Rol de usuario"
          name="role"
          options={[...UserRole]}
          register={methods.register}
        />
        {isResearcher && (
          <FormSelect
            name="permissionLevel"
            label="Nivel de permiso"
            options={[...UserPermissionLevel]}
            register={methods.register}
          />
        )}
      </form>
      <section className="flex justify-between p-4">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setDialogStatus("userEditForm", false)}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={methods.handleSubmit(onSubmit)}
        >
          Actualizar Usuario
        </button>
      </section>
    </FormProvider>
  );
}
