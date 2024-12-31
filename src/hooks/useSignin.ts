import { signin } from "@/services/AuthService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { data, useNavigate } from "react-router-dom";

export default function useSignin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isPending, error, mutate } = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) =>
      toast.promise(signin(email, password), {
        error: "Failed to login",
        loading: "Logging in",
        success: "Logged in successfully",
      }),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      navigate("/app", { replace: true });
    },
  });

  return { isPending, mutate, error };
}
