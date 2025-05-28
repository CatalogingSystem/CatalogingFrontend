import { useState } from "react";
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
  activeText: string;
  inactiveText: string;
}

export default function FormToggle<T extends FieldValues>({
  label,
  placeholder,
  register,
  name,
  error,
  className,
  activeText,
  inactiveText,
}: Props<T>) {
  const [labelText, setLabelText] = useState(inactiveText);
  const changeState = () =>
    setLabelText(labelText === inactiveText ? activeText : inactiveText);

  return (
    <fieldset className={`fieldset" ${className}`}>
      <legend className="fieldset-legend font-normal">{label}</legend>
      <label className="fieldset-label w-fit">
        <input
          className="toggle bg-base-100"
          placeholder={placeholder}
          onClick={changeState}
          type="checkbox"
          {...register(name)}
        />
        {labelText}
      </label>
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
