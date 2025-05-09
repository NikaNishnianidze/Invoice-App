import { useInvoice } from "../contexts/InvoiceProvider";
import arrowDown from "../../public/assets/icon-arrow-down.svg";
import plusIcon from "../../public/assets/icon-plus.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import illustration from "../../public/assets/illustration-empty.svg";
import AddInvoice from "./AddInvoice";

const Invoices = () => {
  const { invoices, newInvoice, setNewInvoice } = useInvoice();
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [filteredInvoice, setFilteredInvoice] = useState(invoices);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedStatuses.length === 0) {
      setFilteredInvoice(invoices);
    } else {
      const filtered = invoices.filter((inv) =>
        selectedStatuses.includes(inv.status)
      );
      setFilteredInvoice(filtered);
    }
  }, [selectedStatuses, invoices]);

  const handleMoreInfo = (id: string) => {
    navigate(`/invoices/${id}`);
  };

  const handleNew = () => {
    if (window.innerWidth >= 768) {
      setNewInvoice(true);
    } else {
      navigate("/invoices/newinvoice");
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="div mb:hidden tb:block tb:flex tb:flex-row tb:items-center tb:justify-center tb:w-[768px]">
        {newInvoice && (
          <div className="hidden tb:block absolute top-20 dk:top-0 dk:left-26 inset-0 h-[2320px] bg-black/50 flex items-center justify-center z-10 tb:flex tb:items-start tb:justify-start">
            <div className="hidden absolute top-[-20px] tb:flex tb:justify-start left-0 tb:block bg-white w-[616px] p-[24px] rounded-[8px] shadow-box-light dark:bg-box-dark mt-[20px] z-20">
              <AddInvoice />
            </div>
          </div>
        )}
      </div>

      <div className="w-[375px] invoice-filter-add flex flex-row items-center justify-between mt-[36px] px-[25px] tb:w-[768px] tb:mt-[62px] tb:px-[48px]">
        <div className="invoices flex flex-col">
          <h2 className="text-[#0C0E16] text-[24px] font-bold dark:text-[#fff]">
            Invoices
          </h2>
          <p className="mb:block tb:hidden text-[#888EB0] text-[13px] font-normal dark:text-[#DFE3FA]">
            {invoices.length} invoices
          </p>
          <p className="mb:hidden tb:block text-[#888EB0] text-[13px] font-normal dark:text-[#DFE3FA]">
            There are {invoices.length} total invoices
          </p>
        </div>
        <div className="filter-new flex flex-row items-center gap-[18px]  cursor-pointer">
          <div
            className="filter flex flex-row gap-[12px] items-center "
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <p className="mb:block tb:hidden text-[#0C0E16] text-[15px] font-bold dark:text-[#fff]">
              Filter
            </p>
            <p className="mb:hidden tb:block text-[#0C0E16] text-[15px] font-bold dark:text-[#fff]">
              Filter by status
            </p>
            <img src={arrowDown} alt="arrow down icon" />
          </div>

          <div
            onClick={handleNew}
            className="mb:block tb:hidden new w-[90px] py-[6px] rounded-[24px] bg-new mb:flex mb:flex-row items-center px-[6px] gap-[8px] cursor-pointer hover:bg-new-hover"
          >
            <div className="new-circle w-[32px] h-[32px] rounded-[50%] flex flex-col items-center justify-center bg-white">
              <img src={plusIcon} alt="plus icon" />
            </div>
            <div className="div w-[35px]">
              <p className="text-[#fff] text-[15px] font-bold w-[35px]">New</p>
            </div>
          </div>
          <div
            onClick={handleNew}
            className="mb:hidden tb:block new w-[150px] py-[6px] rounded-[24px] bg-new tb:flex tb:flex-row tb:items-center px-[6px] gap-[8px] cursor-pointer hover:bg-new-hover"
          >
            <div className="new-circle w-[32px] h-[32px] rounded-[50%] flex flex-col items-center justify-center bg-white">
              <img src={plusIcon} alt="plus icon" />
            </div>
            <p className="text-[#fff] text-[15px] font-bold w-[90px]">
              New Invoice
            </p>
          </div>
        </div>
      </div>
      {invoices.length < 1 && (
        <div className="mt-[102px] tb:mt-[231px] ">
          <img src={illustration} alt="empty illustration" />
          <p className="mt-[42px] text-center text-[24px] font-bold text-[#0C0E16] tb:mt-[66px]">
            There is nothing here
          </p>
          <p className="mt-[23px] max-w-[240px] text-center text-[#888EB0] text-[13px] font-medium">
            Create an invoice by clicking the New button and get started
          </p>
        </div>
      )}
      {filterOpen && (
        <div className="w-[150px] bg-white rounded-[6px] shadow-box-light ml-[120px] px-[10px] py-[10px] flex flex-col gap-[4px] dark:bg-box-dark tb:ml-[230px]">
          {["paid", "pending", "draft"].map((status) => (
            <label
              key={status}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedStatuses.includes(status)}
                onChange={() => {
                  setSelectedStatuses((prev) =>
                    prev.includes(status)
                      ? prev.filter((s) => s !== status)
                      : [...prev, status]
                  );
                }}
                className={`
                  appearance-none
                  w-5 h-5 
                  border border-gray-300 
                  rounded-full 
                  cursor-pointer 
                  transition-all 
                  checked:bg-purple-600 
                  checked:border-transparent 
                  dark:bg-white/10 dark:checked:bg-purple-400
                `}
              />
              <span className="capitalize text-[15px] text-[#0C0E16] font-bold dark:text-[#fff]">
                {status}
              </span>
            </label>
          ))}
        </div>
      )}
      <div className="mb:block gap-[16px] tb:hidden invoice-list mt-[32px] mb:flex mb:flex-col ">
        {filteredInvoice.map((invoice) => {
          return (
            <div
              onClick={() => handleMoreInfo(invoice.id)}
              key={invoice.id}
              className="p-[24px] w-[327px] bg-white rounded-[8px] mb:flex mb:flex-col shadow-box-light dark:shadow-box-dark dark:bg-box-dark cursor-pointer"
            >
              <div className="id-name mb:flex mb:flex-row mb:items-center mb:justify-between">
                <p className="text-[#7E88C3] text-[15px] font-bold">
                  #
                  <span className="text-[#0C0E16] text-[15px] font-bold dark:text-[#fff]">
                    {invoice.id}
                  </span>
                </p>
                <p className="text-[#858BB2] text-[13px] font-medium dark:text-[#fff]">
                  {invoice.clientName}
                </p>
              </div>
              <div className="status mb:flex mb:flex-row mb:items-center mb:justify-between mt-[24px]">
                <div className="left flex flex-col gap-[9px] tb:flex-row ">
                  <p className="text-[#888EB0] text-[13px] font-medium dark:text-[#DFE3FA]">
                    Due
                    {new Date(invoice.paymentDue).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-[#0C0E16] text-[15px] font-bold dark:text-[#fff]">
                    £ {invoice.total.toLocaleString()}
                  </p>
                </div>
                <div className="right flex flex-row items-center">
                  <div
                    className={`status w-[104px] py-[10px] flex flex-row items-center justify-center gap-[8px] text-center bg-paid/10 rounded-[6px] ${
                      invoice.status === "paid"
                        ? "dark:bg-paid/0.5"
                        : invoice.status === "pending"
                        ? "dark:bg-pending/10 "
                        : invoice.status === "draft"
                        ? "dark:bg-draft/0.5"
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
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mb:hidden tb:block tb:flex tb:flex-col tb:gap-[16px] invoice-list mt-[32px] flex flex-col gap-[16px] tb:mb-[173px] tb:mt-[77px]">
        {filteredInvoice.map((invoice) => {
          return (
            <div
              onClick={() => handleMoreInfo(invoice.id)}
              key={invoice.id}
              className="p-[24px] w-[327px] bg-white rounded-[8px] flex flex-col shadow-box-light dark:shadow-box-dark dark:bg-box-dark tb:w-[672px] tb:flex-row tb:justify-between tb:items-center "
            >
              <div className="id-name flex flex-row items-center gap-[51px]">
                <div className="flex items-center gap-[28px]">
                  <p className="text-[#7E88C3] text-[15px] font-bold">
                    #
                    <span className="text-[#0C0E16] text-[15px] font-bold dark:text-[#fff]">
                      {invoice.id}
                    </span>
                  </p>
                  <p className="text-[#888EB0] text-[13px] font-medium dark:text-[#DFE3FA]">
                    Due
                    {new Date(invoice.paymentDue).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <p className="text-[#858BB2] text-[13px] font-medium dark:text-[#fff]">
                  {invoice.clientName}
                </p>
              </div>
              <div className="status flex flex-row items-center gap-[40px] mt-[24px] tb:mt-[0px]">
                <div className="left flex flex-col gap-[9px] tb:flex-row ">
                  <p className="text-[#0C0E16] text-[15px] font-bold dark:text-[#fff]">
                    £ {invoice.total.toLocaleString()}
                  </p>
                </div>
                <div className="right flex flex-row items-center">
                  <div
                    className={`status w-[104px] py-[10px] flex flex-row items-center justify-center gap-[8px] text-center bg-paid/10 rounded-[6px] ${
                      invoice.status === "paid"
                        ? "dark:bg-paid/0.5"
                        : invoice.status === "pending"
                        ? "dark:bg-pending/10 "
                        : invoice.status === "draft"
                        ? "dark:bg-draft/0.5"
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
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Invoices;
