import { useFormContext } from "react-hook-form";
import type { UserUpdatePasswordValues } from "../../../models/UserModels/User.model";
import FormInput from "../../atoms/FormInput";

export default function UserUpdatePasswordFormFields() {
  const {
    register,
    formState: { errors },
  } = useFormContext<UserUpdatePasswordValues>();

  return (
    <>
      <FormInput<UserUpdatePasswordValues>
        label="Nueva Contraseña"
        name="password"
        type="password"
        register={register}
        error={errors.password}
      />
      <FormInput<UserUpdatePasswordValues>
        label="Confirmar Nueva Contraseña"
        name="confirmPassword"
        type="password"
        register={register}
        error={errors.confirmPassword}
      />
    </>
  );
}
