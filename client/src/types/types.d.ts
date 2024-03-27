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
  attendances: TDailyTimeRecord[];
  deductions: TDeductions[];
  travelPass: TTravelpass[];
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

type TReceipt = {
  id: string;
  payroll: TPayroll;
  name: string;
  designation: string;
  salary: number;
  prc?: string;
  noOfDays: number;
  grossAmountEarned: number;
  tax1?: number;
  tax5?: number;
  tax10?: number;
  sss?: number;
  pagibig?: number;
  philhealth?: number;
  netAmountDue: number;
  signatureOfRecipient: string;
  createdAt: string;
  updatedAt: string;
};

type TPayroll = {
  id: string;
  from: string;
  to: string;
  payrollGroup: TPayrollGroup;
  payrollGroupId: string;
  fundCluster: string;
  projectName: string;
  programName: string;
  amount: string;
  createdAt: string;
  updatedAt: string;
};

type TPayrollGroup = {
  id: string;
  name: string;
  fundCluster: string;
  programName: string;
  users: TEmployees[];
  payrolls: TPayroll[];
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
  createdAt: string;
  updatedAt: string;
  expireAt: string;
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

type TDailyTimeRecord = {
  id: string;
  user: TEmployees;
  userId: string;
  fullName: string;
  attendanceDate?: string;
  amTimeIn?: string;
  amTimeOut?: string;
  pmTimeIn?: string;
  pmTimeOut?: string;
  undertime?: string;
  travelPass?: string;
  noOfHoursWorked?: string;
  createdAt: string;
  updatedAt: string;
};

type TTimeCard = {
  id: string;
  from: string;
  to: string;
  name?: string;
  isAllEmployees: boolean;
  sheets: TSheet[];
  createdAt: string;
  updatedAt: string;
};

type TSheet = {
  id: string;
  from: string;
  to: string;
  name: string;
  attendances: TSheetAttendances[];
  timeCard: TTimeCard;
  timeCardId: string;
  createdAt: string;
  updatedAt: string;
};

type TSheetAttendances = {
  id: string;
  attendanceDate: string;
  amTimeIn?: string;
  amTimeOut?: string;
  pmTimeIn?: string;
  pmTimeOut?: string;
  undertime?: int;
  travelPass?: string;
};

type TDashboard = {
  total: number;
  totalEmployees: number;
};

type TStatus = {
  status: string;
};

type TLogin = {
  email: string;
  password: string;
}

type TStep2 = {
  twofaToken: string;
}

type TGetQueryOptions = {
  type: GetQueryType;
  customParams?: {
    page: string;
    search: string;
  };
};

type TQueryContext = {
  createMutation: UseMutationResult<
    AxiosResponse<any, any> | undefined,
    Error,
    TDataFields,
    unknown
  >;

  editMutation: UseMutationResult<void, Error, TDataFields, unknown>;

  deleteMutation: UseMutationResult<void, Error, TDataFields, unknown>;

  deletedActivities: TDataFields[];
  editedActivities: TDataFields[];
  createdActivities: TDataFields[];
};

type TTableValues = {
  id: string;
};

type TOverAllStats = {
  day: string;
  total: number;
};

type TDataFields = TEmployees &
  TDesignation &
  TPayrollGroup &
  THolidays &
  TTravelpass &
  TDeductions &
  TLeaveTypes &
  TDailyTimeRecord &
  TSheet &
  TSheetAttendances &
  TTimeCard &
  TPayroll &
  TReceipt &
  TStatus &
  TLogin &
  TStep2
