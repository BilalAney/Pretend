/** @format */

import LoginForm from "@/components/forms/LoginForm";
import useIsSignedin from "@/hooks/useIsSignedin";
import { Navigate } from "react-router-dom";

export default function LoginPage() {
  const { isSigned, error, isPending } = useIsSignedin();

  if (isSigned) return <Navigate to="/App" />;
  return (
    <main>
      <section className="flex flex-col justify-center items-center fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-silver rounded-md shadow-xl p-6">
        <h1>LOGIN</h1>
        <LoginForm isPending={isPending} />
      </section>
      <footer></footer>
    </main>
  );
}
