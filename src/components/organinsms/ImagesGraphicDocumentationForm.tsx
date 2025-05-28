import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import DeleteIcon from '@mui/icons-material/Delete';
import { useFieldArray, useFormContext } from "react-hook-form";
import type { ImageRecordFormValues } from "../../models/GraphicDocumentation/GraphicDocumentation.model";
import { useEffect } from "react";
import { useDropzone } from "react-dropzone";

export default function ImagesGraphicDocumentationForm() {
  const { control } = useFormContext<ImageRecordFormValues>();

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/": [],
    },
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        insert(0, { file, preview: URL.createObjectURL(file) });
      });
    },
  });

  const { fields, remove, insert } = useFieldArray({
    control,
    name: "images",
  });

  useEffect(() => {
    console.log(fields);
  }, [fields]);

  return (
    <>
      <div
        {...getRootProps({ className: "dropzone" })}
        className="flex flex-col border border-secondary rounded-md p-36 border-dashed items-center place-self-center w-3/4 mb-6 text-base-400"
      >
        <input type="image" {...getInputProps()} />
        <CloudUploadOutlinedIcon style={{ width: 75, height: 75 }} />
        <p className="text-xl ">Arrastra una o varias imagenes</p>
      </div>
      <div className="grid grid-cols-3 h-full w-3/4 gap-6 items-center place-self-center">
        {fields.map((file, index) => (
          <section className="flex flex-col w-full border border-slate-200 p-4 rounded-md gap-4">
            <div
              key={index}
              className="max-h-56 min-h-56 flex flex-col items-center justify-center overflow-hidden"
            >
              <img
                className="max-h-full max-w-full object-contain mx-auto my-auto"
                src={file.preview}
                alt={`preview-${index}`}
              />
            </div>
            <button
              className="btn btn-primary w-full place-self-center"
              onClick={() => remove(index)}
            >
              <DeleteIcon />
            </button>
          </section>
        ))}
      </div>
    </>
  );
}
