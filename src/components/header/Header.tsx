import { useUser } from "@/contexts/UserProvider";
import Logo from "./Logo";
import HeaderList from "./HeaderList";
import { Button } from "../ui/button";
import { user } from "@/types/user";

export default function Header({ user }: { user: user }) {
  return (
    <header className="w-auto sticky top-0 right-0 left-0 h-16 bg-silver flex flex-row items-center justify-between p-5 rounded-br-md rounded-bl-md shadow-lg">
      <Logo />
      <HeaderList avatarSrc="/" avatarFallback="B">
        <HeaderList.Item to="/app">Characters</HeaderList.Item>
        <HeaderList.Item to="/app/settings">Settings</HeaderList.Item>
        <HeaderList.Item to="/app/about">About Us</HeaderList.Item>
        <HeaderList.AvatarIcon>
          <div>
            <p>{user.username}</p>
            <Button>Logout</Button>
          </div>
        </HeaderList.AvatarIcon>
      </HeaderList>
    </header>
  );
}
