import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CustomerMenu from "./pages/CustomerMenu";
import { AuthProvider } from "./admin/context/AuthContext";

// Code-Splitting: Lazy load Admin views so the Customer QR Menu bundle is lightweight & ultra-fast
const ProtectedRoute = lazy(() => import("./admin/components/ProtectedRoute"));
const AdminLayout = lazy(() => import("./admin/components/AdminLayout"));
const LoginPage = lazy(() => import("./admin/pages/LoginPage"));
const DashboardHome = lazy(() => import("./admin/pages/DashboardHome"));
const AddExpensePage = lazy(() => import("./admin/pages/AddExpensePage"));
const DailyReportPage = lazy(() => import("./admin/pages/DailyReportPage"));
const MonthlyReportPage = lazy(() => import("./admin/pages/MonthlyReportPage"));
const SettingsPage = lazy(() => import("./admin/pages/SettingsPage"));
const ProductsPage = lazy(() => import("./admin/pages/ProductsPage"));

const AdminLoadingFallback = () => (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f8fafc" }}>
    <div
      style={{
        width: 36,
        height: 36,
        border: "3px solid #e2e8f0",
        borderTopColor: "#009a74",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }}
    />
  </div>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* 1. Public Customer Menu (The exact QR-code root URL /) - Loads Instantly */}
          <Route path="/" element={<CustomerMenu />} />

          {/* 2. Admin Authentication (Lazy Loaded) */}
          <Route
            path="/admin/login"
            element={
              <Suspense fallback={<AdminLoadingFallback />}>
                <LoginPage />
              </Suspense>
            }
          />

          {/* 3. Protected Admin Routes inside AdminLayout (Lazy Loaded) */}
          <Route
            path="/admin"
            element={
              <Suspense fallback={<AdminLoadingFallback />}>
                <ProtectedRoute />
              </Suspense>
            }
          >
            <Route element={<AdminLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="expenses/new" element={<AddExpensePage />} />
              <Route path="reports/daily" element={<DailyReportPage />} />
              <Route path="reports/monthly" element={<MonthlyReportPage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
          </Route>

          {/* Fallback to Customer Menu */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;