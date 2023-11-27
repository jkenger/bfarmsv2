type TEmployees = {
  id: string;
  employeeId: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  age: number;
  avatar?: string;
  payrollGroupId?: string;
  designationId?: string;
  createdAt: string;
};

type TDesignation = {
  id: string;
  designation: string;
};

type TEmployeeInputs = {
  id: string;
  employeeId: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  age: string | number;
};

type TTableActions = TEmployees & TDesignation;
