import { useEffect, useState } from "react";
import supabase from "../../supabase";

export default function useIsSignedin() {
  const [isSigned, setIsSigned] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    async function checkUser() {
      setIsPending(true);
      try {
        const { data } = await supabase.auth.getSession();
        setIsSigned(() => (data.session ? true : false));
      } catch (e) {
        if (e instanceof Error) setError(e.name);
      } finally {
        setIsPending(false);
      }
    }
    console.log(" => => => the Effect RAN!");
    checkUser();
  }, []);
  return { isSigned, isPending, error };
}
