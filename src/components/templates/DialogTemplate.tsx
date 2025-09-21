import type { ReactNode } from "react";
import { useDialogStore } from "../../Zustand/stores/DialogStore";
import { useEffect } from "react";

interface Props {
  children: ReactNode;
  onClose: () => void;
  dialogId: string;
  variant?: "default" | "long";
}

export default function DialogTemplate({
  children,
  onClose,
  dialogId,
  variant,
}: Props) {
  const { getDialogStatus } = useDialogStore();
  const isOpen = getDialogStatus(dialogId);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <dialog
      open
      onClose={onClose}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-black/50 z-10"
    >
      <div
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-base-100 rounded-2xl p-6 max-h-[90vh] overflow-auto ${
          variant === "long" ? "max-w-2xl" : "max-w-lg"
        } w-full`}
      >
        {children}
      </div>
    </dialog>
  );
}
