import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  children: ReactNode;
  navigationList: {
    label: string
    redirection: string
  }[]
}

export default function Sidebar({ children, navigationList }: Props) {
  const navigate = useNavigate();

  const changeScreen = (path: string) => navigate(path);

  return (
    <div className="drawer drawer-open">
      <input type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col bg-base-200 ">
        {children}
      </div>
      <nav className="drawer-side">
        <ul className="menu bg-base-400 min-h-full w-60 p-4 text-base-100">
          {navigationList.map((item, i) => (
            <li
              key={i}
              className="hover:bg-base-100 hover:text-base-400 rounded-md active:bg-base-100"
            >
              <a onClick={() => changeScreen(item.redirection)}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
