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
