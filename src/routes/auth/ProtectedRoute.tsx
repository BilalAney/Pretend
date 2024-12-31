/** @format */

import { getUser } from "@/services/DataService";
import { user } from "@/types/user";
import {
  Navigate,
  Outlet,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import supabase from "../../../supabase";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "@supabase/supabase-js";

export default function ProtectedRoute() {
  const { state } = useNavigation();
  const queryClient = useQueryClient();
  const data = useLoaderData();
  if (data) {
    queryClient.setQueryData(["user", data.user.UID], data);
    queryClient.setQueryData(["user"], data.data);
  }

  if (state === "loading") return <p>Loading</p>;
  return <>{data ? <Outlet /> : <Navigate to="/" />}</>;
}

export async function loader(): Promise<{ user: user; data: User } | null> {
  const { data, error } = await supabase.auth.getUser();
  if (!data.user || error) return null;
  const user = await getUser(data.user.id);
  return { user, data: data.user };
}
