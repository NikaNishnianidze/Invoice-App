import { createContext, ReactNode, useContext, useState } from "react";
import data from "../data.json";
import { TInvoiceList } from "../Invoice";

interface IInvoiceContext {
  invoices: TInvoiceList;
  setInvoices: React.Dispatch<React.SetStateAction<TInvoiceList>>;
  deleteInvoice: (id: string) => void;
}

const invoiceContext = createContext<IInvoiceContext>({
  invoices: [],
  setInvoices: () => {},
  deleteInvoice: () => {},
});

export default function InvoiceProvider({ children }: { children: ReactNode }) {
  const [invoices, setInvoices] = useState<TInvoiceList>(data);

  const deleteInvoice = (id: string) => {
    setInvoices((prev) => prev.filter((invoice) => invoice.id !== id));
  };
  return (
    <invoiceContext.Provider value={{ invoices, setInvoices, deleteInvoice }}>
      {children}
    </invoiceContext.Provider>
  );
}

export const useInvoice = () => {
  const context = useContext(invoiceContext);
  return context;
};
