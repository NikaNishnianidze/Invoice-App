import { useNavigate, useParams } from "react-router-dom";
import arrowLeft from "../../public/assets/icon-arrow-left.svg";
import { useState } from "react";
import { useInvoice } from "../contexts/InvoiceProvider";

const InvoiceInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deleteActive, setDeleteActive] = useState<boolean>(false);
  const { invoices, deleteInvoice, handleMarkAsPaid } = useInvoice();
  const invoice = invoices.find((invoice) => invoice.id == id);

  const handleGoBack = () => {
    navigate("/invoices");
  };

  const handleDelete = () => {
    if (!invoice) return;
    deleteInvoice(invoice.id);
    navigate("/invoices");
    console.log("invoices length:", invoices.length);
  };

  return (
    <div className="flex flex-col items-center">
      {deleteActive && (
        <div className="bg-black/50 fixed inset-0 flex items-center justify-center z-50 ">
          <div className="bg-white w-[327px] p-[32px] rounded-[8px] shadow-box-light">
            <p className="text-[#0C0E16] text-[24px] font-bold">
              Confirm Deletion
            </p>
            <p className="text-[#888EB0] text-[13px] font-medium">
              Are you sure you want to delete invoice {invoice?.id}? This action
              cannot be undone.
            </p>
            <div className="buttons mt-[22px] flex items-center justify-end gap-[8px]">
              <button
                onClick={() => setDeleteActive(false)}
                className="w-[91px] py-[16px] rounded-[24px] text-[#7E88C3] text-[15px] font-bold bg-pricing"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="w-[89px] py-[16px] rounded-[24px] text-[#fff] text-[15px] font-bold bg-delete"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        onClick={handleGoBack}
        className="go-back mt-[33px] flex items-center gap-[23.66px] w-[327px] "
      >
        <img src={arrowLeft} alt="arrow left icon" />
        <p className="text-[#0C0E16] text-[15px] font-bold dark:text-[#fff]">
          Go Back
        </p>
      </div>
      <div className="status-div w-[327px] bg-white shadow-box-light p-[24px] flex flex-row justify-between items-center mt-[31px] dark:bg-box-dark rounded-[6px]">
        <div className="status">
          <p className="text-[13px] text-[#858BB2] font-medium ">Status</p>
        </div>
        {invoice && (
          <div
            className={`status-box w-[104px] py-[10px] rounded-[6px] flex items-center justify-center gap-[8px]  ${
              invoice.status === "paid"
                ? "bg-paid/10 dark:bg-paid/0.5"
                : invoice.status === "pending"
                ? "bg-paid/10 dark:bg-pending/10 "
                : invoice.status === "draft"
                ? "bg-paid/10 dark:bg-draft/0.5"
                : ""
            }`}
          >
            <div
              className={`oval w-[8px] h-[8px] rounded-[50%] ${
                invoice.status === "paid"
                  ? "bg-paid"
                  : invoice.status === "pending"
                  ? "bg-pending "
                  : invoice.status === "draft"
                  ? "bg-draft"
                  : ""
              }`}
            ></div>
            <p
              className={`text-[15px] font-bold ${
                invoice.status === "paid"
                  ? "text-paid"
                  : invoice.status === "pending"
                  ? "text-pending"
                  : invoice.status === "draft"
                  ? "text-draft"
                  : ""
              }`}
            >
              {invoice.status}
            </p>
          </div>
        )}
      </div>
      {invoice && (
        <div className="main-info w-[327px] bg-white shadow-box-light p-[24px] dark:bg-box-dark rounded-[6px] mt-[16px]">
          <div className="basic-info flex flex-col">
            <div className="id">
              <p className="text-[15px]  text-[#7E88C3] font-bold">
                #
                <span className="text-[15px] text-[#0C0E16] font-bold dark:text-[#fff]">
                  {invoice.id}
                </span>
              </p>
              <p className="text-[13px] text-[#7E88C3] font-medium dark:text-[#DFE3FA]">
                {invoice.description}
              </p>
            </div>
            <div className="more-info mt-[30px] text-[#7E88C3] text-[13px] font-medium dark:text-[#DFE3FA]">
              <p>{invoice.senderAddress.street}</p>
              <p>{invoice.senderAddress.city}</p>
              <p>{invoice.senderAddress.postCode}</p>
              <p>{invoice.senderAddress.country}</p>
            </div>
          </div>
          <div className="mid-info flex flex-wrap mt-[31px] gap-[55px]">
            <div className="date flex flex-col">
              <p className="text-[13px] text-[#7E88C3] font-medium dark:text-[#DFE3FA]">
                Invoice Date
              </p>
              <p className="mt-[13px] text-[15px] text-[#0C0E16] font-bold dark:text-[#fff]">
                {new Date(invoice.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
              <p className="mt-[31px] text-[#7E88C3] font-medium dark:text-[#DFE3FA]">
                Payment Due
              </p>
              <p className="mt-[13px] text-[15px] text-[#0C0E16] font-bold dark:text-[#fff]">
                {new Date(invoice.paymentDue).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="bill ">
              <p className="text-[13px] text-[#7E88C3] font-medium dark:text-[#DFE3FA]">
                Bill To
              </p>
              <p className="mt-[13px] text-[15px] text-[#0C0E16] font-bold dark:text-[#fff]">
                {invoice.clientName}
              </p>
              <div className="extra-info mt-[7px] text-[13px] text-[#7E88C3] font-medium dark:text-[#DFE3FA]">
                <p>{invoice.clientAddress.street}</p>
                <p>{invoice.clientAddress.city}</p>
                <p>{invoice.clientAddress.postCode}</p>
                <p>{invoice.clientAddress.country}</p>
              </div>
            </div>
            <div className="sent-to ">
              <p className="text-[13px] text-[#7E88C3] font-medium dark:text-[#DFE3FA]">
                Sent To
              </p>
              <p className="mt-[13px] text-[15px] text-[#0C0E16] font-bold dark:text-[#fff]">
                {invoice.clientEmail}
              </p>
            </div>
          </div>
          <div className="pricing mt-[38px] w-[279px] p-[24px] bg-pricing rounded-t-[8px] dark:bg-price-box">
            <div className="banner flex flex-col gap-[16px] mt-[24px] ">
              {invoice.items.map((item, index) => (
                <div
                  key={index}
                  className="item-row flex items-center justify-between"
                >
                  <div className="design flex flex-col">
                    <p className="text-[15px] font-bold text-[#0C0E16] dark:text-[#fff]">
                      {item.name}
                    </p>
                    <p className="text-[13px] text-[#7E88C3] font-medium dark:text-[#888EB0]">
                      {item.quantity} x £{item.price.toFixed(2)}
                    </p>
                  </div>
                  <p className="text-[15px] font-bold text-[#0C0E16] dark:text-[#fff]">
                    £ {item.total.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="grand-total p-[24px] w-[279px] bg-draft rounded-b-[8px] flex items-center justify-between dark:bg-total-dark">
            <p className="text-[#fff] text-[13px] font-medium">Grand Total</p>
            <p className="text-[#fff] text-[24px] font-bold">
              £ {invoice.total.toFixed(2)}
            </p>
          </div>
        </div>
      )}
      <div className="buttons w-full py-[22px] py-[24px] bg-white shadow-box-light flex items-center gap-[8px] justify-center dark:bg-box-dark mt-[56px]">
        <button className="w-[73px] rounded-[24px] bg-pricing py-[16px] text-[#7E88C3] text-[15px] font-bold cursor-pointer dark:bg-price-box dark:text-[#DFE3FA]">
          Edit
        </button>
        <button
          onClick={() => setDeleteActive(true)}
          className="w-[89px] py-[16px] rounded-[24px] text-[15px] text-[#fff] font-bold bg-delete cursor-pointer"
        >
          Delete
        </button>
        <button
          onClick={() => invoice && handleMarkAsPaid(invoice.id)}
          className="bg-mark w-[149px] py-[16px] rounded-[24px] text-[15px] text-[#fff] font-bold cursor-pointer"
        >
          Mark as Paid
        </button>
      </div>
    </div>
  );
};

export default InvoiceInfo;
