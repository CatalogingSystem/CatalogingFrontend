import PersonIcon from "@mui/icons-material/Person";
import { useState, type ReactNode } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSideBarStore } from "../../Zustand/stores/SidebarStore";
import { useAuthStore } from "../../Zustand/stores/AuthStore";
import DialogTemplate from "../templates/DialogTemplate";
import { useDialogStore } from "../../Zustand/stores/DialogStore";
import CustomizeForm from "../organinsms/CustomizeForm";
import { useToastStore } from "../../Zustand/stores/ToastStore";
import AppLogo from "../../assets/AppLogo";

interface Props {
  children: ReactNode;
  role: string | null;
}

export default function Sidebar({ children, role }: Props) {
  const { tenantId } = useParams();
  const navigate = useNavigate();
  const { sideBarItems: navigationList } = useSideBarStore();
  const { logout } = useAuthStore();
  const [isUserOptionsOpen, setIsUserOptionsOpen] = useState(false);
  const { setDialogStatus, getDialogStatus } = useDialogStore();
  const { executeToastOnClose } = useToastStore();

  const changeScreen = (path: string) => navigate(path);

  return (
    <div className="flex flex-col">
      <nav className="flex header min-h-full w-full px-4 items-center justify-between">
        <div className="flex items-center gap-2">
          <figure className="flex items-center break-words w-48">
            <AppLogo />
            <figcaption className="font-semibold text-center">
              Sistema de Catalogación
            </figcaption>
          </figure>
          <ul className="flex gap-4">
            {navigationList.map((item, i) => (
              <li
                key={i}
                className="hover:font-semibold active:font-bold cursor-pointer"
              >
                <a onClick={() => changeScreen(item.redirection)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative flex items-center gap-2">
          <div
            className="avatar avatar-placeholder cursor-pointer"
            onClick={() => setIsUserOptionsOpen(!isUserOptionsOpen)}
          >
            <div className="bg-primary text-neutral-content w-8 rounded-full">
              <span className="text-xs">
                <PersonIcon />
              </span>
            </div>
          </div>
          {isUserOptionsOpen && (
            <div className="absolute right-0 top-10 bg-base-100 shadow-lg p-2 whitespace-nowrap z-90 flex flex-col rounded-xl gap-1 w-32">
              {role === "Director" && (
                <>
                  <button
                    className="cursor-pointer hover:font-semibold hover:bg-base-200 px-2 py-1 rounded transition-colors col-span-1 w-full"
                    onClick={() => {
                      executeToastOnClose("customizeDialog");
                      setIsUserOptionsOpen(false);
                      setDialogStatus("customizeDialog", true);
                    }}
                  >
                    Personalizar
                  </button>
                  <div className="w-full border-b border-terracota" />
                </>
              )}
              <button
                type="button"
                className="cursor-pointer hover:font-semibold hover:bg-base-200 px-2 py-1 rounded transition-colors col-span-1"
                onClick={() => {
                  setIsUserOptionsOpen(false);
                  logout();
                  if (tenantId) {
                    navigate(`/${tenantId}/login`);
                  } else {
                    navigate("/login");
                  }
                }}
              >
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </nav>
      <div
        className={`flex flex-col bg-base-200 h-full min-h-[91vh] ${
          getDialogStatus("customizeDialog") && "overflow-hidden max-h-[91vh]"
        }`}
      >
        {children}
      </div>
      <DialogTemplate
        dialogId="customizeDialog"
        onClose={() => {
          setDialogStatus("customizeDialog", false);
        }}
        variant="long"
      >
        <CustomizeForm />
      </DialogTemplate>
    </div>
  );
}
