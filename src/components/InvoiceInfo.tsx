import { useNavigate, useParams } from "react-router-dom";
import data from "../data.json";
import arrowLeft from "../../public/assets/icon-arrow-left.svg";

const InvoiceInfo = () => {
  const { id } = useParams();
  const invoice = data.find((invoice) => invoice.id == id);
  const navigate = useNavigate();

  const handleGoBack = () => {
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
                #{" "}
                <span className="text-[15px] text-[#0C0E16] font-bold">
                  {invoice.id}
                </span>
              </p>
              <p className="text-[13px] text-[#7E88C3] font-medium">
                {invoice.description}
              </p>
            </div>
            <div className="more-info mt-[30px] text-[#7E88C3] text-[13px] font-medium">
              <p>{invoice.senderAddress.street}</p>
              <p>{invoice.senderAddress.city}</p>
              <p>{invoice.senderAddress.postCode}</p>
              <p>{invoice.senderAddress.country}</p>
            </div>
          </div>
          <div className="mid-info flex flex-wrap mt-[31px] gap-[50px]">
            <div className="date flex flex-col">
              <p>Invoice Date</p>
              <p className="mt-[13px]">
                {new Date(invoice.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
              <p className="mt-[31px]">Payment Due</p>
              <p className="mt-[13px]">
                {new Date(invoice.paymentDue).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="bill ">
              <p>Bill To</p>
            </div>
            <div className="sent-to ">
              <p>Sent To</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceInfo;
