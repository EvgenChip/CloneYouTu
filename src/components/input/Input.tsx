import classNames from "classnames";
import { UseFormRegister, FieldError } from "react-hook-form";

interface Props {
  name: string;
  icon?: string;
  label: string;
  type: string;
  error?: FieldError | undefined;
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>;
}

export const InputField = ({
  name,
  label,
  icon,
  type,
  error,
  register,
}: Props) => {
  return (
    <div className="w-full relative">
      <label htmlFor={label}>{label}</label>
      <input
        id={label}
        className={classNames("bg-gray w-full h-14 mt-1 rounded-2xl px-12", {
          "border-red border": error,
        })}
        placeholder={label}
        type={type}
        {...(register && { ...register(name) })}
      />
      {error && <p className="text-red">{error.message}</p>}
      {icon && (
        <img
          className="w-6 h-6 absolute left-4 top-11"
          src={icon}
          alt={label}
        />
      )}
    </div>
  );
};
