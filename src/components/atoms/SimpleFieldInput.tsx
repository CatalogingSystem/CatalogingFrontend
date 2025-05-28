interface SimpleInputProps {
  label?: string;
  placeholder?: string;
  className?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  errorMessage?: string;
}

export default function SimpleInput({
  label,
  placeholder,
  className,
  type = "text",
  value,
  onChange,
  readOnly = false,
  errorMessage,
}: SimpleInputProps) {
  return (
    <fieldset className={`${className}`}>
      <legend>{label}</legend>
      <input
        className="input w-full bg-base-100"
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
      />
      <p className="text-red-500 mt-1" style={{ minHeight: "1.25rem" }}>
        {errorMessage ? (
          errorMessage
        ) : (
          <span style={{ visibility: "hidden" }}>error</span>
        )}
      </p>
    </fieldset>
  );
}