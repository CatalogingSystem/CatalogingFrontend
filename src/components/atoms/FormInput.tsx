import type {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface Props<T extends FieldValues> {
  label: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  error?: FieldError;
  className?: string;
  inputClassName?: string;
  type?: string;
  value?: string;
  readOnly?: boolean;
}

export default function FormInput<T extends FieldValues>({
  label,
  placeholder,
  register,
  name,
  error,
  className,
  inputClassName,
  type,
  value,
  readOnly = false,
}: Props<T>) {
  return (
    <fieldset className={`${className}`}>
      <legend>{label}</legend>
      <input
        autoComplete="off"
        className={`bg-base-100 ${inputClassName} ${
          type !== "color" ? "input w-full" : ""
        }`}
        placeholder={placeholder}
        type={type}
        readOnly={readOnly}
        defaultValue={value}
        {...register(name)}
      />
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
