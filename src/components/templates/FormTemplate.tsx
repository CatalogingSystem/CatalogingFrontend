import { type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useFormStore } from "../../Zustand/stores/FormStore";

interface Props {
  cancelBtn?: string;
  confirmBtn?: string;
  children: ReactNode;
  formId?: string;
  className?: string;
}

export default function FormTemplate({
  cancelBtn,
  confirmBtn,
  children,
  formId,
}: Props) {
  const navigate = useNavigate();
  const title = useFormStore((state) => state.title);

  return (
    <section className="grid p-8 gap-8">
      <header className="flex justify-between font-semibold">
        <h2 className="text-xl">{title}</h2>
      </header>
      <section className="flex flex-col gap-2">
        {children}
        <nav className="flex justify-between mt-4">
          <button
            className={`btn btn-secondary max-w-fit ${
              cancelBtn ? "" : "hidden"
            }`}
            onClick={() => navigate(-1)}
          >
            {cancelBtn}
          </button>
          <button
            type="submit"
            form={formId}
            className={`btn btn-primary max-w-fit ${
              confirmBtn ? "" : "hidden"
            }`}
          >
            {confirmBtn}
          </button>
        </nav>
      </section>
    </section>
  );
}
