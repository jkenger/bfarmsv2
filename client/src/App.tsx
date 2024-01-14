import "./App.css";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Error from "./components/pages/Error";
import Login from "./components/pages/root/Login";

import { ThemeProvider } from "./components/context/theme-provider";
import Admin from "./components/layouts/Admin";
import Navigation from "./components/wrappers/nav/Navigation";
import AdminEmployees from "./components/pages/admin/employees/Employees";
import AdminHolidays from "./components/pages/admin/holidays/Holidays";
import AdminTravelPass from "./components/pages/admin/travelpass/Travelpass";
import AdminDeductions from "./components/pages/admin/deductions/Deductions";
import AdminLeaves from "./components/pages/admin/leaves/Leaves";
import AdminLeaveTypes from "./components/pages/admin/leaves/types/Types";
import AdminDashboard from "./components/pages/admin/dashboard/Dashboard";
import { loader as employeesLoader } from "./components/pages/admin/employees/Employees";
import { loader as designationsLoader } from "./components/pages/admin/employees/Designations";
import { loader as holidaysLoader } from "./components/pages/admin/holidays/Holidays";
import { loader as travelpassLoader } from "./components/pages/admin/travelpass/Travelpass";
import AdminDailyTyimeRecord, {
  loader as dtrLoader,
} from "./components/pages/admin/daily-time-records/DailyTimeRecord";
import PayrollGroups, {
  loader as payrollGroupLoader,
} from "./components/pages/admin/payroll/PayrollGroups";

import { loader as deductionsLoader } from "./components/pages/admin/deductions/Deductions";
import { loader as leaveTypesLoader } from "./components/pages/admin/leaves/types/Types";
import AdminPayroll, {
  loader as payrollLoader,
} from "./components/pages/admin/payroll/Payroll";

import Designations from "./components/pages/admin/employees/Designations";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
import { QueryKeys, Roles } from "./types/common";

import QueryProvider from "./components/context/query-provider";
import {
  createEmployee,
  deleteEmployee,
  editEmployee,
} from "./components/pages/admin/employees/api/employee.api";
import {
  createDesignation,
  deleteDesignation,
  editDesignation,
} from "./components/pages/admin/employees/api/designation.api";
import {
  createDeduction,
  deleteDeduction,
  editDeduction,
} from "./components/pages/admin/deductions/api/deductions.api";
import {
  createTravelpass,
  deleteTravelpass,
  editTravelpass,
} from "./components/pages/admin/travelpass/api/travelpass.api";
import {
  createHoliday,
  deleteHoliday,
  editHoliday,
} from "./components/pages/admin/holidays/api/holidays.api";
import {
  createPayrollGroup,
  deletePayrollGroup,
  editPayrollGroup,
} from "./components/pages/admin/payroll/api/payrollGroups.api";
import {
  createLeaveType,
  deleteLeaveType,
  editLeaveType,
} from "./components/pages/admin/leaves/types/api/types.api";
import {
  createDTR,
  deleteDTR,
  editDTR,
} from "./components/pages/admin/daily-time-records/api/daily-time-records.api";
import Attendance from "./components/pages/root/attendance/Attendance";
import {
  createPayroll,
  deletePayroll,
  editPayroll,
} from "./components/pages/admin/payroll/api/payroll.api";
import Receipt from "./components/pages/admin/payroll/Receipt";
import { loader as payrollReceiptLoader } from "./components/pages/admin/payroll/Receipt";
import TimeCards, {
  loader as timeCardLoader,
} from "./components/pages/admin/daily-time-records/TimeCards";
import {
  createTimeCard,
  deleteTimeCard,
  editTimeCard,
} from "./components/pages/admin/daily-time-records/api/time-cards.api";
import Sheets from "./components/pages/admin/daily-time-records/Sheets";
import { loader as CardLoader } from "./components/pages/admin/daily-time-records/Sheets";
import { loader as dashboardLoader } from "./components/pages/admin/dashboard/Dashboard";

