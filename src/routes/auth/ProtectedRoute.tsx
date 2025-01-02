/** @format */

import { getUser } from "@/services/DataService";
import { user } from "@/types/user";
import {
  Navigate,
  Outlet,
  redirect,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import supabase from "../../../supabase";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "@supabase/supabase-js";
import { queryClient } from "../../../queryClient";
import { signout } from "@/services/AuthService";
import { polling, pollTheUser } from "@/lib/utils";

export default function ProtectedRoute() {
  const { state } = useNavigation();
  const queryClient = useQueryClient();
  const data = useLoaderData();

  console.log("The protected route is HERE!! [🟢🟢]" + data);

  if (data) {
    queryClient.setQueryData(["user", data.user.UID], data);
    if (!queryClient.getQueryData(["user"]))
      queryClient.setQueryData(["user"], data.data);
  }

  if (state === "loading") return <p>Loading</p>;
  return <>{data ? <Outlet /> : <Navigate to="/" />}</>;
}

export async function loader(): Promise<{ user: user; data: User } | null> {
  try {
    const { data, error } = await pollTheUser(6, 800);
    // const data = queryClient.getQueryData(["user"]) as User;
    console.dir(data);
    console.dir(error);
    if (!data.session?.user || error)
      throw new Error("The app failed to log in the user \n" + error);
    // console.log(data);
    // if (!data) throw new Error("The app failed to log in the user");

    const user = await getUser(data.session.user.id);

    if (!user)
      throw new Error(
        "The app logged in, but failed to retrieve the user data"
      );

    console.log("=> => => Protected Route Loader is HERE!" + user);

    return { user, data: data.session.user };
  } catch (e) {
    queryClient.cancelQueries({ queryKey: ["user"] });
    signout();
    console.log(e);
    console.log(
      "You are inside the catch block of the protected route's loader"
    );
    redirect("/");
    return null;
  }
}
