import useLoadUser from "@/hooks/useLoadUser";
import { User } from "@supabase/supabase-js";
import { useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, type ReactNode } from "react";

interface UserContext {
  user: object;
  isPending: boolean;
  error: Error | null;
}

const UserContext = createContext<UserContext | null>(null);

export default function UserProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]) as User;

  const { isPending, error, data } = useLoadUser(user.id);

  return (
    <UserContext.Provider value={{ user: data, error, isPending }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const value = useContext(UserContext);

  if (!value?.user)
    throw new Error(
      "The useUser hook must be called within the UserProvider context."
    );
  return value.user;
}
