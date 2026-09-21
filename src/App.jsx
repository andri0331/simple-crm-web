import { BrowserRouter, Routes, Route } from "react-router";
import { Suspense, lazy } from "react";
import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";
import RootLayout from "./layouts/RootLayout";
import DashboardPage from "./pages/DashboardPage";
import CustomersPage from "./pages/CustomersPage";
import NewCustomerPage from "./pages/NewCustomerPage";
import CustomerDetailPage from "./pages/CustomerDetailPage";
import EditCustomerPage from "./pages/EditCustomerPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute";
// import ProductsPage from "./pages/ProductsPage";
import Spinner from "./components/Spinner";

// Loaded only when the user navigates to /app/products
const ProductsPage = lazy(() => import("./pages/ProductsPage"));

import "./App.css";

//export const API_BASE = "http://localhost:3001";
//export const API_BASE = "https://6a5b669e64f700df5bd6e59a.mockapi.io";
export const API_BASE = import.meta.env.VITE_API_BASE_URL;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Define the routes for the application */}
        <Route index element={<WelcomePage />} />
        <Route path="login" element={<LoginPage />} />

        {/* Protected routes for authenticated users */}
        <Route element={<ProtectedRoute />}>
          <Route path="app" element={<RootLayout />}>
            {/* Child routes for the /app section */}
            <Route index element={<DashboardPage />} />
            <Route path="customers" element={<CustomersPage />} />
            <Route path="customers/new" element={<NewCustomerPage />} />
            <Route path="customers/:id" element={<CustomerDetailPage />} />
            <Route path="customers/:id/edit" element={<EditCustomerPage />} />
            {/* <Route path="products" element={<ProductsPage />} /> */}
            <Route
              path="products"
              element={
                <Suspense fallback={<Spinner />}>
                  <ProductsPage />
                </Suspense>
              }
            />
          </Route>
        </Route>

        {/* Catch-all route for 404 Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
