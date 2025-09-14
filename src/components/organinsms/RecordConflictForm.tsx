import { FormProvider, useForm } from "react-hook-form";
import FormInput from "../atoms/FormInput";
import { useDialogStore } from "../../Zustand/stores/DialogStore";
import { importCatalog } from "../../utils/connections";
import { useFileStore } from "../../Zustand/stores/FileStore";
import { useAuthStore } from "../../Zustand/stores/AuthStore";
import { useParams } from "react-router-dom";
import { useListStore } from "../../Zustand/stores/ListStore";
import toast from "react-hot-toast";

export default function RecordConflictForm() {
  const { tenantId } = useParams();
  const { jwt } = useAuthStore();

  const methods = useForm<{
    newRecord: string;
  }>({
    mode: "onBlur",
  });
  const { setDialogStatus } = useDialogStore();
  const { refreshFunction } = useListStore();
  const { file, resetFile } = useFileStore();

  const onSubmit = methods.handleSubmit(async (data) => {
    if (!tenantId || !file) return;
    try {
      await importCatalog(file, tenantId, jwt, parseInt(data.newRecord));
      refreshFunction();
      setDialogStatus("recordConflictDialog", false);
      resetFile();
    } catch {
      toast.error("Error importando el catalogo. Por favor, intente de nuevo.");
    }
  });

  return (
    <FormProvider {...methods}>
      <header className="flex w-full text-center">
        <h2 className="text-2xl font-bold w-full">Importar Catalogo</h2>
      </header>
      <article className="text-left text-gray-500 p-4 w-full">
        <p>El catalogo que intenta importar ya existe en el sistema.</p>
        <p>
          Para continuar, debe ingresar un nuevo expediente para el catalogo.
        </p>
      </article>

      <form onSubmit={onSubmit} className="flex flex-col gap-4 p-4">
        <FormInput
          register={methods.register}
          label="Nuevo Expediente"
          name="newRecord"
          placeholder="Ingrese el nuevo expediente"
          type="number"
        />
      </form>
      <section className="flex justify-between p-4">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setDialogStatus("recordConflictDialog", false)}
        >
          Cancelar
        </button>
        <button type="submit" className="btn btn-primary" onClick={onSubmit}>
          Importar Catalogo
        </button>
      </section>
    </FormProvider>
  );
}
