import classNames from "classnames";
import PropTypes from "prop-types";
import { ReactNode } from "react";

type Props = {
  name?: string;
  bgColor?: string | undefined;
  withBorder: boolean;
  children?: ReactNode;
  absoluteParms?: string;
  widthParms?: string;
  type: "button" | "submit";
  invertColor?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const ButtonRemove = ({
  name,
  bgColor,
  withBorder,
  children,
  absoluteParms,
  type,
  widthParms,
  invertColor,
  onClick,
}: Props) => {
  const buttonClassNames = classNames(
    "text-zinc-100 font-bold py-1.5 px-2 hover:text-zinc-300 hover:brightness-105",
    bgColor,
    absoluteParms,
    widthParms,
    {
      "border border-zinc-200 hover:border-zinc-300": withBorder,
      invert: invertColor,
    }
  );

  return (
    <button onClick={onClick} type={type} className={buttonClassNames}>
      {children || name}
    </button>
  );
};
ButtonRemove.propTypes = {
  name: PropTypes.string,
  bgColor: PropTypes.string,
  withBorder: PropTypes.bool.isRequired,
  children: PropTypes.node,
  absoluteParms: PropTypes.string,
  widthParms: PropTypes.string,
  type: PropTypes.oneOf(["button", "submit"]).isRequired,
  invertColor: PropTypes.bool,
  onClick: PropTypes.func,
};
