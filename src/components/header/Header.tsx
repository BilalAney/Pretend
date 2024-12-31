import { useUser } from "@/contexts/UserProvider";

export default function Header() {
  const user = useUser();
  return <div>The header is here. The user is</div>;
}
