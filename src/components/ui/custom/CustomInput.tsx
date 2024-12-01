/** @format */

import {
  ChangeEvent,
  forwardRef,
  Ref,
  useId,
  useState,
  type ComponentPropsWithoutRef,
  type ReactElement,
  type ReactNode,
} from "react";
import { Input } from "../input";

interface CustomInputProps extends ComponentPropsWithoutRef<"input"> {
  readonly children: string;
  isPassword?: boolean;
  icon?: ReactElement | ReactNode;
}

// NOTE: this component must be controlled to work properly
// NOTE: don't try to use ID here, as this component does not recieve ID
const CustomInput = (
  { children, isPassword = false, ...props }: CustomInputProps,
  ref: Ref<HTMLInputElement>
) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = isPassword && !showPassword ? "password" : props.type;
  const id = useId();
  // Styling Note: Why did I write bottom-7? Because the input field's height is 7 (Tailwind) check the shadcn input in components/ui
  return (
    <div className="relative w-full">
      <label htmlFor={id}>
        <span className="text-xs">{children}</span>
      </label>
      {isPassword && (
        <span
          className="absolute right-0 bottom-7 text-xs cursor-pointer select-none"
          onClick={() => setShowPassword((pre) => !pre)}
          role="button"
        >
          {showPassword ? "Hide" : "Show"}
        </span>
      )}
      <Input type={inputType} id={id} ref={ref} {...props} />
    </div>
  );
};

export default forwardRef(CustomInput);
