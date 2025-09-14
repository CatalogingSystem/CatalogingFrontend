import VisibilityIcon from "@mui/icons-material/Visibility";
import { FormProvider, useForm } from "react-hook-form";
import CustomizeFormValues from "../molecules/Institution/CustomizeFormValues";
import { type CustomizeFormValuesType } from "../../models/Institution/Customize.model";
import { useDialogStore } from "../../Zustand/stores/DialogStore";
import { ThemeManager, defaultTheme } from "../../utils/themeManager";
import { useEffect } from "react";
import toast from "react-hot-toast";
import ToastCountdown from "../atoms/ToastCountdown";
import {
  getTenantCustomization,
  postTenantCustomization,
  putTenantCustomization,
} from "../../utils/connections";
import { useAuthStore } from "../../Zustand/stores/AuthStore";
import { useParams } from "react-router-dom";

export default function CustomizeForm() {
  const { tenantId } = useParams();
  const { jwt } = useAuthStore();
  const { setDialogStatus } = useDialogStore();
  const themeManager = ThemeManager.getInstance();
  const methods = useForm<CustomizeFormValuesType>({
    mode: "onBlur",
    defaultValues: defaultTheme,
  });

  const onSubmit = methods.handleSubmit(
    async (data: CustomizeFormValuesType) => {
      if (!tenantId) return;

      const customizationData = {
        header: data.general.header,
        background: data.general.background,
        steps: data.general.steps,
        selectedSteps: data.general.selectedSteps,
        primaryButton: data.general.primaryButton,
        secondaryButton: data.general.secondaryButton,
        admin: data.users.permissions.admin,
        modification: data.users.permissions.modification,
        readOnly: data.users.permissions.readOnly,
        director: data.users.roles.director,
        researcher: data.users.roles.researcher,
      };

      try {
        if (await getTenantCustomization(tenantId, jwt))
          await putTenantCustomization(customizationData, tenantId, jwt);
      } catch {
        await postTenantCustomization(customizationData, tenantId, jwt);
      }

      setDialogStatus("customizeDialog", false);
      localStorage.removeItem("previewData");
      themeManager.applyTheme(data);
    }
  );

  const onPreview = () => {
    localStorage.setItem("previewData", JSON.stringify(methods.getValues()));
    themeManager.applyPreviewFromLocalStorage();
    setDialogStatus("customizeDialog", false);
    toast(
      (t) => (
        <ToastCountdown
          toastId="customizeDialog"
          content="Previsualización activa. La vista previa se eliminará en"
          timer={30}
          onClose={() => {
            setDialogStatus("customizeDialog", true);
            toast.dismiss(t.id);
          }}
        />
      ),
      {
        duration: 30000,
        position: "bottom-left",
      }
    );
  };

  const onCancel = () => {
    setDialogStatus("customizeDialog", false);
    localStorage.removeItem("previewData");
    themeManager.removeTheme();
  };

  useEffect(() => {
    methods.reset(
      localStorage.getItem("previewData")
        ? JSON.parse(localStorage.getItem("previewData")!)
        : defaultTheme
    );
  }, [methods]);

  return (
    <FormProvider {...methods}>
      <header className="flex w-full text-center">
        <h2 className="text-2xl font-bold w-full">Personalizar Institución</h2>
      </header>
      <form onSubmit={onSubmit} className="flex flex-col gap-4 p-4">
        <CustomizeFormValues />
      </form>
      <footer className="flex justify-between p-4">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancelar
        </button>
        <div className="flex gap-2">
          <button
            type="button"
            className="btn btn-ghost border-gray-200"
            onClick={onPreview}
          >
            <VisibilityIcon />
            Ver Previsualización
          </button>
          <button type="submit" className="btn btn-primary" onClick={onSubmit}>
            Guardar Cambios
          </button>
        </div>
      </footer>
    </FormProvider>
  );
}
