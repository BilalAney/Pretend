import { forwardRef, Ref, type ComponentPropsWithoutRef } from "react";

interface CustomCheckboxProps extends ComponentPropsWithoutRef<"input"> {
  children: string;
}

function checkbox(
  { children, ...props }: CustomCheckboxProps,
  ref: Ref<HTMLInputElement>
) {
  return (
    <label className="grid grid-cols-[5%,1fr] items-center ">
      <input
        type="checkbox"
        className="form-checkbox h-3 w-3 accent-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        ref={ref}
        {...props}
      />
      <span className="text-xs">{children}</span>
    </label>
  );
}

const CustomCheckBox = forwardRef(checkbox);
export default CustomCheckBox;
