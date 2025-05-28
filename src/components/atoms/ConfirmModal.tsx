interface Props {
  isOpen: boolean;
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  onCancel,
  onConfirm,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
}: Props) {

  return (
    <dialog open={isOpen} className="modal">
      <div className="modal-box">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <p className="py-4">{message}</p>
        <div className="flex justify-end gap-2">
          <button className="btn btn-secondary" onClick={onCancel}>
            {cancelText}
          </button>
          <button className="btn btn-primary" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </dialog>
  );
}
