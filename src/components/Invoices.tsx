import { useInvoice } from "../contexts/InvoiceProvider";
import arrowDown from "../../public/assets/icon-arrow-down.svg";
import plusIcon from "../../public/assets/icon-plus.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import illustration from "../../public/assets/illustration-empty.svg";

const Invoices = () => {
  const { invoices } = useInvoice();
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
    navigate("/invoices/newinvoice");
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-[375px] invoice-filter-add flex flex-row items-center justify-between mt-[36px] px-[25px]">
        <div className="invoices flex flex-col">
          <h2 className="text-[#0C0E16] text-[24px] font-bold dark:text-[#fff]">
            Invoices
          </h2>
          <p className="text-[#888EB0] text-[13px] font-normal dark:text-[#DFE3FA]">
            {invoices.length} invoices
          </p>
        </div>
        <div className="filter-new flex flex-row items-center gap-[18px] ">
          <div
            className="filter flex flex-row gap-[12px] items-center "
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <p className="text-[#0C0E16] text-[15px] font-bold dark:text-[#fff]">
              Filter
            </p>
            <img src={arrowDown} alt="arrow down icon" />
          </div>
          <div
            onClick={handleNew}
            className="new w-[90px] py-[6px] rounded-[24px] bg-new flex flex-row items-center px-[6px] gap-[8px]"
          >
            <div className="new-circle w-[32px] h-[32px] rounded-[50%] flex flex-col items-center justify-center bg-white">
              <img src={plusIcon} alt="plus icon" />
            </div>
            <p className="text-[#fff] text-[15px] font-bold">New</p>
          </div>
        </div>
      </div>
      {invoices.length <= 1 && (
        <div className="mt-[102px] ">
          <img src={illustration} alt="empty illustration" />
          <p className="mt-[42px] text-center text-[24px] font-bold text-[#0C0E16]">
            There is nothing here
          </p>
          <p className="mt-[23px] max-w-[240px] text-center text-[#888EB0] text-[13px] font-medium">
            Create an invoice by clicking the New button and get started
          </p>
        </div>
      )}
      {filterOpen && (
        <div className="w-[150px] bg-white rounded-[6px] shadow-box-light ml-[120px] px-[10px] py-[10px] flex flex-col gap-[4px] dark:bg-box-dark">
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
      <div className="invoice-list mt-[32px] flex flex-col gap-[16px]">
        {filteredInvoice.map((invoice) => {
          return (
            <div
              onClick={() => handleMoreInfo(invoice.id)}
              key={invoice.id}
              className="p-[24px] w-[327px] bg-white rounded-[8px] flex flex-col shadow-box-light dark:shadow-box-dark dark:bg-box-dark"
            >
              <div className="id-name flex flex-row items-center justify-between">
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
              <div className="status flex flex-row items-center justify-between mt-[24px]">
                <div className="left flex flex-col gap-[9px]">
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
    </div>
  );
};

export default Invoices;
