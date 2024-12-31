import { Button } from "@/components/ui/button";
import useSignout from "@/hooks/useSignout";
import UserProvider from "@/contexts/UserProvider";
import { useNavigation } from "react-router-dom";
import Header from "@/components/header/Header";

export default function AppLayout() {
  const {
    isPending: isSigningOut,
    error: SignoutError,
    mutate: signout,
  } = useSignout();
  const { state } = useNavigation();
  if (state === "loading") return <p>Loading</p>;
  return (
    <div>
      <UserProvider>
        <Header />
        You have signed in successfully!{" "}
        <Button className="bg-red-500 text-slate-400" onClick={() => signout()}>
          Logout
        </Button>
      </UserProvider>
    </div>
  );
}
