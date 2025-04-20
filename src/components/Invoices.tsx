import { useInvoice } from "../contexts/InvoiceProvider";
import arrowDown from "../../public/assets/icon-arrow-down.svg";
import plusIcon from "../../public/assets/icon-plus.svg";

const Invoices = () => {
  const { invoices } = useInvoice();
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-[375px] invoice-filter-add flex flex-row items-center justify-between mt-[36px] px-[25px]">
        <div className="invoices flex flex-col">
          <h2 className="text-[#0C0E16] text-[24px] font-bold">
            Invoices
          </h2>
          <p className="text-[#888EB0] text-[13px] font-normal">
            {invoices.length + 1} invoices
          </p>
        </div>
        <div className="filter-new flex flex-row items-center gap-[18px] ">
          <div className="filter flex flex-row gap-[12px] items-center ">
            <p className="text-[#0C0E16] text-[15px] font-bold">
              Filter
            </p>
            <img src={arrowDown} alt="arrow down icon" />
          </div>
          <div className="new w-[90px] py-[6px] rounded-[24px] bg-new flex flex-row items-center px-[6px] gap-[8px]">
            <div className="new-circle w-[32px] h-[32px] rounded-[50%] flex flex-col items-center justify-center bg-white">
              <img src={plusIcon} alt="plus icon" />
            </div>
            <p className="text-[#fff] text-[15px] font-bold">New</p>
          </div>
        </div>
      </div>
      <div className="invoice-list mt-[32px] flex flex-col gap-[16px]">
        {invoices.map((invoice) => {
          return (
            <div className="p-[24px] w-[327px] bg-white rounded-[8px]"></div>
          );
        })}
      </div>
    </div>
  );
};

export default Invoices;
