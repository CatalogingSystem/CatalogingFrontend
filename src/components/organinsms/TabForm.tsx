import { useState, type ReactNode } from "react";

export interface TabComponent {
  tabTitle: string;
  component: ReactNode;
}

interface Props {
  items: TabComponent[];
  submitButtonLabel?: string;
}

export default function TabForm({ items, submitButtonLabel }: Props) {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="flex flex-col gap-8">
      <nav role="tablist" className="tabs tabs-lift w-full">
        {items.map((item, i) => (
          <a
            key={i}
            role="tab"
            className={`tab ${selectedTab === i ? "tab-active" : ""}`}
            onClick={() => setSelectedTab(i)}
          >
            {item.tabTitle}
          </a>
        ))}
      </nav>

      <div>{items[selectedTab].component}</div>

      <div className="flex justify-end gap-2">
        <button type="submit" className="btn btn-primary">
          {submitButtonLabel || "Siguiente"}
        </button>
      </div>
    </div>
  );
}
