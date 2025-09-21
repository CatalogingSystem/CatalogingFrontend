import { useEffect, useState } from "react";
import { useSideBarStore } from "../../Zustand/stores/SidebarStore";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../molecules/Sidebar";
import { useAuthStore } from "../../Zustand/stores/AuthStore";
import { jwtDecode } from "jwt-decode";
import { isJwtExpired } from "../../utils/jwt";
import { defaultTheme, ThemeManager } from "../../utils/themeManager";
import type { CustomizeFormValuesType } from "../../models/Institution/Customize.model";
import { getTenantCustomization } from "../../utils/connections";

export default function AdminRoute() {
  const { setSideBarItems, tenantId } = useSideBarStore();
  const { jwt } = useAuthStore();
  const navigate = useNavigate();

  const themeManager = ThemeManager.getInstance();
  const [sideBarItems, setSideBarLocalItems] = useState([
    { label: "Catalogos", redirection: `/${tenantId}/catalog/1` },
  ]);
  const [role, setRole] = useState<string | null>(null);

  const fetchDefaultTheme = async () => {
    if (!jwt || !tenantId) return;

    try {
      const res = await getTenantCustomization(tenantId, jwt);
      if (res) {
        themeManager.updateDefaultTheme({
          general: {
            header: res.header,
            background: res.background,
            steps: res.steps,
            selectedSteps: res.selectedSteps,
            primaryButton: res.primaryButton,
            secondaryButton: res.secondaryButton,
          },
          users: {
            permissions: {
              admin: res.admin,
              modification: res.modification,
              readOnly: res.readOnly,
            },
            roles: {
              director: res.director,
              researcher: res.researcher,
            },
          },
        });
      }
    } catch {
      themeManager.applyDefaultTheme();
    }
  };

  useEffect(() => {
    fetchDefaultTheme();
  });

  useEffect(() => {
    if (!jwt || !tenantId) return;
    setRole(
      jwtDecode(jwt)[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ]
    );

    if (role === "Director") {
      setSideBarLocalItems([
        { label: "Catalogos", redirection: `/${tenantId}/catalog/1` },
        { label: "Usuarios", redirection: `/${tenantId}/users/1` },
      ]);
    }
  }, [jwt, role, tenantId]);

  useEffect(() => {
    setSideBarItems(sideBarItems);
  }, [setSideBarItems, sideBarItems, tenantId]);

  useEffect(() => {
    if (!jwt) return;

    if (isJwtExpired(jwt)) navigate(`/${tenantId}/login`);
  }, [jwt, navigate, tenantId]);

  return (
    <Sidebar role={role}>
      <Outlet />
    </Sidebar>
  );
}
