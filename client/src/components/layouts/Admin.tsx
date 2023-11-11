import { Outlet } from "react-router-dom";
import { useTheme } from "../context/theme-provider";

function Admin() {
  const { theme } = useTheme();
  return (
    <main className={`pt-8 h-screen ${theme === "light" ? "bg-muted" : ""}`}>
      <Outlet />
    </main>
  );
}

export default Admin;
