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
}

export default function FormTextArea<T extends FieldValues>({
  label,
  placeholder,
  register,
  name,
  error,
}: Props<T>) {
  return (
    <fieldset>
      <legend>{label}</legend>
      <textarea
        className="textarea h-24 w-full bg-base-100"
        placeholder={placeholder}
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
