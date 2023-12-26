import ActionMessage from "../../../ui/action-message";
import AttendanceTable from "../../../ui/attendance-table";

import Card from "../../../ui/card";
import CreateAttendanceBtn from "../../../ui/punchin-button";
import { useEffect, useState } from "react";

import onScan from "onscan.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAttendance } from "@/components/pages/root/attendance/api/attendance.api";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { IconProperties } from "@/types/common";
import { useTheme } from "@/components/context/theme-provider";
import { Button } from "@/components/ui/button";

function Attendance() {
  const queryClient = useQueryClient();
  const { mutate, isError, error, isSuccess, isPending, variables } =
    useMutation(createAttendance({ queryClient }));
  const [code, setCode] = useState("");
  const axiosError = error as AxiosError<Error>;
  useEffect(() => {
    onScan.attachTo(document, {
      suffixKeyCodes: [13],
      reactToPaste: false,
      onScan: function (sCode) {
        mutate(sCode);
      },
    });
    return () => onScan.detachFrom(document);
  }, [mutate]);

  const { theme } = useTheme();
  return (
    <main>
      <div className="w-full px-6 md:w-1/2 mx-auto py-14">
        <h1 className="heading text-[2.5rem] font-bold">Attendance</h1>
        <p className="sub-heading text-muted-foreground font-semibold">
          Good Morning!
        </p>
        <Card variant="secondary">
          <p className="sub-heading text-muted-foreground font-semibold">
            Today is{" "}
          </p>
          <h3 className="heading text-3xl font-bold">Monday</h3>
        </Card>
        {isError && (
          <ActionMessage
            status="error"
            message={axiosError.response?.data.message}
          />
        )}
        {isSuccess && <ActionMessage status="success" />}
        <div className="flex flex-col lg:flex-row gap-3">
          <Card>
            <div className="flex flex-col items-center justify-center gap-4 px-4 my-6 mx-auto max-w-lg">
              <p className=" font-bold ">Friday, November 10</p>
              <p className="mb-4 text-3xl sm:text-[3rem] tracking-normal  font-bold -mt-2">
                07:30 <span className="capitalize ">AM</span>
              </p>

              <CreateAttendanceBtn
                onClick={() => mutate(code)}
                onChange={setCode}
                actionButton={
                  theme === "dark" ? (
                    <Button
                      variant="secondary"
                      className="w-full h-24 space-x-2"
                      disabled={isPending}
                    >
                      {isPending && (
                        <>
                          <Loader2
                            size={IconProperties.SIZE}
                            className="animate-spin"
                          />
                          <span>Creating your attendance...</span>
                        </>
                      )}
                      {isSuccess && <span>Create Attendance</span>}
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      type="button"
                      className="bg-white text-secondary-foreground w-full mt-0 flex space-x-2"
                      disabled={isPending}
                    >
                      <span>Create Attendance</span>
                    </Button>
                  )
                }
              />

              <div className="border animate-pulse border-dashed text-xs  p-4 h-24 w-full flex items-center justify-center">
                {isPending && (
                  <p className="text-center flex gap-1">
                    {" "}
                    <Loader2
                      size={IconProperties.SIZE}
                      className="animate-spin"
                    />
                    Scanning<span>{variables}</span>
                  </p>
                )}
                {!isPending && (
                  <p className="text-center flex gap-2">Or Scan your RFID.</p>
                )}
              </div>
            </div>
          </Card>
        </div>
        <div>
          <h1 className="font-bold mb-4">Recent Attendances</h1>
          <AttendanceTable />
        </div>
      </div>
    </main>
  );
}

export default Attendance;
