import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format, startOfMonth } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { useEffect } from "react";
import DropdownSelect from "./dropdown-select";
import useFilterParams, { getSearchParams } from "../hooks/useFilterParams";

enum DateFilter {
  ALL_TIME = "All Records",
  FIRST_HALF = "1st - 15th",
  SECOND_HALF = "16th - 30th",
  TODAY = "Past 24 hours",
  SEMI_MONTHLY = "Past 15 days",
  MONTHLY = "Past 30 days",
  CUSTOM = "Custom Date",
}

export function CalendarDateRangePicker({
  className,
  queryOnChange = true,
}: React.HTMLAttributes<HTMLDivElement> & {
  queryOnChange?: boolean;
}) {
  const { fromDate, toDate } = getSearchParams();
  const [range, setRange] = React.useState<DateFilter>(DateFilter.FIRST_HALF);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: fromDate ? new Date(fromDate) : new Date("01/01/2021"),
    to: toDate ? new Date(toDate) : new Date(),
  });

  const { handleFromDateChange, handleToDateChange } = useFilterParams();

  useEffect(() => {
    if (queryOnChange) {
      setDate({
        from: fromDate ? new Date(fromDate) : new Date("01/01/2021"),
        to: toDate ? new Date(toDate) : new Date(),
      });
      if (!fromDate && !toDate) {
        setRange(DateFilter.ALL_TIME);
      }
    }
  }, [fromDate, toDate]);

  useEffect(() => {
    if (date?.from && date?.to && range === DateFilter.CUSTOM) {
      handleFromDateChange(date.from.toDateString());
      handleToDateChange(date.to.toDateString());
    }
  }, [date]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            size="sm"
            className={cn(
              " justify-start text-left font-normal text-xs",
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
        <PopoverContent className="w-auto p-0" align="end">
          <div className="p-4">
            <DropdownSelect
              name="range"
              labelText="Select range"
              defaultValue={range}
              onValueChange={(value) => {
                setRange(value as DateFilter);
                switch (value) {
                  case DateFilter.FIRST_HALF:
                    handleFromDateChange(
                      startOfMonth(new Date()).toDateString()
                    );
                    handleToDateChange(
                      addDays(startOfMonth(new Date()), 14).toDateString()
                    );
                    break;

                  case DateFilter.SECOND_HALF:
                    handleFromDateChange(
                      addDays(startOfMonth(new Date()), 15).toDateString()
                    );
                    handleToDateChange(
                      addDays(startOfMonth(new Date()), 29).toDateString()
                    );
                    break;

                  case DateFilter.ALL_TIME:
                    handleFromDateChange(new Date("01/01/2021").toDateString());
                    handleToDateChange(new Date().toDateString());
                    break;
                  case DateFilter.TODAY:
                    handleFromDateChange(new Date().toDateString());
                    handleToDateChange(new Date().toDateString());
                    break;
                  case DateFilter.SEMI_MONTHLY:
                    handleFromDateChange(
                      addDays(new Date(), -14).toDateString()
                    );
                    handleToDateChange(new Date().toDateString());
                    break;
                  case DateFilter.MONTHLY:
                    handleFromDateChange(
                      addDays(new Date(), -29).toDateString()
                    );
                    handleToDateChange(new Date().toDateString());
                    break;
                }
              }}
              options={Object.values(DateFilter)}
            />
          </div>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.to}
            selected={date}
            onSelect={setDate}
            onDayClick={() => {
              setRange(DateFilter.CUSTOM);
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
