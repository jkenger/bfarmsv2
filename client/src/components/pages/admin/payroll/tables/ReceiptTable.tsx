import { useQuery } from "@tanstack/react-query";
// import useFilterParams from "@/components/hooks/useFilterParams";

import { getReceipts } from "../api/receipt.api";
import { useParams } from "react-router-dom";
import DataTablePaginationNoBtn from "@/components/ui/data-table-pagination-nobtn";
import useFilterParams, {
  getSearchParams,
} from "@/components/hooks/useFilterParams";
import { useLocalStorageState } from "@/components/hooks/useLocalStorageState";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useKeyDown } from "@/components/hooks/useKeyDown";

export type TReceiptSignatory = {
  value?: string;
  valueTitle?: string;
};

type Props = {
  onEdit: boolean;
  onEditMode: () => void;
};

function ReceiptTable({ onEdit, onEditMode }: Props) {
  // Controlled component for signatories

  // Name: LINA F. ZULUETA // Chief Accountant, BFAR-NIFTC
  // Name: VICTORIANA C. BA-AY // Cashier, BFAR-NIFTC

  // Name: ZALDY P. PEREZ // OIC, Asst. Director for Administrative Division

  // Romualdo M. POL, MSc // Chief Aquaculturist, BFAR-NIFTC

  const initialLocalStateValue: TReceiptSignatory = {
    value: undefined,
    valueTitle: undefined,
  };

  const [signatory1, setSignatory1] = useLocalStorageState(
    [initialLocalStateValue],
    "signatory1"
  );

  const [signatory2, setSignatory2] = useLocalStorageState(
    [initialLocalStateValue],
    "signatory2"
  );
  const [signatory3, setSignatory3] = useLocalStorageState(
    [initialLocalStateValue],
    "signatory3"
  );
  const [signatory4, setSignatory4] = useLocalStorageState(
    [initialLocalStateValue],
    "signatory4"
  );

  const [stateSignatory1, setStateSignatory1] =
    useState<TReceiptSignatory>(signatory1);
  const [stateSignatory2, setStateSignatory2] =
    useState<TReceiptSignatory>(signatory2);
  const [stateSignatory3, setStateSignatory3] =
    useState<TReceiptSignatory>(signatory3);
  const [stateSignatory4, setStateSignatory4] =
    useState<TReceiptSignatory>(signatory4);

  const handleOnSave = () => {
    setSignatory1(stateSignatory1);
    setSignatory2(stateSignatory2);
    setSignatory3(stateSignatory3);
    setSignatory4(stateSignatory4);
    onEditMode();
    toast.success("Changes saved", {
      description: "Signatories are updated",
    });
  };

  const handleOnCancel = () => {
    onEditMode();
    toast.warning("Discarded changes", {
      description: "Signatories are not updated",
    });
  };

  useKeyDown("Enter", handleOnSave);
  useKeyDown("Escape", () => {
    toast.warning("Discarded changes", {
      description: "Changes are not saved",
    });
    onEdit && handleOnCancel();
  });

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

  const { handlePageChange } = useFilterParams();
  const { page } = getSearchParams();
  const data = res?.data.data ? res.data.data : [];
  const numOfPages = res?.data.numOfPages ? res.data.numOfPages : 0;
  // const numOfPages = res?.data.numOfPages ? res.data.numOfPages : 0;
  console.log("asd", data);
  // reset page to 1 if data length is less than numOfPages

  // const { handleGroupChange } = useFilterParams();
  return (
    <div>
      <div className="flex gap-2 justify-end">
        <Button
          variant="outline"
          className={`${onEdit ? "block" : "hidden"}`}
          size="sm"
          onClick={handleOnCancel}
        >
          Discard
        </Button>
        <Button
          className={`${onEdit ? "block" : "hidden"}`}
          size="sm"
          onClick={handleOnSave}
        >
          Save
        </Button>
      </div>
      <div className="font-serif p-2  text-center">
        <div className="font-semibold text-lg -space-y-1">
          <h1 className="font-extrabold text-lg">PAYROLL</h1>
          <h2 className="font-extrabold text-lg underline">
            For the period {new Date(data[0].payroll.from).toDateString()} to{" "}
            {new Date(data[0].payroll.to).toDateString()}
          </h2>
        </div>
        <div className="text-start">
          <h2 className="italic text-[#0070C0] font-cam leading-5 uppercase">
            {data[0].payroll.projectName}
          </h2>
          <div className="flex items-center justify-between">
            <p className="text-xs">Entity Name: BFAR-NIFTC</p>
            <p className="text-xs">
              Payroll No.: <span>{data[0].payroll.payrollNumber}</span>
            </p>
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
            <tr className="[&>th]:p-2 [&>th]:font-normal">
              <th rowSpan={2} className="w-[1%] border border-black">
                Serial No.
              </th>
              <th rowSpan={2} className="w-[15%] border border-black">
                Name
              </th>
              <th rowSpan={2} className="w-[20%] border border-black">
                Position
              </th>
              <th rowSpan={2} className="w-[3%] border border-black">
                PRC
              </th>
              <th rowSpan={2} className="border border-black">
                Monthly Rate
              </th>
              <th rowSpan={2} className="w-[3%] border border-black">
                no. of days
              </th>
              <th rowSpan={2} className="w-[5%] border border-black">
                Gross Amount Earned
              </th>
              <th colSpan={3} className="border border-b-2 border-black">
                Tax
              </th>
              <th colSpan={3} className="border border-b-2 border-black">
                Contributions
              </th>
              <th rowSpan={2} className="b-lr border border-x-2 border-black">
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
              <tr className="[&>td]:p-3">
                <td className="text-center border border-black">{index + 1}</td>
                <td className="text-center border border-black">{item.name}</td>
                <td className="text-center border border-black">
                  {item.designation}
                </td>
                <td className="text-center border border-black"></td>
                <td className="text-center border border-black">
                  {item.salary}
                </td>
                <td className="text-center border border-black">
                  {item.noOfDays}
                </td>
                <td className="text-center border border-black">
                  {item.grossAmountEarned}
                </td>
                <td className="text-center border border-black">{item.tax1}</td>
                <td className="text-center border border-black">{item.tax5}</td>
                <td className="text-center border border-black">
                  {item.tax10}
                </td>
                <td className="text-center border border-black">{item.sss}</td>
                <td className="text-center border border-black">
                  {item.pagibig}
                </td>
                <td className="text-center border border-black">
                  {item.philhealth}
                </td>
                <td className="border border-x-2 border-black text-center">
                  {item.netAmountDue}
                </td>
                <td className="text-end border border-black">{index + 1}</td>
              </tr>
            ))}
            <tr className="[&>td]:p-2">
              <td className="border-b border-black"></td>
              <td className="border-b border-black"></td>
              <td className="border-b border-black"></td>
              <td className="border-b border-black"></td>
              <td className="border-b border-black"></td>
              <td className="border-b border-black"></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="border-black border-l border-r"></td>
              <td className="border-black border-l border-r"></td>
              <td className="border-black border-l border-r"></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td className="pt-0 border border-y-2 border-r-2 border-black ">
                A
              </td>
              <td
                colSpan={5}
                className=" font-[14pt] text-start align-top border-black border-t-2 border-b-0"
              >
                <span className="font-bold pl-1">CERTIFIED:</span>{" "}
                <label className="font-light">
                  Services duly rendered as stated.
                </label>
              </td>
              <td></td>
              <td className=" border-black border-2 border-t-0 p-t-0">C</td>
              <td
                colSpan={7}
                className="text-start border-black border-r font-bold text-[8pt] p-1"
              >
                APPROVED FOR PAYMENT:
                ___________________________________________________
              </td>
            </tr>
            <tr className="[&>td]:p-2">
              <td></td>
              <td colSpan={6} className="border-r-2 border-black"></td>
              <td></td>
              <td colSpan={7} className="text-start">
                __________________________________ (P_____________________)
              </td>
            </tr>
            <tr className="[&>td]:p-2">
              <td></td>
              <td colSpan={2}></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="border-r-2 border-black"></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr className="[&>td]:p-2">
              <td></td>
              <td colSpan={2}></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="border-l-2 border-black"></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              {/* SIGNATORY1 VALUE */}
              <td colSpan={2} className="border-b border-black font-bold">
                {onEdit && (
                  <Input
                    placeholder="Signatory Value"
                    value={stateSignatory1?.value || "Romualdo M. POL, MSc"}
                    onChange={(e) =>
                      setStateSignatory1({ value: e.target.value })
                    }
                    className="mb-1 text-center"
                  />
                )}
                {!onEdit && (stateSignatory1?.value || "Romualdo M. POL, MSc")}
              </td>
              <td></td>
              <td className="border-b border-black"></td>
              <td></td>
              <td></td>
              <td className="border-l-2 border-black"></td>
              {/* SIGNATORY2 VALUE */}
              <td
                colSpan={5}
                className=" border-b border-black uppercase font-bold"
              >
                {onEdit && (
                  <Input
                    placeholder="Signatory Value"
                    value={stateSignatory2?.value || "ZALDY P. PEREZ"}
                    onChange={(e) =>
                      setStateSignatory2({ value: e.target.value })
                    }
                    className="mb-1 text-center"
                  />
                )}
                {!onEdit && (stateSignatory2?.value || "ZALDY P. PEREZ")}
              </td>
              <td></td>
              <td className="border-b border-black"></td>
            </tr>
            <tr>
              <td></td>
              {/* SIGNATORY1 VALUETITLE */}
              <td className=" font-lighter text-center" colSpan={2}>
                {onEdit && (
                  <Input
                    placeholder="Signatory Value"
                    value={
                      stateSignatory1?.valueTitle ||
                      "Chief Aquaculturist, BFAR-NIFTC"
                    }
                    onChange={(e) =>
                      setStateSignatory1({ valueTitle: e.target.value })
                    }
                    className="mb-1 text-center"
                  />
                )}
                {!onEdit &&
                  (stateSignatory1?.valueTitle ||
                    "Chief Aquaculturist, BFAR-NIFTC")}
              </td>
              <td></td>
              <td className=" font-lighter text-center">Date</td>
              <td></td>
              <td></td>
              <td className="border-l-2 border-black"></td>
              {/* SIGNATORT2 VALUETITLE */}
              <td className="font-[16pt] font-lighter text-center" colSpan={5}>
                {onEdit && (
                  <Input
                    placeholder="Signatory Value"
                    value={
                      stateSignatory2?.valueTitle || "Romualdo M. POL, MSc"
                    }
                    onChange={(e) =>
                      setStateSignatory2({ valueTitle: e.target.value })
                    }
                    className="my-1  text-center"
                  />
                )}
                {!onEdit &&
                  (stateSignatory2?.valueTitle ||
                    "OIC, Asst. Director for Administrative Division")}
              </td>
              <td></td>
              <td className="font-[12pt] font-lighter text-center">Date</td>
            </tr>
            <tr className="[&>td]:p-2">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="border-l-2 border-black"></td>
            </tr>
            <tr className="[&>td]:p-2">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="border-l-2 border-black"></td>
              <td></td>
              <td></td>
            </tr>
            <tr className="border-t-2 border-black">
              <td className="border-2 border-black border-l ">B</td>
              <td
                className=" text-start align-top p-1 border-r-2 border-black"
                colSpan={6}
                rowSpan={2}
              >
                <span className="font-bold">CERTIFIED: </span>
                <label className="font-lighter">
                  Supporting documents complete and proper; and cash available
                  in the amount of P______________________.
                </label>{" "}
              </td>
              <td className="border-2 border-black">D</td>
              <td
                className=" font-[14pt] border-r-2 border-black text-start p-1 align-top"
                rowSpan={2}
                colSpan={5}
              >
                <span className="font-bold">CERTIFIED:</span>
                <label className="font-lighter">
                  Each employee whose name appears on the payroll has been paid
                  the amount as indicated opposite his/her name
                </label>
              </td>
              <td className="border-2 border-black">E</td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td colSpan={2} className=" font-[14pt] font-lighter text-start">
                ORS/BURS No. : _______________
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="border-r-2 border-black"></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td
                colSpan={2}
                className=" font-[14pt] font-lighter text-start border-l border-black"
              >
                Date : ____________________
              </td>
            </tr>
            <tr>
              <td></td>
              {/* SIGNATORY3 VALUE */}
              <td colSpan={2} className="border-b border-black font-bold">
                {onEdit && (
                  <Input
                    placeholder="Signatory Value"
                    value={stateSignatory3?.value || "LINA F. ZULUETA"}
                    onChange={(e) =>
                      setStateSignatory3({ value: e.target.value })
                    }
                    className="my-1 text-center"
                  />
                )}
                {!onEdit && (stateSignatory3?.value || "LINA F. ZULUETA")}
              </td>
              <td></td>
              <td className="border-b border-black"></td>
              <td></td>
              <td className="border-r-2 border-black"></td>
              <td></td>
              {/* SIGNATORY4 VALUE */}
              <td colSpan={4} className="border-b border-black font-bold">
                {onEdit && (
                  <Input
                    placeholder="Signatory Value"
                    value={stateSignatory4?.value || "VICTORIANA C. BA-AY"}
                    onChange={(e) =>
                      setStateSignatory4({ value: e.target.value })
                    }
                    className="my-1 text-center"
                  />
                )}
                {!onEdit && (stateSignatory4?.value || "VICTORIANA C. BA-AY")}
              </td>
              <td></td>
              <td
                colSpan={2}
                className=" font-[14pt] font-lighter text-start border-l border-black"
              >
                {" "}
                JEV No. : _____________________
              </td>
            </tr>
            <tr>
              <td></td>
              {/* SIGNATORY3 VALUETITLE */}
              <td className="font-[16pt] font-lighter text-center " colSpan={2}>
                {onEdit && (
                  <Input
                    placeholder="Signatory Value"
                    value={stateSignatory3?.valueTitle || "Chief Accountant"}
                    onChange={(e) =>
                      setStateSignatory3({ valueTitle: e.target.value })
                    }
                    className="my-1 text-center"
                  />
                )}
                {!onEdit && (stateSignatory3?.valueTitle || "Chief Accountant")}
              </td>
              <td></td>
              <td className="font-[12pt] font-lighter  ">Date</td>
              <td></td>
              <td className="border-r-2 border-black"></td>
              <td></td>
              <td></td>
              {/* SIGNATORY4 VALUETITLE */}
              <td className="font-[14pt] font-lighter " colSpan={2}>
                {onEdit && (
                  <Input
                    placeholder="Signatory Value"
                    value={stateSignatory4?.valueTitle || "Cashier"}
                    onChange={(e) =>
                      setStateSignatory4({ valueTitle: e.target.value })
                    }
                    className="my-1 text-center"
                  />
                )}
                {!onEdit && (stateSignatory4?.valueTitle || "Cashier")}
              </td>
              <td></td>
              <td></td>
              <td
                colSpan={2}
                className=" font-[14pt] font-lighter text-start border-l border-black"
              >
                Date: _____
              </td>
            </tr>
            <tr className="[&>td]:p-2">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="border-r-2 border-black"></td>
              <td></td>
              <td></td>
              <td colSpan={4} className="border-r border-black "></td>
            </tr>
          </thead>
        </table>
        <DataTablePaginationNoBtn
          numOfPages={numOfPages}
          pageChange={{ page, handlePageChange }}
        />
      </div>
    </div>
  );
}

export default ReceiptTable;
