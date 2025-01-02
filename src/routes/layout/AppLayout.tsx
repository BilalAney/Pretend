import { Button } from "@/components/ui/button";
import useSignout from "@/hooks/useSignout";
import UserProvider, { useUser } from "@/contexts/UserProvider";
import { useNavigation } from "react-router-dom";
import Header from "@/components/header/Header";
import { user } from "@/types/user";

export default function AppLayout() {
  const {
    isPending: isSigningOut,
    error: SignoutError,
    mutate: signout,
  } = useSignout();
  const { state } = useNavigation();
  const { error, isPending, user } = useUser();
  if (state === "loading" || isPending) return <p>Loading</p>;
  return (
    <div>
      <UserProvider>
        <Header user={user as user} />
        You have signed in successfully!{" "}
        <Button className="bg-red-500 text-slate-400" onClick={() => signout()}>
          Logout
        </Button>
      </UserProvider>
    </div>
  );
}
