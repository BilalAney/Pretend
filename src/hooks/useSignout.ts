import { signout } from "@/services/AuthService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useSignout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isPending, error, mutate } = useMutation({
    mutationFn: () =>
      toast.promise(signout(), {
        error: "Error occured during signing out",
        loading: "Signing out",
        success: "Signed out successfully!",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.removeQueries({ queryKey: ["user"] });
      navigate("/", { replace: true });
    },
  });

  return { isPending, error, mutate };
}
