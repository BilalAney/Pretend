/** @format */

import { user } from "@/types/user";
import { Navigate, Outlet, useLoaderData } from "react-router-dom";

export default function ProtectedRoute() {
  const data = useLoaderData();
  return <div>{data ? <Outlet /> : <Navigate to="/login" />}</div>; //TODO: fix it to be a real
}

export function loader({ params }): user {
  return {
    firstName: "Bilal",
    lastName: "Jamal",
    isAuth: true,
    userId: "1AS",
  };
}