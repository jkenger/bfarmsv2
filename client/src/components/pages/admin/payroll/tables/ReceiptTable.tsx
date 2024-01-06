import { useQuery } from "@tanstack/react-query";
// import useFilterParams from "@/components/hooks/useFilterParams";

import { getReceipts } from "../api/receipt.api";
import { useParams } from "react-router-dom";

function ReceiptTable() {
  const { id } = useParams();
  // useQuery for fetching employee is needed here
  console.log("id", id);
  const {
    data: res,
    // isFetching,
    // isError,
    // isSuccess,
    // error,
    // refetch,
  } = useQuery(getReceipts({ type: "paginated", payrollId: id }));

  const data = res?.data.data ? res.data.data : [];
  // const numOfPages = res?.data.numOfPages ? res.data.numOfPages : 0;
  console.log("asd", data);
  // reset page to 1 if data length is less than numOfPages

  // const { handleGroupChange } = useFilterParams();
  return (
    <div className="font-serif p-2 bg-white text-center">
      <div className="font-semibold text-lg -space-y-1">
        <h1 className="font-extrabold text-lg">PAYROLL</h1>
        <h2 className="font-extrabold text-lg underline">
          For the period {new Date(data[0].payroll.from).toDateString()} to{" "}
          {new Date(data[0].payroll.to).toDateString()}
        </h2>
      </div>
      <div className="text-start">
        <h2 className="italic text-[#0070C0] font-cam leading-5 uppercase">
          {data[0].payroll.name}
        </h2>
        <div className="flex items-center justify-between">
          <p className="text-xs">Entity Name: BFAR-NIFTC</p>
          <p className="text-xs">Payroll No.:_________________</p>
        </div>
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-[#0070C0] font-cam leading-5">
            Fund Cluster: {data[0].payroll.fundCluster}
          </h2>
          <h3>Sheet________of________Sheets</h3>
        </div>
        <p className="text-xs">
          We acknowledge receipt of cash shown opposite our name as full
          compensation for services rendered for the period covered.
        </p>
      </div>
      <table className="border border-black text-xs border-collapse">
        <thead className="">
          <tr className="[&>th]:p-2 [&>th]:font-normal [&>th]:border [&>th]:border-black">
            <th rowSpan={2} className="w-[1%]">
              Serial No.
            </th>
            <th rowSpan={2} className="w-[15%]">
              Name
            </th>
            <th rowSpan={2} className="w-[20%]">
              Position
            </th>
            <th rowSpan={2} className="w-[3%]">
              PRC
            </th>
            <th rowSpan={2}>Monthly Rate</th>
            <th rowSpan={2} className="w-[3%]">
              no. of days
            </th>
            <th rowSpan={2} className="w-[5%]">
              Gross Amount Earned
            </th>
            <th colSpan={3}>Tax</th>
            <th colSpan={3}>Contributions</th>
            <th rowSpan={2} className="b-lr">
              Net Amount Due
            </th>
            <th rowSpan={2}>Signature of Recipient</th>
          </tr>
          <tr className="[&>th]:w-[3%] [&>th]:p-2 [&>th]:font-normal [&>th]:border [&>th]:border-black">
            <th>2%</th>
            <th>5%</th>
            <th>10%</th>
            <th>SSS</th>
            <th>PAGIBIG</th>
            <th>PHILHEALTH</th>
          </tr>
          {data.map((item: TDataFields, index: number) => (
            <tr className="[&>td]:p-2 [&>td]:font-normal [&>td]:border [&>td]:border-black">
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.designation}</td>
              <td></td>
              <td className="text-center">{item.salary}</td>
              <td className="text-center">{item.noOfDays}</td>
              <td className="text-center">{item.grossAmountEarned}</td>
              <td className="text-center">{item.tax1}</td>
              <td className="text-center">{item.tax5}</td>
              <td className="text-center">{item.tax10}</td>
              <td className="text-center">{item.sss}</td>
              <td className="text-center">{item.pagibig}</td>
              <td className="text-center">{item.philhealth}</td>
              <td className="b-lr text-center">{item.netAmountDue}</td>
              <td className="text-end">{index + 1}</td>
            </tr>
          ))}
        </thead>
      </table>
    </div>
  );
}

export default ReceiptTable;
