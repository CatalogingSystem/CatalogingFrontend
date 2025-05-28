import { useEffect } from "react";
import { useFormStore } from "../../Zustand/stores/FormStore";
import type { TabComponent } from "./TabForm";

interface Props {
  items: TabComponent[];
}

export default function StepForm({ items }: Props) {
  const { step, setStep, setTotalSteps, setTitle } = useFormStore();

  useEffect(() => {
    setTotalSteps(items.length);
    setTitle(items[step]?.tabTitle || "");
  }, [items, step, setTotalSteps, setTitle]);

  return (
    <div className="flex flex-col gap-8">
      <header className="flex">
        <ul className="steps w-full">
          {items.map((item, i) => (
            <li
              key={i}
              className={`step ${i <= step ? "step-primary" : ""}`}
              onClick={() => setStep(i)}
            >
              {item.tabTitle}
            </li>
          ))}
        </ul>
      </header>

      <div className="mt-4">{items[step]?.component}</div>
    </div>
  );
}
