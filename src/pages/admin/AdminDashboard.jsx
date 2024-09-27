import "./adminDashboard.css";
import AdminMain from "./AdminMain";
import AdminSidebar from "./AdminSidebar";

function AdminDashboard() {
  return (
    <section className="admin-dashboard">
      <AdminSidebar />
      <AdminMain />
    </section>
  )
}

export default AdminDashboard