import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CatalogListPage from "./components/pages/CatalogListPage";
import TenantListPage from "./components/pages/TenantListPage";
import TenantFormPage from "./components/pages/TenantFormPage";
import DetailCatalogPage from "./components/pages/DetailCatalogPage";
import CatalogFormPage from "./components/pages/CatalogFormPage";
import AdminRoute from "./components/templates/AdminRoute";
import SuperAdminRoute from "./components/templates/SuperAdminRoute";
import LoginPage from "./components/pages/LoginPage";
import { Toaster } from "react-hot-toast";
import UsersListPage from "./components/pages/UsersListPage";
import AuditPage from "./components/pages/AuditPage";
import TemporalMovements from "./components/pages/TemporalMovements";
import TemporalMovementFormPage from "./components/pages/TemporalMovementFormPage";
import TemporalMovementDetailPage from "./components/pages/TemporalMovementDetailPage";
import TemporalMovementAuditPage from "./components/pages/TemporalMovementAuditPage";

function App() {
  return (
    <BrowserRouter>
      <Toaster
        toastOptions={{
          duration: 1500,
        }}
      />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/:tenantId/login" element={<LoginPage />} />
        <Route element={<SuperAdminRoute />}>
          <Route path="/list/institution/:page" element={<TenantListPage />} />
          <Route path="/create/institution" element={<TenantFormPage />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route
            path="/:tenantId/catalog/:page"
            element={<CatalogListPage />}
          />
          <Route
            path="/:tenantId/create/catalog"
            element={<CatalogFormPage />}
          />
          <Route
            path="/:tenantId/detail/catalog/:id"
            element={<DetailCatalogPage />}
          />
          <Route
            path="/:tenantId/edit/catalog/:record"
            element={<CatalogFormPage />}
          />
          <Route
            path="/:tenantId/audit/catalog/:record"
            element={<AuditPage />}
          />
          <Route path="/:tenantId/users/:page" element={<UsersListPage />} />
          <Route
            path="/:tenantId/temporal-movements/:record/:page"
            element={<TemporalMovements />}
          />
          <Route
            path="/:tenantId/create/temporal-movements/:record"
            element={<TemporalMovementFormPage />}
          />
          <Route
            path="/:tenantId/update/temporal-movements/:record/:id"
            element={<TemporalMovementFormPage />}
          />
          <Route
            path="/:tenantId/detail/temporal-movements/:id"
            element={<TemporalMovementDetailPage />}
          />
          <Route
            path="/:tenantId/audit/temporal-movements/:record"
            element={<TemporalMovementAuditPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
