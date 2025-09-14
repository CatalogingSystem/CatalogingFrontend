import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, type Resolver } from "react-hook-form";
import {
  ImageRecordSchema,
  type ImageRecordFormValues,
  type ImageFormItem,
} from "../../models/GraphicDocumentation/GraphicDocumentation.model";
import {
  getGraphicDocumentation,
  postGraphicDocumentation,
  putGraphicDocumentation,
} from "../../utils/connections";
import { graphicDocumentationTabs } from "../../constants/GraphicDocumentationTabs";
import { useParams } from "react-router-dom";
import TabForm from "./TabForm";
import { useCallback, useEffect, useState } from "react";
import { useAuthStore } from "../../Zustand/stores/AuthStore";
import { uploadImage } from "../../utils/cloudinary";
import { useFormStore } from "../../Zustand/stores/FormStore";

export default function GraphicDocumentation() {
  const { tenantId, record } = useParams();
  const { jwt } = useAuthStore();
  const [isEditMode, setIsEditMode] = useState(Boolean(record));
  const { nextStep } = useFormStore();

  const methods = useForm<ImageRecordFormValues>({
    resolver: zodResolver(
      ImageRecordSchema
    ) as unknown as Resolver<ImageRecordFormValues>,
    mode: "onBlur",
  });
  const fetchData = useCallback(async () => {
    try {
      if (!isEditMode) return;
      const data = await getGraphicDocumentation(
        Number(record),
        tenantId || "",
        jwt
      );

      const existingImages = data.imageUrls
        ? data.imageUrls.map((url: string) => ({
            preview: url,
            isExisting: true,
            url: url,
            file: null,
          }))
        : [];

      const formattedData = {
        ...data,
        expediente: data.expediente.toString(),
        dimensions: {
          width: data.dimensions?.width?.toString(),
          height: data.dimensions?.height?.toString(),
        },
        date: data.date ? new Date(data.date).toISOString().split("T")[0] : "",
        images: existingImages,
      };
      methods.reset(formattedData);
    } catch {
      setIsEditMode(false);
    }
  }, [isEditMode, jwt, methods, record, tenantId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const onSubmit = methods.handleSubmit(async (data) => {
    const newFiles = data.images.filter(
      (image: ImageFormItem) => image.file !== null
    );
    const existingImages = data.images.filter(
      (image: ImageFormItem) => image.isExisting
    );

    const newImageUrls =
      newFiles.length > 0
        ? await Promise.all(
            newFiles.map(
              (image: ImageFormItem) =>
                image.file && uploadImage(image.file, tenantId || "")
            )
          )
        : [];

    const existingImageUrls = existingImages.map(
      (image: ImageFormItem) => image.url
    );
    const allImageUrls = [...existingImageUrls, ...newImageUrls].filter(
      (url) => url !== null
    ) as string[];

    if (allImageUrls.length === 0) {
      allImageUrls.push(
        "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
      );
    }

    const { images, imageUrls, ...rest } = data;

    const formattedData = {
      ...rest,
      imageUrls: allImageUrls,
    };

    if (isEditMode) {
      await putGraphicDocumentation(
        formattedData,
        tenantId || "",
        Number(record),
        jwt
      );
    } else {
      await postGraphicDocumentation(formattedData, tenantId || "", jwt);
    }

    nextStep();
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <TabForm items={graphicDocumentationTabs} />
      </form>
    </FormProvider>
  );
}
