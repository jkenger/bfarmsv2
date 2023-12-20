export enum Links {
  ROOT = "/",
  LOGIN = "/login",
  ADMIN_LOGIN = "/admin/login",

  DASHBOARD = "/admin/dashboard",

  EMPLOYEES = "/admin/employees",
  DESIGNATIONS = "/admin/employees/designations",

  DAILY_TIME_RECORDS = "/admin/daily-time-records",

  PAYROLL = "/admin/payroll",
  PAYROLL_GROUPS = "/admin/payroll/groups",

  HOLIDAYS = "/admin/holidays",
  TRAVELPASS = "/admin/travelpass",
  DEDUCTIONS = "/admin/deductions",

  LEAVES = "/admin/leaves",
  LEAVE_TYPES = "/admin/leaves/types",

  SETTINGS = "/admin/settings",
}

export enum Roles {
  ADMIN = "admin",
  EMPLOYEE = "employee",
}

export enum IconProperties {
  SIZE = 16,
  SIZE_ICON = 14,
  STROKE_WIDTH = 2,
}

export enum QueryKeys {
  EMPLOYEES = "employees",
  CREATE_EMPLOYEE = "createEmployee",
  DELETE_EMPLOYEE = "deleteEmployee",
  EDIT_EMPLOYEE = "editEmployee",

  DESIGNATIONS = "designations",
  DELETE_DESIGNATION = "deleteDesignation",
  CREATE_DESIGNATION = "createDesignation",
  EDIT_DESIGNATION = "editDesignation",

  PAYROLLS = "payrolls",
  DELETE_PAYROLL = "deletePayroll",
  CREATE_PAYROLL = "createPayroll",
  EDIT_PAYROLL = "editPayroll",

  PAYROLL_GROUPS = "payrollGroups",
  DELETE_PAYROLL_GROUP = "deletePayrollGroup",
  CREATE_PAYROLL_GROUP = "createPayrollGroup",
  EDIT_PAYROLL_GROUP = "editPayrollGroup",

  HOLIDAYS = "holidays",
  DELETE_HOLIDAY = "deleteHoliday",
  CREATE_HOLIDAY = "createHoliday",
  EDIT_HOLIDAY = "editHoliday",

  TRAVELPASS = "travelpass",
  DELETE_TRAVELPASS = "deleteTravelpass",
  CREATE_TRAVELPASS = "createTravelpass",
  EDIT_TRAVELPASS = "editTravelpass",

  DEDUCTIONS = "deductions",
  DELETE_DEDUCTION = "deleteDeduction",
  CREATE_DEDUCTION = "createDeduction",
  EDIT_DEDUCTION = "editDeduction",

  LEAVE_TYPES = "leaveTypes",
  DELETE_LEAVE_TYPE = "deleteLeaveType",
  CREATE_LEAVE_TYPE = "createLeaveType",
  EDIT_LEAVE_TYPE = "editLeaveType",

  CREATE_ATTENDANCE = "createAttendance",
}

export enum SortType {
  ASC = "asc",
  DESC = "desc",
}

export enum Tables {
  EMPLOYEES = "employees",
  DESIGNATIONS = "designations",
  DAILY_TIME_RECORDS = "dailyTimeRecords",
  PAYROLL_GROUPS = "payrollGroups",
  HOLIDAYS = "holidays",
  TRAVELPASS = "travelpass",
  DEDUCTIONS = "deductions",
  LEAVE_TYPES = "leaveTypes",
  LEAVES = "leaves",
}

export enum MutationType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  DELETE_MANY = "deleteMany",
  UPDATE_MANY = "updateMany",
}

export enum GetQueryType {
  PAGINATED = "paginated",
  ALL = "all",
}

export enum TravelpassType {
  OFFICIAL_BUSINESS = "officialBusiness",
  TRAVEL_ORDER = "travelOrder",
}
