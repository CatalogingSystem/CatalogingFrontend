import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, type Resolver } from "react-hook-form";
import {
  ImageRecordSchema,
  type ImageRecordFormValues,
} from "../../models/GraphicDocumentation/GraphicDocumentation.model";
import { uploadImage } from "../../utils/cloudinary";
import { postGraphicDocumentation } from "../../utils/connections";
import { graphicDocumentationTabs } from "../../constants/GraphicDocumentationTabs";
import { useNavigate, useParams } from "react-router-dom";
import TabForm from "./TabForm";
import { useFormStore } from "../../Zustand/stores/FormStore";

export default function GraphicDocumentation() {
  const { tenantId } = useParams();
  const navigate = useNavigate();
  const { reset } = useFormStore();

  const methods = useForm<ImageRecordFormValues>({
    resolver: zodResolver(
      ImageRecordSchema
    ) as unknown as Resolver<ImageRecordFormValues>,
    mode: "onBlur",
  });

  const onSubmit = methods.handleSubmit(async (data) => {
    const imageFiles = data.images.map((image) => image.file);
    const imageUrls = await Promise.all(imageFiles.map(uploadImage));

    const { images, ...rest } = data;

    const formattedData = {
      ...rest,
      imageUrls,
    };

    await postGraphicDocumentation(formattedData, tenantId || "");

    navigate(-1);
    reset();
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <TabForm items={graphicDocumentationTabs} />
      </form>
    </FormProvider>
  );
}
