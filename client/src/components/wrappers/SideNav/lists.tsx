import { useNavigation } from "./Navigation";
import { ArrowDownToDot, Contact, LayoutGrid } from "lucide-react";

import { Links } from "@/types";
import List from "./list";
import ListSection from "./list-section";
import SubLink from "./sub-link";

function Lists() {
  const {
    overViewState,
    handleOverViewState,
    employeeState,
    handleEmployeeState,
  } = useNavigation();
  return (
    <>
      <List>
        <ListSection
          title="Overview"
          isOpen={overViewState}
          handleOnClick={handleOverViewState}
        />
        {overViewState && (
          <SubLink
            to={Links.DASHBOARD}
            icon={<LayoutGrid size={16} strokeWidth={2} />}
            title="Dashboard"
          />
        )}
      </List>
      <List>
        <ListSection
          title="Employees"
          isOpen={employeeState}
          handleOnClick={handleEmployeeState}
        />
        {employeeState && (
          <>
            <SubLink
              to={Links.EMPLOYEES}
              icon={<Contact size={16} />}
              title="Employees"
            />
            <SubLink
              to={Links.DESIGNATIONS}
              icon={<ArrowDownToDot size={16} />}
              title="Designations"
            />
          </>
        )}
      </List>
    </>
  );
}

export default Lists;
