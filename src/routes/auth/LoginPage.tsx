/** @format */

import LoginForm from "@/components/forms/LoginForm";

export default function LoginPage() {
  return (
    <main>
      <section className="flex flex-col justify-center items-center fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-silver rounded-md shadow-xl p-6">
        <h1>LOGIN</h1>
        <LoginForm />
      </section>
      <footer></footer>
    </main>
  );
}
