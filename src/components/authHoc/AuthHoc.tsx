import { ReactNode } from "react";
import { useAuth } from "../../store/auth/useAuth";
import { Navigate } from "react-router-dom";

type Props = {
  children: ReactNode;

  forAuth: boolean;
};

export const AuthHoc = ({ forAuth, children }: Props) => {
  const { isAuth } = useAuth();

  if (isAuth && forAuth) {
    return <div>{children}</div>;
  }
  if (!isAuth && !forAuth) {
    return <div>{children}</div>;
  } else {
    return <Navigate to={"/login"} />;
  }
};
