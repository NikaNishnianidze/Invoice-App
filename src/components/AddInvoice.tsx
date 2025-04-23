import { useNavigate } from "react-router-dom";
import arrowLeft from "../../public/assets/icon-arrow-left.svg";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IInputs } from "../Invoice";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import calendarIcon from "../../public/assets/icon-calendar.svg";
import deleteIcon from "../../public/assets/icon-delete.svg";
import plusIcon from "../../public/assets/icon-plus.svg";
import { useInvoice } from "../contexts/InvoiceProvider";

const AddInvoice = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/invoices");
  };
  const { invoices, setInvoices } = useInvoice();
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
  console.log(errors);
  const onSubmit: SubmitHandler<IInputs> = (data) => {
    console.log(data);
    const itemTotal = parseFloat(data.qty) * parseFloat(data.price);
    const newInvoice = {
      id: Math.random().toLocaleString(),
      createdAt: data.invoiceDate ? data.invoiceDate.toISOString() : "",
      paymentDue: data.paymentTerms ? data.paymentTerms.toISOString() : "",
      paymentTerms: data.paymentTerms
        ? new Date(data.paymentTerms).getTime()
        : 0,
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
          quantity: parseInt(data.qty),
          price: parseFloat(data.price),
          total: itemTotal,
        },
      ],
      total: itemTotal,
    };
    setInvoices([...invoices, newInvoice]);
  };

  const handleSave = () => {
    navigate("/invoices");
  };

  const handleDraft: SubmitHandler<IInputs> = (data: IInputs) => {
    const itemTotal = parseFloat(data.qty) * parseFloat(data.price);
    const newInvoice = {
      id: Math.random().toLocaleString(),
      createdAt: new Date().toISOString(),
      paymentDue: new Date().toISOString(),
      paymentTerms: 0,
      description: data.projectDescription,
      invoiceDate: new Date().toISOString(),
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      status: "draft",
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
          quantity: parseInt(data.qty),
          price: parseFloat(data.price),
          total: itemTotal,
        },
      ],
      total: itemTotal,
    };
    setInvoices([...invoices, newInvoice]);
    navigate("/invoices");
  };

  const handleDiscard = () => {
    navigate("/invoices");
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
      <div className="new w-[327px]">
        <p className="mt-[26px] text-[24px] font-bold text-[#0C0E16] dark:text-[#fff]">
          New Invoice
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-[327px]">
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
            defaultValue={"19 Union Terrace"}
            className="w-[327px] py-[16px] rounded-[4px] bg-white border-[1px] border-[#DFE3FA] px-[20px] dark:bg-box-dark dark:border-price-box dark:text-white"
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
              defaultValue={"London"}
              className="w-[152px] py-[16px] rounded-[4px] bg-white border-[1px] border-[#DFE3FA] px-[20px] dark:bg-box-dark dark:border-price-box dark:text-white"
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
              defaultValue={"E1 3EZ"}
              className="w-[152px] py-[16px] rounded-[4px] bg-white border-[1px] border-[#DFE3FA] px-[20px] dark:bg-box-dark dark:border-price-box dark:text-white"
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
            defaultValue={"United Kingdom"}
            className="w-[327px] py-[16px] rounded-[4px] bg-white border-[1px] border-[#DFE3FA] px-[20px] dark:bg-box-dark dark:border-price-box dark:text-white"
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
            defaultValue={"Alex Grim"}
            className="w-[327px] py-[16px] rounded-[4px] bg-white border-[1px] border-[#DFE3FA] px-[20px] dark:bg-box-dark dark:border-price-box dark:text-white"
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
            defaultValue={"alexgrim@mail.com"}
            className="w-[327px] py-[16px] rounded-[4px] bg-white border-[1px] border-[#DFE3FA] px-[20px] dark:bg-box-dark dark:border-price-box dark:text-white"
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
            defaultValue={"84 Church Way"}
            className="w-[327px] py-[16px] rounded-[4px] bg-white border-[1px] border-[#DFE3FA] px-[20px] dark:bg-box-dark dark:border-price-box dark:text-white"
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
              defaultValue={"Bradford"}
              className="w-[152px] py-[16px] rounded-[4px] bg-white border-[1px] border-[#DFE3FA] px-[20px] dark:bg-box-dark dark:border-price-box dark:text-white"
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
              defaultValue={"BD1 9PB"}
              className="w-[152px] py-[16px] rounded-[4px] bg-white border-[1px] border-[#DFE3FA] px-[20px] dark:bg-box-dark dark:border-price-box dark:text-white"
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
            defaultValue={"United Kingdom"}
            className="w-[327px] py-[16px] rounded-[4px] bg-white border-[1px] border-[#DFE3FA] px-[20px] dark:bg-box-dark dark:border-price-box dark:text-white"
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
              className="w-[327px] py-[16px] pl-[20px] pr-[40px] rounded-[4px] bg-white border border-[#DFE3FA] appearance-none dark:bg-box-dark dark:border-price-box dark:text-white"
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
              className="w-[327px] py-[16px] pl-[20px] pr-[40px] rounded-[4px] bg-white border border-[#DFE3FA] appearance-none dark:bg-box-dark dark:border-price-box dark:text-white"
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
            defaultValue={"Graphic Design"}
            className="w-[327px] py-[16px] rounded-[4px] bg-white border-[1px] border-[#DFE3FA] px-[20px] dark:bg-box-dark dark:border-price-box dark:text-white"
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
            defaultValue={"Banner Design"}
            className="w-[327px] py-[16px] rounded-[4px] bg-white border-[1px] border-[#DFE3FA] px-[20px] dark:bg-box-dark dark:border-price-box dark:text-white"
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
              defaultValue={"1"}
              className="w-[64px] py-[16px] rounded-[4px] bg-white border-[1px] border-[#DFE3FA] px-[20px] dark:bg-box-dark dark:border-price-box dark:text-white"
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
              defaultValue={"156.00"}
              className="w-[100px] py-[16px] rounded-[4px] bg-white border-[1px] border-[#DFE3FA] px-[20px] dark:bg-box-dark dark:border-price-box dark:text-white"
            />
          </div>
          <div className="total  flex flex-col gap-[28px] justify-center">
            <label
              htmlFor="total"
              className="mt-[10px] text-[#7E88C3] text-[13px] font-mediums "
            >
              Price
            </label>
            <p className="w-[56px] h-[48px] dark:text-[#fff]">400.00</p>
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
            defaultValue={"Email Design"}
            className="w-[327px] py-[16px] rounded-[4px] bg-white border-[1px] border-[#DFE3FA] px-[20px] dark:bg-box-dark dark:border-price-box dark:text-white"
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
              defaultValue={"2"}
              className="w-[64px] py-[16px] rounded-[4px] bg-white border-[1px] border-[#DFE3FA] px-[20px] dark:bg-box-dark dark:border-price-box dark:text-white"
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
              defaultValue={"200.00"}
              className="w-[100px] py-[16px] rounded-[4px] bg-white border-[1px] border-[#DFE3FA] px-[20px] dark:bg-box-dark dark:border-price-box dark:text-white"
            />
          </div>
          <div className="total  flex flex-col gap-[28px] justify-center">
            <label
              htmlFor="total"
              className="mt-[10px] text-[#7E88C3] text-[13px] font-mediums "
            >
              Price
            </label>
            <p className="w-[56px] h-[48px] dark:text-[#fff]">400.00</p>
          </div>
          <img
            src={deleteIcon}
            alt="delete icon"
            className="ml-[40px] mt-[30px]"
          />
        </div>

        <button
          type="submit"
          className="w-[327px] rounded-[24px] bg-pricing py-[16px] text-[#7E88C3] text-[15px] font-bold cursor-pointer mt-[48px] flex items-center justify-center gap-[3px]"
        >
          <img src={plusIcon} alt="plus Icon" />
          Add New Item
        </button>
      </form>

      <footer className="w-full p-[24px] bg-white shadow-box-light mt-[103px] flex items-center justify-center gap-[7px] dark:bg-box-dark dark:border-price-box dark:text-white">
        <div className="discard">
          <button
            onClick={handleDiscard}
            className="w-[84px] py-[16px] bg-pricing rounded-[24px] text-[#7E88C3] text-[15px] font-bold dark:bg-price-box dark:border-price-box dark:text-white"
          >
            Discard
          </button>
        </div>
        <div className="draft-send flex gap-[7px] items-center">
          <button
            onClick={() => handleSubmit(handleDraft)()}
            className=" w-[117px] py-[16px] rounded-[24px] text-[#888EB0] text-[15px] font-bold bg-draft"
          >
            Save as Draft
          </button>
          <button
            onClick={handleSave}
            className="w-[112px] py-[16px] bg-mark rounded-[24px] text-[#fff] font-bold text-[15px]"
          >
            Save & Send
          </button>
        </div>
      </footer>
    </div>
  );
};

export default AddInvoice;
