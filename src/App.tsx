import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/molecules/Sidebar";
import { lazy, Suspense } from "react";
import CatalogListPage from "./components/pages/CatalogListPage";
import { tenantNavigationItems } from "./constants/TenantNavigationItems";
import LoadingPage from "./components/pages/LoadingPage";

const TenantListPage = lazy(() => import("./components/pages/TenantListPage"));
const TenantFormPage = lazy(() => import("./components/pages/TenantFormPage"));
const DetailCatalogPage = lazy(
  () => import("./components/pages/DetailCatalogPage")
);
const CatalogFormPage = lazy(
  () => import("./components/pages/CatalogFormPage")
);

function App() {
  return (
    <BrowserRouter>
      <Sidebar navigationList={tenantNavigationItems}>
        <Suspense fallback={<LoadingPage />}>
          <Routes>
            <Route path="/" element={<TenantListPage />} />
            <Route path="/create/institution" element={<TenantFormPage />} />
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
          </Routes>
        </Suspense>
      </Sidebar>
    </BrowserRouter>
  );
}

export default App;
