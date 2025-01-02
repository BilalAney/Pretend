import useLoadUser from "@/hooks/useLoadUser";
import { user } from "@/types/user";
import { Session, User } from "@supabase/supabase-js";
import { useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, type ReactNode } from "react";

interface UserContext {
  user: user;
  isPending: boolean;
  error: Error | null;
}

const UserContext = createContext<UserContext | null>(null);

export default function UserProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]) as User;
  console.log("[🟢🔴🟢🔴🟢🔴🟢🔴]");
  console.dir(user);

  const { isPending, error, data } = useLoadUser(user.id);

  return (
    <UserContext.Provider value={{ user: data, error, isPending }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserContext {
  const value = useContext(UserContext);

  if (!value?.user)
    throw new Error(
      "The useUser hook must be called within the UserProvider context."
    );
  return value as UserContext;
}
