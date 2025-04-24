import { createContext, ReactNode, useContext, useState } from "react";
import data from "../data.json";
import { TInvoiceList } from "../Invoice";

interface IInvoiceContext {
  invoices: TInvoiceList;
  setInvoices: React.Dispatch<React.SetStateAction<TInvoiceList>>;
  deleteInvoice: (id: string) => void;
  handleMarkAsPaid: (id: string) => void;
  newInvoice: boolean;
  setNewInvoice: React.Dispatch<React.SetStateAction<boolean>>;
}

const invoiceContext = createContext<IInvoiceContext>({
  invoices: [],
  setInvoices: () => {},
  deleteInvoice: () => {},
  handleMarkAsPaid: () => {},
  newInvoice: false,
  setNewInvoice: () => {},
});

export default function InvoiceProvider({ children }: { children: ReactNode }) {
  const [invoices, setInvoices] = useState<TInvoiceList>(data);
  const [newInvoice, setNewInvoice] = useState<boolean>(false);

  const deleteInvoice = (id: string) => {
    setInvoices((prev) => prev.filter((invoice) => invoice.id !== id));
  };
  const handleMarkAsPaid = (id: string) => {
    setInvoices((prev) =>
      prev.map((invoice) =>
        invoice.id === id ? { ...invoice, status: "paid" } : invoice
      )
    );
  };

  return (
    <invoiceContext.Provider
      value={{
        invoices,
        setInvoices,
        deleteInvoice,
        handleMarkAsPaid,
        newInvoice,
        setNewInvoice,
      }}
    >
      {children}
    </invoiceContext.Provider>
  );
}

export const useInvoice = () => {
  const context = useContext(invoiceContext);
  return context;
};
