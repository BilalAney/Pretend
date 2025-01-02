import UserProvider from "@/contexts/UserProvider";
import type { ReactNode } from "react";
import AppLayout from "./AppLayout";

export default function AppLayoutContextWrapper() {
  return (
    <UserProvider>
      <AppLayout />
    </UserProvider>
  );
}
