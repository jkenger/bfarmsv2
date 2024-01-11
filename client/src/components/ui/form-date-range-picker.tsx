import * as React from "react";
import { addDays, format, startOfMonth } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DropdownSelect from "./dropdown-select";

enum DateFilter {
  ALL_TIME = "All Records",
  TODAY = "Past 24 hours",
  FIRST_HALF = "1st - 15th",
  SECOND_HALF = "16th - 30th",
  SEMI_MONTHLY = "Past 15 days",
  MONTHLY = "Past 30 days",
  CUSTOM = "Custom Date",
}

export function FormDateRangePicker({
  className,
  form,
}: React.HTMLAttributes<HTMLDivElement> & {
  form: any;
}) {
  const [range, setRange] = React.useState<DateFilter>(DateFilter.FIRST_HALF);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: form.getValues("from")
      ? new Date(form.getValues("from"))
      : startOfMonth(new Date()),
    to: form.getValues("to")
      ? new Date(form.getValues("to"))
      : addDays(startOfMonth(new Date()), 14),
  });

  React.useEffect(() => {
    if (date) {
      form.setValue("from", date.from);
      form.setValue("to", date.to);
    }
    if (!date?.from && !date?.to) {
      setRange(DateFilter.ALL_TIME);
    }
  }, [date, form]);
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-4">
            <DropdownSelect
              name="range"
              labelText="Select range"
              defaultValue={range}
              onValueChange={(value) => {
                setRange(value as DateFilter);
                switch (value) {
                  case DateFilter.FIRST_HALF:
                    setDate((prev) => ({
                      ...prev,
                      from: startOfMonth(new Date()),
                      to: addDays(startOfMonth(new Date()), 14),
                    }));
                    break;

                  case DateFilter.SECOND_HALF:
                    setDate((prev) => ({
                      ...prev,
                      from: addDays(startOfMonth(new Date()), 15),
                      to: addDays(startOfMonth(new Date()), 29),
                    }));

                    break;

                  case DateFilter.ALL_TIME:
                    setDate((prev) => ({
                      ...prev,
                      from: new Date("01/01/2021"),
                      to: new Date(),
                    }));
                    break;
                  case DateFilter.TODAY:
                    setDate((prev) => ({
                      ...prev,
                      from: new Date(),
                      to: new Date(),
                    }));
                    break;
                  case DateFilter.SEMI_MONTHLY:
                    setDate((prev) => ({
                      ...prev,
                      from: new Date(addDays(new Date(), -14)),
                      to: new Date(),
                    }));
                    break;
                  case DateFilter.MONTHLY:
                    setDate((prev) => ({
                      ...prev,
                      from: new Date(addDays(new Date(), -29)),
                      to: new Date(),
                    }));
                    break;
                }
              }}
              options={Object.values(DateFilter)}
            />
          </div>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
