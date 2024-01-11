import { useQuery } from "@tanstack/react-query";
// import useFilterParams from "@/components/hooks/useFilterParams";

import { useParams } from "react-router-dom";
import DataTablePaginationNoBtn from "@/components/ui/data-table-pagination-nobtn";
import useFilterParams, {
  getSearchParams,
} from "@/components/hooks/useFilterParams";
import { useLocalStorageState } from "@/components/hooks/useLocalStorageState";

import { useRef, useState } from "react";
import { toast } from "sonner";
import { useKeyDown } from "@/components/hooks/useKeyDown";

import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { getSheets } from "../api/sheets.api";
import { Button } from "@/components/ui/button";

import { Printer } from "lucide-react";
import { IconProperties } from "@/types/common";

import { useReactToPrint } from "react-to-print";
import "./../css/print.css"; // Import the CSS file

export type TSignatory = {
  value?: string;
  valueTitle?: string;
};

type Props = {
  onEdit: boolean;
  onEditMode: () => void;
};

function SheetTable({ onEdit, onEditMode }: Props) {
  // Controlled component for signatories

  // Name: LINA F. ZULUETA // Chief Accountant, BFAR-NIFTC
  // Name: VICTORIANA C. BA-AY // Cashier, BFAR-NIFTC

  // Name: ZALDY P. PEREZ // OIC, Asst. Director for Administrative Division

  // Romualdo M. POL, MSc // Chief Aquaculturist, BFAR-NIFTC

  const initialLocalStateValue: TSignatory = {
    value: undefined,
    valueTitle: undefined,
  };

  const [signatory1, setSignatory1] = useLocalStorageState(
    [initialLocalStateValue],
    "signatory1"
  );

  const [stateSignatory1, setStateSignatory1] =
    useState<TSignatory>(signatory1);

  const handleOnSave = () => {
    setSignatory1(stateSignatory1);
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
  const {
    data: res,
    // isFetching,
    // isError,
    // isSuccess,
    // error,
    // refetch,
  } = useQuery(getSheets({ type: "paginated", id: id ?? "" }));

  const { handlePageChange } = useFilterParams();
  const { page } = getSearchParams({ setLimitDefault: "2" });
  const data = res?.data.data ? res.data.data : [];
  const numOfPages = res?.data.numOfPages || 0;

  const toPrintRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => toPrintRef.current,
  });

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
        {!onEdit && (
          <>
            <DataTablePaginationNoBtn
              numOfPages={numOfPages}
              pageChange={{
                page: page,
                handlePageChange: handlePageChange,
              }}
            />
            <Button
              variant="outline"
              size="sm"
              className="flex  justify-between gap-4"
              onClick={handlePrint}
            >
              <span>Print {data.length} sheet(s)</span>
              <Printer size={IconProperties.SIZE_ICON} />{" "}
            </Button>
          </>
        )}
      </div>
      <div
        className="flex gap-4 justify-center flex-wrap w-full print-sheet "
        ref={toPrintRef}
      >
        {data.map((sheet: TDataFields) => (
          <table className="p-4 font-calibri text-xs w-2/5 print:break-after-page print:w-2/3">
            <tr>
              <td colSpan={7}>
                <label>CIVIL SERVICE FORM No. 48</label>{" "}
              </td>
              <td></td>
            </tr>
            <tr>
              <td colSpan={7} className="text-center">
                <label>DAILY TIME RECORD</label>
              </td>
              <td></td>
            </tr>
            <tr>
              <td
                colSpan={7}
                className="border-b border-black text-center font-bold"
              >
                <label>{sheet.name}</label>{" "}
              </td>
              <td></td>
            </tr>
            <tr>
              <td colSpan={7} className="text-center">
                <label>(Name)</label>
              </td>
              <td></td>
            </tr>
            <tr>
              <td colSpan={7} className="text-center">
                <label>
                  {" "}
                  For the month{" "}
                  <span className="font-bold">
                    {format(new Date(sheet.from), "MMMM d")}-{" "}
                    {format(new Date(sheet.to), "MMMM d yyyy")}
                  </span>
                </label>
              </td>
              <td></td>
            </tr>
            <tr>
              <td colSpan={7}>
                <div className=" flex justify-between">
                  {" "}
                  <label> Official hours for arrival</label>
                  <label> Regular days__________</label>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={7} className="text-end">
                <label> Saturdays__________</label>
              </td>
            </tr>
            <tr className="[&>td]:border [&>td]:border-black [&>td]:text-center">
              <td rowSpan={2}>
                <label> Date</label>
              </td>
              <td colSpan={2}>
                <label>A.M.</label>
              </td>
              <td colSpan={2}>
                <label>P.M.</label>
              </td>
              <td colSpan={2}>
                <label>UNDERTIME</label>
              </td>
            </tr>
            <tr className="actTable [&>td]:border [&>td]:border-black [&>td]:text-center [&>td]:w-1/6">
              <td>
                <label>TIME-IN</label>
              </td>
              <td>
                <label>TIME-OUT</label>
              </td>
              <td>
                <label>TIME-IN</label>
              </td>
              <td>
                <label>TIME-OUT</label>
              </td>
              <td>
                <label>Hours</label>
              </td>
              <td>
                <label>Minutes</label>
              </td>
            </tr>
            {new Array(31 + 1).fill(1, 1).map((_, index) => {
              const attendance = sheet.attendances.find(
                (att: TSheetAttendances) =>
                  new Date(att.attendanceDate).getDate() === index
              );
              console.log("attendance", attendance);
              const amTimeIn = attendance?.travelPass
                ? attendance.travelPass
                : attendance?.amTimeIn
                ? format(new Date(attendance.amTimeIn), "pp")
                : "";
              const amTimeOut = attendance?.amTimeOut
                ? format(new Date(attendance.amTimeOut), "pp")
                : "";
              const pmTimeIn = attendance?.pmTimeIn
                ? format(new Date(attendance.pmTimeIn), "pp")
                : "";
              const pmTimeOut = attendance?.pmTimeOut
                ? format(new Date(attendance.pmTimeOut), "pp")
                : "";
              return (
                <>
                  <tr className="actTable [&>td]:border [&>td]:border-black [&>td]:text-center">
                    <td>
                      <label>{index}</label>
                    </td>
                    <td>
                      <label>{amTimeIn}</label>
                    </td>
                    <td>
                      <label>{amTimeOut}</label>
                    </td>
                    <td>
                      <label>{pmTimeIn}</label>
                    </td>
                    <td>
                      <label>{pmTimeOut}</label>
                    </td>
                    <td>
                      <label>{attendance?.undertime}</label>
                    </td>
                    <td>
                      <label></label>
                    </td>
                  </tr>
                </>
              );
            })}

            <tr>
              <td className="text-center">
                <label>TOTAL</label>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr className="[&>td]:p-2">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td colSpan={7}>
                <label>
                  {" "}
                  I CERTIFY on my honor that the above is true and correct
                  report of the hours of work{" "}
                </label>
              </td>
            </tr>
            <tr>
              <td colSpan={7}>
                <label>
                  {" "}
                  performed, record of which was made daily at the time of and
                  departure from Office.
                </label>
              </td>
            </tr>
            <tr>
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
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td colSpan={2}>
                <label className="font-weight:bold;"></label>
              </td>
            </tr>
            <tr className="[&>td]:py-6">
              <td colSpan={4}>
                <label>Verified as to the prescribed office hours.</label>{" "}
              </td>
              <td></td>
              <td colSpan={2} className="font-bold text-center">
                <label>{sheet.name}</label>
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td colSpan={7} className="text-center">
                <label className="font-bold">
                  {" "}
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
                  {!onEdit &&
                    (stateSignatory1?.value || "Romualdo M. POL, MSc")}
                </label>
              </td>
            </tr>
            <tr>
              <td colSpan={7} className="d-flex text-center editable f-sig">
                <label className="f-sig-label">
                  {onEdit && (
                    <Input
                      placeholder="Signatory Value"
                      value={stateSignatory1?.valueTitle || "Chief, BFAR-NIFTC"}
                      onChange={(e) =>
                        setStateSignatory1({ valueTitle: e.target.value })
                      }
                      className="mb-1 text-center"
                    />
                  )}
                  {!onEdit &&
                    (stateSignatory1?.valueTitle || "Chief, BFAR-NIFTC")}{" "}
                </label>{" "}
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </table>
        ))}
      </div>
    </div>
  );
}

export default SheetTable;
