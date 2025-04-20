import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";
import data from "../data.json";
import { TInvoiceList } from "../Invoice";

interface IInvoiceContext {
  invoices: TInvoiceList;
  setInvoices: React.Dispatch<React.SetStateAction<TInvoiceList>>;
}

const invoiceContext = createContext<IInvoiceContext>({
  invoices: [],
  setInvoices: () => {},
});

export default function InvoiceProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [invoices, setInvoices] = useState<TInvoiceList>(data);
  return (
    <invoiceContext.Provider value={{ invoices, setInvoices }}>
      {children}
    </invoiceContext.Provider>
  );
}

export const useInvoice = () => {
  const context = useContext(invoiceContext);
  return context;
};
