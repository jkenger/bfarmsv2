import { CalendarDateRangePicker } from "@/components/ui/date-range-picker";
import { Input } from "@/components/ui/input";
import Main from "@/components/wrappers/Main";

function DailyTimeRecord() {
  return (
    <Main>
      <Main.Header>
        <Main.Heading title="Daily Time Records">
          <Input
            id="search"
            placeholder="Search"
            className="w-full md:w-auto justify-start text-left font-normal"
          />
          <CalendarDateRangePicker />
        </Main.Heading>
      </Main.Header>
    </Main>
  );
}

export default DailyTimeRecord;
