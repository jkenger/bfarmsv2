type TAdminForms = TEmployeeForms & TDesignationForms;

type TMutation = {
  queryClient: QueryClient;
  form?: UseFormReturn<TDataFields, unknown, undefined>;
};

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
  rfId: string;
  fullName: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  age: number | string;
  avatar?: string;
  payrollGroupId?: string;
  payrollGroup?: TPayrollGroup;
  designationId?: string;
  designation?: TDesignation;
  deductions: TDeductions[];
  travelpass: TTravelpass[];
  createdAt: string;
  updatedAt: string;
};

type TDesignation = {
  id: string;
  name: string;
  description: string;
  salary: number | string;
  users: TEmployees[];
  createdAt: string;
  updatedAt: string;
};

type TPayrollGroup = {
  id: string;
  name: string;
  fundCluster: string;
  programName: string;
  users: TEmployees[];
  createdAt: string;
  updatedAt: string;
};

type THolidays = {
  id: string;
  name: string;
  description: string;
  prerequisiteDate: string;
  requisiteDate: string;
  createdAt: string;
  updatedAt: string;
};

type TTravelpass = {
  id: string;
  user: TEmployees;
  userId: string;
  typeOf: TravelpassType;
  start: string;
  end: string;
};

type TDeductions = {
  id: string;
  users: TEmployees[];
  amount: string;
  createdAt: string;
  updatedAt: string;
};

type TLeaveTypes = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

type TGetQueryOptions = {
  type: GetQueryType;
  customParams?: {
    page: string;
    search: string;
  };
};

type TQueryContext = {
  createMutation: UseMutationResult<void, Error, TDataFields, unknown>;

  editMutation: UseMutationResult<void, Error, TDataFields, unknown>;

  deleteMutation: UseMutationResult<void, Error, TDataFields, unknown>;

  deletedActivities: TDataFields[];
  editedActivities: TDataFields[];
  createdActivities: TDataFields[];
};

type TTableValues = {
  id: string;
};

type TDataFields = TEmployees &
  TDesignation &
  TPayrollGroup &
  THolidays &
  TTravelpass &
  TDeductions &
  TLeaveTypes;
