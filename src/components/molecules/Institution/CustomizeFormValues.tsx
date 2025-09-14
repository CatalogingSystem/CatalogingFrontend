import { useFormContext } from "react-hook-form";
import FormColorPicker from "../../atoms/FormColorPicker";
import type { CustomizeFormValuesType } from "../../../models/Institution/Customize.model";

export default function CustomizeFormValues() {
  const { watch, setValue } = useFormContext<CustomizeFormValuesType>();

  return (
    <>
      <section className="grid grid-cols-2 gap-4 justify-center items-center justify-items-center text-center m-0">
        <h3 className="col-span-2 text-start w-full font-semibold text-lg">
          Configuración General
        </h3>
        <FormColorPicker<CustomizeFormValuesType>
          label="Encabezado"
          name="general.header"
          watch={watch}
          setValue={setValue}
        />
        <FormColorPicker<CustomizeFormValuesType>
          label="Background"
          name="general.background"
          watch={watch}
          setValue={setValue}
        />
        <FormColorPicker<CustomizeFormValuesType>
          label="Pasos"
          name="general.steps"
          watch={watch}
          setValue={setValue}
        />
        <FormColorPicker<CustomizeFormValuesType>
          label="Pasos Seleccionados"
          name="general.selectedSteps"
          watch={watch}
          setValue={setValue}
        />
        <FormColorPicker<CustomizeFormValuesType>
          label="Color Primario"
          name="general.primaryButton"
          watch={watch}
          setValue={setValue}
        />
        <FormColorPicker<CustomizeFormValuesType>
          label="Color Secundario"
          name="general.secondaryButton"
          watch={watch}
          setValue={setValue}
        />
      </section>
      <section className="flex flex-col gap-4">
        <h3 className="col-span-4 text-start w-full font-semibold text-lg">
          Usuarios
        </h3>
        <section className="grid grid-cols-2 gap-4 justify-center items-center justify-items-center text-center">
          <h4 className="col-span-2 text-start w-full font-semibold">
            Permisos
          </h4>
          <FormColorPicker<CustomizeFormValuesType>
            label="Modificacion"
            name="users.permissions.modification"
            watch={watch}
            setValue={setValue}
          />
          <FormColorPicker<CustomizeFormValuesType>
            label="Solo Lectura"
            name="users.permissions.readOnly"
            watch={watch}
            setValue={setValue}
          />
          <FormColorPicker<CustomizeFormValuesType>
            label="Administrador"
            name="users.permissions.admin"
            watch={watch}
            setValue={setValue}
            className="col-span-2"
          />
        </section>
        <section className="grid grid-cols-2 gap-4 justify-center items-center justify-items-center text-center">
          <h4 className="col-span-2 text-start w-full font-semibold">Roles</h4>
          <FormColorPicker<CustomizeFormValuesType>
            label="Director"
            name="users.roles.director"
            watch={watch}
            setValue={setValue}
          />
          <FormColorPicker<CustomizeFormValuesType>
            label="Investigador"
            name="users.roles.researcher"
            watch={watch}
            setValue={setValue}
          />
        </section>
      </section>
    </>
  );
}
