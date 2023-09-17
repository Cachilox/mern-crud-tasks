import { forwardRef, Ref } from "react";
import { ChangeHandler, RefCallBack } from "react-hook-form";

interface InputProps {
  type?: string;
  id?: string
  placeholder: string;
  onChange: ChangeHandler;
  onBlur: ChangeHandler;
  ref: RefCallBack;
  name: string;
  autoFocus?: true
}

const Input = forwardRef((props: InputProps, ref: Ref<HTMLInputElement>) => (
  <input
    {...props}
    ref={ref}
    className="w-full bg-zinc-700 text-white px-4 my-2 py-2 rounded-md"
  />
));

export default Input;
