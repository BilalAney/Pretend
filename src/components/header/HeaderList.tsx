import {
  createContext,
  ReactElement,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { NavLink } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface HeaderContext {
  avatarSrc: string;
  avatarFallback: string;
}

interface HeaderProps extends HeaderContext {
  children: ReactNode;
}

const HeaderContext = createContext<HeaderContext | null>(null);

export default function HeaderList({
  children,
  avatarSrc,
  avatarFallback,
}: HeaderProps) {
  const contextValue = { avatarSrc, avatarFallback };

  return (
    <HeaderContext.Provider value={contextValue}>
      <ul className="list-none flex flex-row items-center justify-around">
        {children}
      </ul>
    </HeaderContext.Provider>
  );
}

function Item({ children, to }: { children: string; to: string }) {
  const style =
    "rounded-lg px-3 py-2 bg-transparent hover:bg-orange text-blue hover:text-white hover:cursor-pointer transition-all";
  const styleSelected = `${style} !bg-orange !hover:bg-transparent !text-white !hover:text-blue`;

  return (
    <NavLink
      to={to}
      className={({ isActive, isPending }) =>
        isActive ? styleSelected : style
      }
    >
      {children}
    </NavLink>
  );
}

function AvatarIcon({ children }: { children: ReactElement }) {
  const { avatarSrc: src, avatarFallback: fallback } = useContext(
    HeaderContext
  ) as HeaderContext;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="relative">
      <Avatar onClick={() => setIsOpen((pre) => !pre)}>
        <AvatarImage src={src} />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
      {isOpen && <AvatarList>{children}</AvatarList>}
    </div>
  );
}

function AvatarList({ children }: { children: ReactNode }) {
  return (
    <div className="absolute -left-full -bottom-full -translate-x-1/3 translate-y-2/3 w-28 bg-silver shadow-xl h-auto px-4 py-6 border border-orange flex flex-col items-center justify-between rounded-md">
      {children}
    </div>
  );
}

HeaderList.Item = Item;
HeaderList.AvatarIcon = AvatarIcon;
AvatarIcon.AvatarList = AvatarList;
