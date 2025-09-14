import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import DeleteIcon from '@mui/icons-material/Delete';
import { useFieldArray, useFormContext } from "react-hook-form";
import type { ImageRecordFormValues } from "../../../models/GraphicDocumentation/GraphicDocumentation.model";
import { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useParams } from "react-router-dom";

export default function ImagesGraphicDocumentationForm() {
  const { control, watch } = useFormContext<ImageRecordFormValues>();
  const { record } = useParams();
  const isEditMode = Boolean(record);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        insert(0, { file, preview: URL.createObjectURL(file) });
      });
    },
  });

  const { fields, remove, insert, replace } = useFieldArray({
    control,
    name: "images",
  });

  // Watch for imageUrls to load existing images in edit mode
  const formData = watch();

  useEffect(() => {
    if (isEditMode && formData.imageUrls && formData.imageUrls.length > 0) {
      // Only load if images array is empty to avoid overwriting
      if (fields.length === 0) {
        const existingImages = formData.imageUrls.map((url: string) => ({
          preview: url,
          isExisting: true,
          url: url,
          file: null // No file for existing images
        }));
        replace(existingImages);
      }
    }
  }, [formData.imageUrls, isEditMode, fields.length, replace]);


  return (
    <>
      <div
        {...getRootProps({ className: "dropzone" })}
        className="flex flex-col border border-secondary rounded-md p-36 border-dashed items-center place-self-center w-3/4 mb-6 text-base-400"
      >
        <input type="file" {...getInputProps()} />
        <CloudUploadOutlinedIcon style={{ width: 75, height: 75 }} />
        <p className="text-xl ">Arrastra una o varias imagenes</p>
      </div>
      <div className="grid grid-cols-3 h-full w-3/4 gap-6 items-center place-self-center">
        {fields.map((file, index) => (
          <section key={index} className="flex flex-col w-full border border-slate-200 p-4 rounded-md gap-4">
            <div
              className="max-h-56 min-h-56 flex flex-col items-center justify-center overflow-hidden"
            >
              <img
                className="max-h-full max-w-full object-contain mx-auto my-auto"
                src={file.preview}
                alt={`preview-${index}`}
              />
            </div>
            <button
              type="button"
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
