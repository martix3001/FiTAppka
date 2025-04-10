import { NavLink, Outlet } from "react-router";

export default function MealPlan() {
  return (
    <div>
      <h1>Meal Plan Page</h1>
      <NavLink to="add" className="text-blue-500">
        Add Meal Plan
      </NavLink>
      <Outlet />
    </div>
  );
}
