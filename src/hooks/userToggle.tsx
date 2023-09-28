import { FC, useState } from "react";

export const useToggle = () => {
  const [userEl, setuserEl] = useState<null | HTMLElement>(null);
  const open = Boolean(userEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setuserEl(event.currentTarget);
  };
  const handleClose = () => {
    setuserEl(null);
  };

  return { userEl, open, handleClick, handleClose };
};
