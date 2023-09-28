import classnames from "classnames";

interface Props {
  children: string;
  className?: "w-full" | "wish";
  disabled?: boolean;
  icon?: string;
  onClick?: () => void;
}

export const Button = ({
  children,
  className,
  disabled,
  icon,
  onClick,
}: Props) => {
  return (
    <button
      onClick={onClick}
      className={classnames(
        "px-5  bg-orange rounded-xl text-white h-14 hover:opacity-70 flex justify-center items-center",
        {
          "w-full": className === "w-full",
          "!bg-gray !text-black-opacity font-bold rounded-3xl":
            className === "wish",
          "disabled:bg-black disabled:cursor-default disabled:hover:opacity-100":
            disabled,
        }
      )}
      disabled={disabled}>
      {icon && <img src={icon} className="w-6 h-6" alt="button" />}
      {children}
    </button>
  );
};
