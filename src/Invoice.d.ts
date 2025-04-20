interface IItems {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

interface IClient {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

interface ISender {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

interface IInvoice {
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: string;
  senderAddress: ISender;
  clientAddress: IClient;
  items: IItems[];
  total: number;
}

export type TInvoice = IInvoice;

export type TInvoiceList = IInvoice[];
