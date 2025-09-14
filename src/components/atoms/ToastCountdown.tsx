import { useEffect, useState } from "react";
import { useToastStore } from "../../Zustand/stores/ToastStore";

interface Props {
  toastId: string;
  content: string;
  timer: number;
  onClose: () => void;
}

export default function ToastCountdown({
  toastId,
  content,
  timer,
  onClose,
}: Props) {
  const [timerCountdown, setTimerCountdown] = useState<number>(timer);
  const { setToast, removeToast } = useToastStore();

  useEffect(() => {
    setToast(toastId, onClose);
  }, [onClose, setToast, toastId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimerCountdown((prev) => {
        return prev > 0 ? prev - 1 : 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (timerCountdown === 0) {
        removeToast(toastId);
        onClose();
      }
    }, 1000);
  }, [timerCountdown, onClose]);

  return (
    <div className="flex items-center gap-2">
      {content} {timerCountdown}
      <button className="btn btn-ghost" onClick={onClose}>
        Cerrar
      </button>
    </div>
  );
}
