import { Outlet } from "react-router-dom";

function Admin() {
  return (
    <section className="bg-background">
      <Outlet />
    </section>
  );
}

export default Admin;
