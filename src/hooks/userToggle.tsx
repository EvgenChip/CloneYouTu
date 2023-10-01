import { useState } from "react";

export const useToggle = () => {
  const [userEl, setUserEl] = useState<null | HTMLElement>(null);
  const open = Boolean(userEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setUserEl(event.currentTarget);
  };

  const handleClose = () => {
    setUserEl(null);
  };

  return { userEl, open, handleClick, handleClose };
};
