import { useEffect } from "react";
import { useSideBarStore } from "../../Zustand/stores/SidebarStore";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../molecules/Sidebar";
import { useAuthStore } from "../../Zustand/stores/AuthStore";
import { isJwtExpired } from "../../utils/jwt";

export default function SuperAdminRoute() {
  const { setSideBarItems, tenantId } = useSideBarStore();
  const { jwt } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    setSideBarItems([
      { label: "Lista de instituciones", redirection: `/` },
      { label: "Crear institución", redirection: `/create/institution` },
    ]);
  }, [setSideBarItems, tenantId]);

  useEffect(() => {
    if (!jwt) return;

    if (isJwtExpired(jwt)) {
      navigate('/login');
    }
  }, [jwt, navigate]);

  return (
    <Sidebar>
      <Outlet />
    </Sidebar>
  );
}
