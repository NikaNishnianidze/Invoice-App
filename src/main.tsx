import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Navigate } from "react-router-dom";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout/Layout";
import InvoiceProvider from "./contexts/InvoiceProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/invoices"} />,
  },
  {
    path: "/invoices",
    element: <Layout />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <InvoiceProvider>
      <RouterProvider router={router} />
    </InvoiceProvider>
  </StrictMode>
);
