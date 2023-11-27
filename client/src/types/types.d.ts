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

type TEmployeeInputs = {
  id: string;
  employeeId: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  age: string | number;
};

type TDesignation = {
  id: string;
  designation: string;
};

type TTableActions = TEmployees & TDesignation;
