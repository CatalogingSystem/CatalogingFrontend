import { FormProvider, useForm } from "react-hook-form";
import { useDialogStore } from "../../Zustand/stores/DialogStore";
import { importCatalog } from "../../utils/connections";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../../Zustand/stores/AuthStore";
import { useFileStore } from "../../Zustand/stores/FileStore";
import { useListStore } from "../../Zustand/stores/ListStore";

export default function ImportForm() {
  const { tenantId } = useParams();
  const { jwt } = useAuthStore();
  const { setDialogStatus } = useDialogStore();
  const { setFile } = useFileStore();
  const { refreshFunction } = useListStore();

  const methods = useForm({
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    if (!tenantId || !jwt) return;
    try {
      await importCatalog(data.importFile[0], tenantId, jwt);
      setDialogStatus("catalogImportDialog", false);
      refreshFunction();
    } catch {
      setFile(data.importFile[0]);
      setDialogStatus("catalogImportDialog", false);
      setDialogStatus("recordConflictDialog", true);
    }
  };

  return (
    <FormProvider {...methods}>
      <header className="flex w-full text-center">
        <h2 className="text-2xl font-bold w-full">Importar Catalogo</h2>
      </header>
      <form
        className="flex flex-col w-full p-4"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <label>
          <span>Seleccionar archivo</span>
          <input
            type="file"
            id="importFile"
            className="p-2 w-full border border-gray-300 rounded-xl"
            accept=".json"
            {...methods.register("importFile", {
              required: "El archivo es requerido",
            })}
          />
        </label>
      </form>
      <section className="flex justify-between p-4">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setDialogStatus("catalogImportDialog", false)}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={methods.handleSubmit(onSubmit)}
        >
          Importar Catalogo
        </button>
      </section>
    </FormProvider>
  );
}
