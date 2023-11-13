import "./App.css";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Error from "./components/pages/Error";
import Attendance from "./components/pages/Attendance";
import Login from "./components/pages/Login";
import { Roles } from "./types";
import { ThemeProvider } from "./components/context/theme-provider";
import Admin from "./components/layouts/Admin";
import Navigation from "./components/ui/navigation";
import { Button } from "./components/ui/button";

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
            element: (
              <div>
                <Button>Button</Button>
              </div>
            ),
          },
          {
            path: "attendance",
            element: <div>Attendance</div>,
          },
          {
            path: "payroll",
            element: <div>Payroll</div>,
          },
          {
            path: "holidays",
            element: <div>Holidays</div>,
          },
          {
            path: "travelpass",
            element: <div>Travel Pass</div>,
          },
          {
            path: "deductions",
            element: <div>Deductions</div>,
          },
          {
            path: "leaves",
            element: <div>Leaves</div>,
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
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="relative">
        {/* <ModeToggle /> */}
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
}

export default App;
