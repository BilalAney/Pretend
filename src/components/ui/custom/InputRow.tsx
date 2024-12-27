import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, type ReactNode } from "react";

export default function InputRow({
  children,
  ...props
}: { children: ReactNode } & ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row self-center justify-center space-y-2 md:space-y-0 md:space-x-3",
        props.className
      )}
    >
      {children}
    </div>
  );
}
