import { Outlet } from "react-router-dom";

function Admin() {
  return (
    <main className="pt-8 bg-muted h-screen">
      <Outlet />
    </main>
  );
}

export default Admin;