const isLoggedIn = true;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Attendance />,
    errorElement: <Error />,
  },
  {
    path: "attendance",
    element: <Attendance />,
    errorElement: <Error />,
  },
  {
    path: "login",
    element: <Login assign={Roles.EMPLOYEE} />,
    errorElement: <Error />,
  },

  {
    path: "admin",
    element: isLoggedIn ? <Admin /> : <Login assign={Roles.ADMIN} />,
    errorElement: <Error />,
    children: [
      {
        element: <Navigation />,
        children: [
          {
            index: true,
            path: "dashboard",
            loader: dashboardLoader(queryClient),
            element: <AdminDashboard />,
          },
          {
            path: "employees",
            children: [
              {
                index: true,
                loader: employeesLoader(queryClient),
                element: (
                  <QueryProvider
                    api={{
                      create: createEmployee({ queryClient }),
                      edit: editEmployee({ queryClient }),
                      delete: deleteEmployee({ queryClient }),
                    }}
                    queryKeys={{
                      create: QueryKeys.CREATE_EMPLOYEE,
                      edit: QueryKeys.EDIT_EMPLOYEE,
                      delete: QueryKeys.DELETE_EMPLOYEE,
                    }}
                  >
                    <AdminEmployees />
                  </QueryProvider>
                ),
              },
              {
                path: "designations",
                loader: designationsLoader(queryClient),
                element: (
                  <QueryProvider
                    api={{
                      create: createDesignation({ queryClient }),
                      edit: editDesignation({ queryClient }),
                      delete: deleteDesignation({ queryClient }),
                    }}
                    queryKeys={{
                      create: QueryKeys.CREATE_DESIGNATION,
                      edit: QueryKeys.EDIT_DESIGNATION,
                      delete: QueryKeys.DELETE_DESIGNATION,
                    }}
                  >
                    <Designations />
                  </QueryProvider>
                ),
              },
            ],
          },
          {
            path: "daily-time-records",
            children: [
              {
                index: true,
                loader: dtrLoader(queryClient),
                element: (
                  <QueryProvider
                    api={{
                      create: createDTR({ queryClient }),
                      edit: editDTR({ queryClient }),
                      delete: deleteDTR({ queryClient }),
                    }}
                    queryKeys={{
                      create: QueryKeys.CREATE_ATTENDANCE,
                      edit: QueryKeys.EDIT_ATTENDANCE,
                      delete: QueryKeys.DELETE_ATTENDANCE,
                    }}
                  >
                    <AdminDailyTyimeRecord />
                  </QueryProvider>
                ),
              },
              {
                path: "time-cards",
                loader: timeCardLoader(queryClient),
                element: (
                  <QueryProvider
                    api={{
                      create: createTimeCard({ queryClient }),
                      edit: editTimeCard({ queryClient }),
                      delete: deleteTimeCard({ queryClient }),
                    }}
                    queryKeys={{
                      create: QueryKeys.CREATE_TIME_CARD,
                      edit: QueryKeys.EDIT_TIME_CARD,
                      delete: QueryKeys.DELETE_TIME_CARD,
                    }}
                  >
                    <TimeCards />
                  </QueryProvider>
                ),
              },
              {
                path: "time-cards/:id",
                loader: CardLoader(queryClient),
                element: <Sheets />,
              },
            ],
          },
          {
            path: "payroll",
            children: [
              {
                path: "",
                loader: payrollLoader(queryClient),
                element: (
                  <QueryProvider
                    api={{
                      create: createPayroll({ queryClient }),
                      edit: editPayroll({ queryClient }),
                      delete: deletePayroll({ queryClient }),
                    }}
                    queryKeys={{
                      create: QueryKeys.CREATE_PAYROLL,
                      edit: QueryKeys.EDIT_PAYROLL,
                      delete: QueryKeys.DELETE_PAYROLL,
                    }}
                  >
                    <AdminPayroll />
                  </QueryProvider>
                ),
              },
              {
                path: ":id/receipt",
                loader: payrollReceiptLoader(queryClient),
                element: <Receipt />,
              },
              {
                path: "groups",
                loader: payrollGroupLoader(queryClient),
                element: (
                  <QueryProvider
                    api={{
                      create: createPayrollGroup({ queryClient }),
                      edit: editPayrollGroup({ queryClient }),
                      delete: deletePayrollGroup({ queryClient }),
                    }}
                    queryKeys={{
                      create: QueryKeys.CREATE_PAYROLL_GROUP,
                      edit: QueryKeys.EDIT_PAYROLL_GROUP,
                      delete: QueryKeys.DELETE_PAYROLL_GROUP,
                    }}
                  >
                    <PayrollGroups />
                  </QueryProvider>
                ),
              },
            ],
          },
          {
            path: "holidays",
            loader: holidaysLoader(queryClient),
            element: (
              <QueryProvider
                api={{
                  create: createHoliday({ queryClient }),
                  edit: editHoliday({ queryClient }),
                  delete: deleteHoliday({ queryClient }),
                }}
                queryKeys={{
                  create: QueryKeys.CREATE_HOLIDAY,
                  edit: QueryKeys.EDIT_HOLIDAY,
                  delete: QueryKeys.DELETE_HOLIDAY,
                }}
              >
                <AdminHolidays />
              </QueryProvider>
            ),
          },
          {
            path: "travelpass",
            loader: travelpassLoader(queryClient),
            element: (
              <QueryProvider
                api={{
                  create: createTravelpass({ queryClient }),
                  edit: editTravelpass({ queryClient }),
                  delete: deleteTravelpass({ queryClient }),
                }}
                queryKeys={{
                  create: QueryKeys.CREATE_TRAVELPASS,
                  edit: QueryKeys.EDIT_TRAVELPASS,
                  delete: QueryKeys.DELETE_TRAVELPASS,
                }}
              >
                <AdminTravelPass />
              </QueryProvider>
            ),
          },
          {
            path: "deductions",
            loader: deductionsLoader(queryClient),
            element: (
              <QueryProvider
                api={{
                  create: createDeduction({ queryClient }),
                  edit: editDeduction({ queryClient }),
                  delete: deleteDeduction({ queryClient }),
                }}
                queryKeys={{
                  create: QueryKeys.CREATE_DEDUCTION,
                  edit: QueryKeys.EDIT_DEDUCTION,
                  delete: QueryKeys.DELETE_DEDUCTION,
                }}
              >
                <AdminDeductions />
              </QueryProvider>
            ),
          },
          {
            path: "leaves",
            children: [
              {
                index: true,
                element: <AdminLeaves />,
              },
              {
                path: "types",
                loader: leaveTypesLoader(queryClient),
                element: (
                  <QueryProvider
                    api={{
                      create: createLeaveType({ queryClient }),
                      edit: editLeaveType({ queryClient }),
                      delete: deleteLeaveType({ queryClient }),
                    }}
                    queryKeys={{
                      create: QueryKeys.CREATE_LEAVE_TYPE,
                      edit: QueryKeys.EDIT_LEAVE_TYPE,
                      delete: QueryKeys.DELETE_LEAVE_TYPE,
                    }}
                  >
                    <AdminLeaveTypes />
                  </QueryProvider>
                ),
              },
            ],
          },
          {
            path: "",
            element: <Navigate to="/admin/dashboard" />,
          },
          {
            path: "*",
            element: <Navigate to="/admin/dashboard" />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <RouterProvider router={router} />
        <Toaster duration={5000} richColors position="bottom-left" />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
