import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Navigate } from "react-router-dom";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout";
import InvoiceProvider from "./contexts/InvoiceProvider";
import Invoices from "./components/Invoices";
import InvoiceInfo from "./components/InvoiceInfo";
import AddInvoice from "./components/AddInvoice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/invoices",
        element: <Invoices />,
      },
      {
        path: "/invoices/:id",
        element: <InvoiceInfo />,
      },
      {
        path: "/invoices/newinvoice",
        element: <AddInvoice />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <InvoiceProvider>
      <RouterProvider router={router} />
    </InvoiceProvider>
  </StrictMode>
);
