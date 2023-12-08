import "./App.css";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Error from "./components/pages/Error";
import Attendance from "./components/pages/root/Attendance";
import Login from "./components/pages/root/Login";

import { ThemeProvider } from "./components/context/theme-provider";
import Admin from "./components/layouts/Admin";
import Navigation from "./components/wrappers/nav/Navigation";
import AdminDTR from "./components/pages/admin/DailyTimeRecord";
import AdminEmployees from "./components/pages/admin/employees/Employees";
import AdminPayroll from "./components/pages/admin/Payroll";
import AdminHolidays from "./components/pages/admin/Holidays";
import AdminTravelPass from "./components/pages/admin/TravelPass";
import AdminDeductions from "./components/pages/admin/Deductions";
import AdminLeaves from "./components/pages/admin/leaves/Leaves";
import AdminDashboard from "./components/pages/admin/Dashboard";
import { loader as employeesLoader } from "./components/pages/admin/employees/Employees";
import { loader as designationsLoader } from "./components/pages/admin/employees/Designations";
import PayrollGroups, {
  loader as payrollGroupLoader,
} from "./components/pages/admin/payroll/PayrollGroups";
import Designations from "./components/pages/admin/employees/Designations";
import LeaveTypes from "./components/pages/admin/leaves/Types";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
import { Roles } from "./types/common";
import EmployeeQueryProvider from "./components/pages/admin/employees/providers/EmployeeQueryProvider";
import DesignationQueryProvider from "./components/pages/admin/employees/providers/DesignationQueryProvider";
import PayrollGroupQueryProvider from "./components/pages/admin/payroll/providers/PayrollGroupProvider";

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
            element: <AdminDashboard />,
          },
          {
            path: "employees",
            children: [
              {
                index: true,
                loader: employeesLoader(queryClient),
                element: (
                  <EmployeeQueryProvider>
                    <AdminEmployees />
                  </EmployeeQueryProvider>
                ),
              },
              {
                path: "designations",
                loader: designationsLoader(queryClient),
                element: (
                  <DesignationQueryProvider>
                    <Designations />
                  </DesignationQueryProvider>
                ),
              },
            ],
          },
          {
            path: "daily-time-records",
            element: <AdminDTR />,
          },
          {
            path: "payroll",
            children: [
              {
                index: true,
                element: <AdminPayroll />,
              },
              {
                path: "groups",
                loader: payrollGroupLoader(queryClient),
                element: (
                  <PayrollGroupQueryProvider>
                    <PayrollGroups />
                  </PayrollGroupQueryProvider>
                ),
              },
            ],
          },
          {
            path: "holidays",
            element: <AdminHolidays />,
          },
          {
            path: "travelpass",
            element: <AdminTravelPass />,
          },
          {
            path: "deductions",
            element: <AdminDeductions />,
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
                element: <LeaveTypes />,
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
