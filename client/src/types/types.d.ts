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
  salary: number | string;
};

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
  designation?: TDesignation;
  createdAt: string;
};

type TDesignation = {
  id: string;
  name: string;
  description: string;
  salary: number | string;
  users: TEmployees[];
};

type TTableValues = {
  id: string;
};

type TDataFields = TEmployees & TDesignation;
