import { createContext, useContext, type ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface HeaderContext {
  avatarSrc: string;
  avatarFallback: string;
}

interface HeaderProps extends HeaderContext {
  children: ReactNode;
  to: string;
}

const HeaderContext = createContext<HeaderContext | null>(null);

export default function HeaderList({ children }: { children: ReactNode }) {
  return (
    <ul className="list-none flex flex-row items-center justify-around">
      {children}
    </ul>
  );
}

function Item({ children, to, avatarSrc, avatarFallback }: HeaderProps) {
  const style =
    "rounded-lg px-3 py-2 bg-transparent hover:bg-orange text-blue hover:text-white hover:cursor-pointer transition-all";
  const styleSelected = `${style} !bg-orange !hover:bg-transparent !text-white !hover:text-blue`;

  const contextValue = { avatarSrc, avatarFallback };

  return (
    <HeaderContext.Provider value={contextValue}>
      <NavLink
        to={to}
        className={({ isActive, isPending }) =>
          isActive ? styleSelected : style
        }
      >
        {children}
      </NavLink>
    </HeaderContext.Provider>
  );
}

function AvatarIcon({ children }: { children: ReactNode }) {
  const { avatarSrc: src, avatarFallback: fallback } = useContext(
    HeaderContext
  ) as HeaderContext;

  return (
    <Avatar className="relative">
      <AvatarImage src={src} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}

function AvatarList({ children }: { children: ReactNode }) {
  return <div className="absolute -bottom-1/3 w-24 h-auto ">{children}</div>;
}

HeaderList.Item = Item;
HeaderList.AvatarIcon = AvatarIcon;
AvatarIcon.AvatarList = AvatarList;
