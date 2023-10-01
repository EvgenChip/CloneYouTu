import { ReactNode } from "react";
import { useAuth } from "../../store/auth/useAuth";
import { Navigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};

export const AuthHoc = ({ children }: Props) => {
  const { isAuth, checked } = useAuth();

  if (!checked) {
    return <div>loading</div>;
  }

  if (isAuth) {
    return <div>{children}</div>;
  }

  return <Navigate to={"/login"} />;
};
