/** @format */

import { type ReactNode } from "react";

export default function CustomErrorMessage({
  children,
}: {
  children: ReactNode;
}) {
  return <p className="font-medium text-xs text-red-600">{children}</p>;
}
