import SignupForm from "@/components/forms/SignupForm";

export default function SignupPage() {
  return (
    <div>
      <h1>
        By creating an account, you will be able to track your chats! accross
        devices!
      </h1>
      <section className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-silver p-4 rounded-lg shadow-xl">
        <SignupForm />
      </section>
    </div>
  );
}
