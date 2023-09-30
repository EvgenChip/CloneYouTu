import { useAppSelector } from "../hooks";

export const useAuth = () => {
  const { isAuth, email, loading, token, uid } = useAppSelector(
    (state) => state.auth
  );
  return {
    isAuth,
    email,
    loading,
    token,
    uid,
  };
};
