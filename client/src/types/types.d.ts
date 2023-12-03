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

type TAdminForms = TEmployeeForms;

type TEmployeeForms = {
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

type TTableValues = {
  id: string;
};

type TDataFields = TEmployees & TDesignation;
