import { Outlet } from "react-router-dom";
import { useTheme } from "../context/theme-provider";

function Admin() {
  const { theme } = useTheme();
  return (
    <section className={`${theme === "light" ? "bg-muted" : ""}`}>
      <Outlet />
    </section>
  );
}

export default Admin;
