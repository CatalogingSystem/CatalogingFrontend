import { useFormContext } from "react-hook-form";
import FormInput from "../../atoms/FormInput";
import type { LoginFormData } from "../../../models/LoginModels/Login.model";

export default function LoginForm() {
  const { register } = useFormContext<LoginFormData>();

  return (
    <>
      <FormInput
        label="Nombre de usuario"
        name="username"
        type="text"
        placeholder="Ingrese su nombre de usuario"
        register={register}
      />
      <FormInput
        label="Contraseña"
        name="password"
        type="password"
        placeholder="Ingrese su contraseña"
        register={register}
      />
    </>
  );
}
