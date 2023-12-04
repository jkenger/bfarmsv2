type TEmployees = {
  id: string;
  employeeId: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  age: number | string;
  avatar?: string;
  payrollGroupId?: string;
  designationId?: string;
  createdAt: string;
};

type TAdminForms = TEmployeeForms & TDesignationForms;

type TEmployeeForms = {
  id: string;
  employeeId: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  age: string | number;
};

type TDesignationForms = {
  id: string;
  name: string;
  description: string;
  users: string[];
  salary: number;
};

type TDesignation = {
  id: string;
  designation: string;
};

type TTableValues = {
  id: string;
};

type TDataFields = TEmployees & TDesignation;
