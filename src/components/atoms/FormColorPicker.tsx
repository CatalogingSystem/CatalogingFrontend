import type {
  FieldError,
  FieldValues,
  Path,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

interface Props<T extends FieldValues> {
  label: string;
  placeholder?: string;
  name: Path<T>;
  error?: FieldError;
  className?: string;
  inputClassName?: string;
  value?: string;
  readOnly?: boolean;
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
}

export default function FormColorPicker<T extends FieldValues>({
  label,
  placeholder,
  name,
  error,
  className,
  inputClassName,
  value,
  readOnly = false,
  setValue,
  watch,
}: Props<T>) {
  const currentValue = watch(name) || value || "#000000";

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hexValue = e.target.value;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setValue(name, hexValue as any);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setValue(name, e.target.value as any);
  };

  return (
    <fieldset className={`${className}`}>
      <legend className="text-start mb-2">{label}</legend>
      <div className="flex items-center gap-3">
        <input
          autoComplete="off"
          className={` bg-base-100 w-8 h-8 rounded-full cursor-pointer ${inputClassName}`}
          type="color"
          readOnly={readOnly}
          value={currentValue}
          onChange={handleColorChange}
        />
        <input
          autoComplete="off"
          className="bg-base-100 border border-gray-300 rounded px-3 py-2 text-sm uppercase"
          placeholder={placeholder || "#000000"}
          type="text"
          readOnly={readOnly}
          value={currentValue}
          onChange={handleHexChange}
          maxLength={7}
        />
      </div>
      <p className="text-red-500 mt-1" style={{ minHeight: "1.25rem" }}>
        {error ? (
          error.message
        ) : (
          <span style={{ visibility: "hidden" }}>error</span>
        )}
      </p>
    </fieldset>
  );
}
