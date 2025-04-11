import { NavLink, Outlet } from "react-router";

export default function Exercise() {
  return (
    <div>
      <h1>Exercise Page</h1>
      <nav>
        <NavLink to="add" className="text-blue-500">
          Add Exercise
        </NavLink>
        <NavLink to="edit" className="text-blue-500 ml-4">
          Edit Exercise
        </NavLink>
      </nav>
      {/* Render nested routes here */}
      <Outlet />
    </div>
  );
}
