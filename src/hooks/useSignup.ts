import { signup } from "@/services/AuthService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface mutationFnArguments {
  email: string;
  password: string;
  username: string;
  dob: Date;
}

export default function useSignup() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending, error, mutate, data } = useMutation({
    mutationFn: async ({
      email,
      password,
      username,
      dob,
    }: mutationFnArguments) =>
      toast.promise(signup(email, password, username, dob), {
        loading: "Creating the account",
        error: "Failed to create the account",
        success: "Account created successfully!",
      }),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      navigate("/app", { replace: true });
    },
  });

  return { isPending, error, mutate, data };
}
