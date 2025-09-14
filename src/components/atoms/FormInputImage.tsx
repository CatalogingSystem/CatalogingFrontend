import { useDropzone } from "react-dropzone";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import type {
  FieldValues,
  UseFormRegister,
  Path,
  FieldError,
} from "react-hook-form";

interface Props<T extends FieldValues> {
  label: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  error?: FieldError;
  className?: string;
  value?: string;
  readOnly?: boolean;
  handleOnChange: (file: File) => void;
}

export default function FormInputImage<T extends FieldValues>({
  label,
  placeholder,
  register,
  name,
  error,
  className = "",
  value,
  readOnly = false,
  handleOnChange,
}: Props<T>) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      handleOnChange?.(acceptedFiles[0]);
    },
  });

  return (
    <fieldset
      {...getRootProps({ className: "dropzone" })}
      className="flex flex-col border border-secondary rounded-md p-6 border-dashed items-center w-full mb-6 text-base-400"
    >
      <legend>{label}</legend>
      <input
        autoComplete="off"
        className={`input w-full bg-base-100 ${className}`}
        placeholder={placeholder}
        type="file"
        accept="image/*"
        readOnly={readOnly}
        defaultValue={value}
        {...register(name)}
        {...getInputProps()}
      />
      <CloudUploadOutlinedIcon style={{ width: 75, height: 75 }} />
      <p className="text-xl ">Arrastra una imagen</p>
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
