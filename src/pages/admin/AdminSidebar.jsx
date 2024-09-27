import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";

function AdminSidebar() {
  const params = useParams();
  console.log(params);

  return (
    <div className="admin-sidebar">
      <Link to="/admin-dashboard" className="admin-sidebar-title">
        <i className="bi bi-columns"></i>
        dashboard
      </Link>
      <ul className="admin-dashboard-list">
        <NavLink
          to="/admin-dashboard/users-table"
          className={({ isActive }) => isActive ? 'admin-sidebar-link active' : 'admin-sidebar-link'}
        >
          <i className="bi bi-person"></i>
          users
        </NavLink>
        <NavLink
          className={({ isActive }) => isActive ? 'admin-sidebar-link active' : 'admin-sidebar-link'}
          to="/admin-dashboard/posts-table"
        >
          <i className="bi bi-file-post"></i>
          posts
        </NavLink>
        <NavLink
          className={({ isActive }) => isActive ? 'admin-sidebar-link active' : 'admin-sidebar-link'}
          to="/admin-dashboard/categories-table"
        >
          <i className="bi bi-tag-fill"></i>
          categories
        </NavLink>
        <NavLink
          className={({ isActive }) => isActive ? 'admin-sidebar-link active' : 'admin-sidebar-link'}
          to="/admin-dashboard/comments-table"
        >
          <i className="bi bi-chat-left-text"></i>
          comments
        </NavLink>
      </ul>
    </div>
  );
}

export default AdminSidebar;
