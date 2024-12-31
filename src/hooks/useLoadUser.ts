import { getUser } from "@/services/DataService";
import { useQuery } from "@tanstack/react-query";

export default function useLoadUser(id: string) {
  const { isPending, error, data } = useQuery({
    queryKey: ["user", id],
    queryFn: async () => await getUser(id),
  });

  return { isPending, error, data };
}
