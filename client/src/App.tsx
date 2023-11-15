import "./App.css";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Error from "./components/pages/Error";
import Attendance from "./components/pages/root/Attendance";
import Login from "./components/pages/root/Login";
import { Roles } from "./types";
import { ThemeProvider } from "./components/context/theme-provider";
import Admin from "./components/layouts/Admin";
import Navigation from "./components/wrappers/SideNav/Navigation";
import AdminDTR from "./components/pages/admin/DailyTimeRecord";
import AdminEmployees from "./components/pages/admin/Employees";
import AdminPayroll from "./components/pages/admin/Payroll";
import AdminHolidays from "./components/pages/admin/Holidays";
import AdminTravelPass from "./components/pages/admin/TravelPass";
import AdminDeductions from "./components/pages/admin/Deductions";
import AdminLeaves from "./components/pages/admin/Leaves";
import AdminDashboard from "./components/pages/admin/Dashboard";
import { loader as employeesLoader } from "./components/pages/admin/Employees";

const isLoggedIn = true;

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
            element: <AdminEmployees />,
            loader: employeesLoader,
          },
          {
            path: "daily-time-records",
            element: <AdminDTR />,
          },
          {
            path: "payroll",
            element: <AdminPayroll />,
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
            element: <AdminLeaves />,
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
      <div className="relative">
        {/* <ModeToggle /> */}
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
}

export default App;
