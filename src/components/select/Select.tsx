import { UseFormRegister } from "react-hook-form";

interface Props<T> {
  name: string;
  label: string;
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>;
  items: T[];
}

export const SelectField = <T extends string>({
  name,
  label,
  items,
  register,
}: Props<T>) => {
  return (
    <div className="w-full cursor-pointer">
      <label htmlFor="">{label}</label>
      <select
        defaultValue=""
        className="bg-gray w-full h-14 mt-1 rounded-2xl px-2 cursor-pointer"
        id={label}
        {...(register && { ...register(name) })}>
        {items.map((item) => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          );
        })}
      </select>
      <div></div>
    </div>
  );
};
