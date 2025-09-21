import { FormProvider, useForm } from "react-hook-form";
import LoginForm from "../molecules/LoginForm/LoginForm";
import {
  LoginSchema,
  type LoginFormData,
} from "../../models/LoginModels/Login.model";
import { zodResolver } from "@hookform/resolvers/zod";

import loginBackground from "../../assets/login-background.webp";
import { useNavigate, useParams } from "react-router-dom";
import { loginUser } from "../../utils/connections";
import toast from "react-hot-toast";
import { useAuthStore } from "../../Zustand/stores/AuthStore";
import { useSideBarStore } from "../../Zustand/stores/SidebarStore";

export default function LoginPage() {
  const { tenantId } = useParams();
  const { setTenantId } = useSideBarStore();
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const methods = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: LoginFormData) => {
    let res;
    try {
      if (!tenantId) {
        res = await loginUser(data);
        navigate(`/list/institution/1`);
        return;
      } else {
        res = await loginUser(data, tenantId);
        navigate(`/${tenantId}/catalog/1`);
        setTenantId(tenantId);
        return;
      }
    } catch {
      toast.error("Credenciales incorrectas. \nPor favor, inténtalo de nuevo.");
      return;
    } finally {
      login(res.token);
      toast.success("Inicio de sesión exitoso.");
    }
  };

  return (
    <main className="bg-base-200 h-screen flex flex-col items-center justify-center">
      <img
        src={loginBackground}
        alt="Login Background"
        className="absolute inset-0 object-cover w-full h-full opacity-30"
      />
      <section className="bg-base-100 rounded-md p-8 w-full max-w-md z-10">
        <h1 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h1>
        <FormProvider {...methods}>
          <form id="login-form" onSubmit={methods.handleSubmit(onSubmit)}>
            <LoginForm />
          </form>
          <button
            type="submit"
            className="btn btn-primary w-full"
            form="login-form"
          >
            Iniciar sesión
          </button>
        </FormProvider>
      </section>
    </main>
  );
}
