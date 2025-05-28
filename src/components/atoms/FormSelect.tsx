import type {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { formatText } from "../../utils/separateWords";

interface Props<T extends FieldValues> {
  label: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  error?: FieldError;
  className?: string;
  type?: string;
  options: string[]
  defaultValue: string
}

export default function FormSelect<T extends FieldValues>({
  label,
  register,
  name,
  error,
  className,
  options,
  defaultValue
}: Props<T>) {
  return (
    <fieldset className={`${className}`}>
      <legend>{label}</legend>
      <select
        className="w-full bg-base-100 select "
        defaultValue={defaultValue}
        {...register(name)}
      >
        <option disabled={true}>{defaultValue}</option>
        {options.map((item, i) => (
          <option key={i} value={item}>
            {formatText(item)}
          </option>
        ))}
      </select>
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
