import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./components/pages/Error";
import Attendance from "./components/pages/Attendance";
import Login from "./components/pages/Login";
import { Roles } from "./types";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Attendance />,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Login assign={Roles.EMPLOYEE} />,
    errorElement: <Error />,
  },
  {
    path: "/admin/login",
    element: <Login assign={Roles.ADMIN} />,
    errorElement: <Error />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
