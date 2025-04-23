import { useNavigate, useParams } from "react-router-dom";
import arrowLeft from "../../public/assets/icon-arrow-left.svg";
import { useInvoice } from "../contexts/InvoiceProvider";
import { useForm } from "react-hook-form";
import { IInputs } from "../Invoice";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SubmitHandler } from "react-hook-form";
import { useState } from "react";
import deleteIcon from "../../public/assets/icon-delete.svg";
import DatePicker from "react-datepicker";
import calendarIcon from "../../public/assets/icon-calendar.svg";
import "react-datepicker/dist/react-datepicker.css";

const EditInvoice = () => {
  const { id } = useParams();
  const { invoices, setInvoices } = useInvoice();
  const invoice = invoices.find((invoice) => invoice.id == id);
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/invoices");
  };

  const [invoiceDate, setInvoiceDate] = useState<Date | null>(null);
  const [paymentDate, setPaymentDate] = useState<Date | null>(null);
  const schema: yup.ObjectSchema<IInputs> = yup.object({
    address: yup.string().required("Sender address is required"),
    city: yup.string().required("Sender city is required"),
    post: yup.string().required("Sender post code is required"),
    coutry: yup.string().required("Sender country is required"),
    clientName: yup.string().required("Client name is required"),
    clientEmail: yup
      .string()
      .email("Invalid email")
      .required("Client email is required"),
    streetAddress: yup.string().required("Client street address is required"),
    cityName: yup.string().required("Client city is required"),
    postCode: yup.string().required("Client post code is required"),
    countryTo: yup.string().required("Client country is required"),
    invoiceDate: yup.date().required("Invoice date is required"),
    paymentTerms: yup.date().required("Payment terms are required"),
    projectDescription: yup
      .string()
      .required("Project description is required"),
    itemName: yup.string().required("Item name is required"),
    qty: yup.string().required("Quantity is required"),
    price: yup.string().required("Price is required"),
    total: yup.string().notRequired(),
  });

  const {
    register,
    setValue,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<IInputs>({
    resolver: yupResolver(schema),
  });

  const handleDiscard = () => {
    navigate("/invoices");
  };

  const handleSave: SubmitHandler<IInputs> = (data) => {
    try {
      const itemTotal = parseFloat(data.qty) * parseFloat(data.price);
      console.log(errors);
      const newInvoice = {
        id: invoice?.id || Math.random().toString(36).substr(2, 9),
        createdAt: invoiceDate ? invoiceDate.toISOString() : "",
        paymentDue: paymentDate ? paymentDate.toISOString() : "",
        paymentTerms: paymentDate ? new Date(paymentDate).getTime() : 0,
        description: data.projectDescription,
        clientName: data.clientName,
        clientEmail: data.clientEmail,
        status: "pending",
        senderAddress: {
          street: data.address,
          city: data.city,
          postCode: data.post,
          country: data.coutry,
        },
        clientAddress: {
          street: data.streetAddress,
          city: data.cityName,
          postCode: data.postCode,
          country: data.countryTo,
        },
        items: [
          {
            name: data.itemName,
            quantity: parseInt(data.qty, 10),
            price: parseFloat(data.price),
            total: itemTotal,
          },
        ],
        total: itemTotal,
      };

      const updatedInvoices = invoices.map((inv) =>
        inv.id === invoice?.id ? newInvoice : inv
      );

      setInvoices(updatedInvoices);
      navigate("/invoices");
    } catch (error) {
      console.error("Error saving the invoice:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div
        onClick={handleGoBack}
        className="go-back mt-[33px] flex items-center gap-[23.66px] w-[327px] "
      >
        <img src={arrowLeft} alt="arrow left icon" />
        <p className="text-[#0C0E16] text-[15px] font-bold dark:text-[#fff]">
          Go Back
        </p>
      </div>
      <div className="edit-invoice w-[327px] flex items-center justify-between mt-[31px]">
        <h3 className="text-[#0C0E16] text-[24px] font-bold dark:text-[#fff]">
          Edit{" "}
          <span className="text-[#888EB0] text-[24px] font-bold dark:text-[#777F98]">
            #
          </span>
          {invoice?.id}
        </h3>
      </div>
      {invoice && (
        <div>
          <form onSubmit={handleSubmit(handleSave)} className="w-[327px]">
            <p className="text-[#7C5DFA] text-[15px] font-bold mt-[22px]">
              Bill From
            </p>
            <div className="from-address mt-[24px] flex flex-col gap-[9px]">
              <label
                htmlFor="address"
                className="text-[#7E88C3] text-[13px] font-medium"
              >
                Street Address
              </label>
              <input
                type="text"
                id="address"
                {...register("address")}
                defaultValue={invoice.senderAddress.street}
                className="w-[327px] py-[16px] rounded-[4px] bg-white border-[1px] border-[#DFE3FA] px-[20px]"
              />
            </div>
            <div className="city-post mt-[24px] flex gap-[23px]">
              <div className="city flex flex-col gap-[9px]">
                <label
                  htmlFor="city"
                  className="text-[#7E88C3] text-[13px] font-medium"
                >
                  City
                </label>
                <input
                  {...register("city")}
                  type="text"
                  id="city"
                  defaultValue={invoice.senderAddress.city}
                  className="w-[152px] py-[16px] rounded-[4px] bg-white border-[1px] border-[#DFE3FA] px-[20px]"
                />
              </div>
              <div className="post flex flex-col gap-[9px]">
                <label
                  htmlFor="post"
                  className="text-[#7E88C3] text-[13px] font-medium"
                >
                  Post Code
                </label>
                <input
                  type="text"
                  id="post"
                  {...register("post")}
                  defaultValue={invoice.senderAddress.postCode}
                  className="w-[152px] py-[16px] rounded-[4px] bg-white border-[1px] border-[#DFE3FA] px-[20px]"
                />
              </div>
            </div>
            <div className="country flex flex-col mt-[25px] gap-[9px]">
              <label
                htmlFor="country"
                className="text-[#7E88C3] text-[13px] font-medium"
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                {...register("coutry")}
                defaultValue={invoice.senderAddress.country}
                className="w-[327px] py-[16px] rounded-[4px] bg-white border-[1px] border-[#DFE3FA] px-[20px]"
              />
            </div>
            <p className="mt-[41px] text-[#7C5DFA] text-[15px] font-bold">
              Bill To
            </p>
            <div className="name mt-[24px] flex flex-col gap-[9px]">
              <label
                className="text-[#7E88C3] text-[13px] font-medium"
                htmlFor="name"
              >
                Client's Name
              </label>
              <input
                type="text"
                id="name"
                {...register("clientName")}
                defaultValue={invoice.clientName}
                className="w-[327px] py-[16px] rounded-[4px] bg-white border-[1px] border-[#DFE3FA] px-[20px]"
              />
            </div>
            <div className="email mt-[24px] flex flex-col gap-[9px]">
              <label
                className="text-[#7E88C3] text-[13px] font-medium"
                htmlFor="clientEmail"
              >
                Client’s Email
              </label>
              <input
                type="text"
                id="clientEmail"
                {...register("clientEmail")}
                defaultValue={invoice.clientEmail}
                className="w-[327px] py-[16px] rounded-[4px] bg-white border-[1px] border-[#DFE3FA] px-[20px]"
              />
            </div>
            <div className="to-address mt-[24px] flex flex-col gap-[9px]">
              <label
                className="text-[#7E88C3] text-[13px] font-medium"
                htmlFor="streetAddress"
              >
                Street Address
              </label>
              <input
                type="text"
                id="streetAddress"
                {...register("streetAddress")}
                defaultValue={invoice.clientAddress.street}
                className="w-[327px] py-[16px] rounded-[4px] bg-white border-[1px] border-[#DFE3FA] px-[20px]"
              />
            </div>
            <div className="city-post mt-[24px] flex gap-[23px]">
              <div className="city flex flex-col gap-[9px]">
                <label
                  htmlFor="cityName"
                  className="text-[#7E88C3] text-[13px] font-medium"
                >
                  City
                </label>
                <input
                  type="text"
                  id="cityName"
                  {...register("cityName")}
                  defaultValue={invoice.clientAddress.city}
                  className="w-[152px] py-[16px] rounded-[4px] bg-white border-[1px] border-[#DFE3FA] px-[20px]"
                />
              </div>
              <div className="post flex flex-col gap-[9px]">
                <label
                  htmlFor="postCode"
                  className="text-[#7E88C3] text-[13px] font-medium"
                >
                  Post Code
                </label>
                <input
                  type="text"
                  id="postCode"
                  {...register("postCode")}
                  defaultValue={invoice.clientAddress.postCode}
                  className="w-[152px] py-[16px] rounded-[4px] bg-white border-[1px] border-[#DFE3FA] px-[20px]"
                />
              </div>
            </div>
            <div className="country flex flex-col mt-[25px] gap-[9px]">
              <label
                htmlFor="countryTo"
                className="text-[#7E88C3] text-[13px] font-medium"
              >
                Country
              </label>
              <input
                type="text"
                id="countryTo"
                {...register("countryTo")}
                defaultValue={invoice.clientAddress.country}
                className="w-[327px] py-[16px] rounded-[4px] bg-white border-[1px] border-[#DFE3FA] px-[20px]"
              />
            </div>
            <div className="Invoice Date flex flex-col mt-[25px] gap-[9px]">
              <label
                htmlFor="invoiceDate"
                className="text-[#7E88C3] text-[13px] font-medium"
              >
                Invoice Date
              </label>
              <div className="relative w-[327px]">
                <DatePicker
                  selected={invoiceDate}
                  onChange={(date) => {
                    setInvoiceDate(date);
                    setValue("invoiceDate", date);
                    trigger("invoiceDate");
                  }}
                  dateFormat="dd MMM yyyy"
                  className="w-[327px] py-[16px] pl-[20px] pr-[40px] rounded-[4px] bg-white border border-[#DFE3FA] appearance-none"
                />
                <img
                  src={calendarIcon}
                  alt="calendarIcon"
                  className="absolute right-[15px] top-1/2 -translate-y-1/2 pointer-events-none"
                />
              </div>
            </div>
            <div className="paymentTerms Date flex flex-col mt-[25px] gap-[9px]">
              <label
                htmlFor="paymentTerms"
                className="text-[#7E88C3] text-[13px] font-medium"
              >
                Payment Terms
              </label>
              <div className="relative w-[327px]">
                <DatePicker
                  selected={paymentDate}
                  onChange={(date) => {
                    setPaymentDate(date);
                    setValue("paymentTerms", date);
                    trigger("paymentTerms");
                  }}
                  dateFormat="dd MMM yyyy"
                  className="w-[327px] py-[16px] pl-[20px] pr-[40px] rounded-[4px] bg-white border border-[#DFE3FA] appearance-none"
                />

                <img
                  src={calendarIcon}
                  alt="calendarIcon"
                  className="absolute right-[15px] top-1/2 -translate-y-1/2 pointer-events-none"
                />
              </div>
            </div>
            <div className="description mt-[24px] flex flex-col gap-[9px]">
              <label
                className="text-[#7E88C3] text-[13px] font-medium"
                htmlFor="projectDescription"
              >
                Project Description
              </label>
              <input
                type="text"
                id="projectDescription"
                {...register("projectDescription")}
                defaultValue={invoice.description}
                className="w-[327px] py-[16px] rounded-[4px] bg-white border-[1px] border-[#DFE3FA] px-[20px]"
              />
            </div>
            <p className="mt-[69px] text-[#777F98] text-[18px] font-bold">
              Item List
            </p>
            <div className="itemName mt-[24px] flex flex-col gap-[9px]">
              <label
                className="text-[#7E88C3] text-[13px] font-medium"
                htmlFor="itemName"
              >
                Item Name
              </label>
              <input
                type="text"
                id="itemName"
                {...register("itemName")}
                defaultValue={invoice.items[0].name}
                className="w-[327px] py-[16px] rounded-[4px] bg-white border-[1px] border-[#DFE3FA] px-[20px]"
              />
            </div>
            <div className="q-price-total flex items-center gap-[16px] mt-[25px] ">
              <div className="q flex flex-col gap-[9px]">
                <label
                  htmlFor="qty"
                  className="text-[#7E88C3] text-[13px] font-mediums"
                >
                  Qty.
                </label>
                <input
                  type="text"
                  id="qty"
                  {...register("qty")}
                  defaultValue={invoice.items[0].quantity}
                  className="w-[64px] py-[16px] rounded-[4px] bg-white border-[1px] border-[#DFE3FA] px-[20px]"
                />
              </div>
              <div className="price flex flex-col gap-[9px]">
                <label
                  htmlFor="price"
                  className="text-[#7E88C3] text-[13px] font-mediums"
                >
                  Price
                </label>
                <input
                  type="text"
                  id="price"
                  {...register("price")}
                  defaultValue={invoice.items[0].price}
                  className="w-[100px] py-[16px] rounded-[4px] bg-white border-[1px] border-[#DFE3FA] px-[20px]"
                />
              </div>
              <div className="total  flex flex-col gap-[28px] justify-center">
                <label
                  htmlFor="total"
                  className="mt-[10px] text-[#7E88C3] text-[13px] font-mediums "
                >
                  Price
                </label>
                <p className="w-[56px] h-[48px] ">{invoice.total}</p>
              </div>
              <img
                src={deleteIcon}
                alt="delete icon"
                className="ml-[40px] mt-[30px]"
              />
            </div>
            <div className="itemName2 mt-[24px] flex flex-col gap-[9px]">
              <label
                className="text-[#7E88C3] text-[13px] font-medium"
                htmlFor="itemName"
              >
                Item Name
              </label>
              <input
                type="text"
                id="itemName"
                {...register("itemName")}
                defaultValue={invoice.items[1]?.name}
                className="w-[327px] py-[16px] rounded-[4px] bg-white border-[1px] border-[#DFE3FA] px-[20px]"
              />
            </div>
            <div className="q-price-total flex items-center gap-[16px] mt-[25px] ">
              <div className="q flex flex-col gap-[9px]">
                <label
                  htmlFor="qty"
                  className="text-[#7E88C3] text-[13px] font-mediums"
                >
                  Qty.
                </label>
                <input
                  type="text"
                  id="qty"
                  {...register("qty")}
                  defaultValue={invoice.items[1]?.quantity}
                  className="w-[64px] py-[16px] rounded-[4px] bg-white border-[1px] border-[#DFE3FA] px-[20px]"
                />
              </div>
              <div className="price flex flex-col gap-[9px]">
                <label
                  htmlFor="price"
                  className="text-[#7E88C3] text-[13px] font-mediums"
                >
                  Price
                </label>
                <input
                  type="text"
                  id="price"
                  {...register("price")}
                  defaultValue={invoice.items[1]?.price}
                  className="w-[100px] py-[16px] rounded-[4px] bg-white border-[1px] border-[#DFE3FA] px-[20px]"
                />
              </div>
              <div className="total  flex flex-col gap-[28px] justify-center">
                <label
                  htmlFor="total"
                  className="mt-[10px] text-[#7E88C3] text-[13px] font-mediums "
                >
                  Price
                </label>
                <p className="w-[56px] h-[48px] ">{invoice.total}</p>
              </div>
              <img
                src={deleteIcon}
                alt="delete icon"
                className="ml-[40px] mt-[30px]"
              />
            </div>
            <footer className="w-full p-[24px] bg-white shadow-box-light mt-[103px] flex items-center justify-center gap-[7px]">
              <div className="discard">
                <button
                  onClick={handleDiscard}
                  className="w-[84px] py-[16px] bg-pricing rounded-[24px] text-[#7E88C3] text-[15px] font-bold"
                >
                  Discard
                </button>
              </div>
              <div className="draft-send flex gap-[7px] items-center">
                <button
                  type="submit"
                  className="w-[112px] py-[16px] bg-mark rounded-[24px] text-[#fff] font-bold text-[15px]"
                >
                  Save & Send
                </button>
              </div>
            </footer>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditInvoice;
