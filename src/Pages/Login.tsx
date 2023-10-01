import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import { useState } from "react";

import { loginValidation } from "../utils/loginValid";
import { InputField } from "../components/input/Input";
import { Button } from "../components/button/Button";
import { useAppDispatch } from "../store/hooks";
import { loginAction } from "../store/auth/actions/authActions";
import { updateStateFavorites } from "../store/favorites/actions/favorite.actions";
import { updateStateHistory } from "../store/history/action/historyAction";

export interface LoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidation),
  });

  const loginUser = async (data: LoginForm) => {
    try {
      setLoading(true);
      const user = await dispatch(loginAction(data));

      if (user.type !== "auth/login/rejected") {
        dispatch(updateStateFavorites());
        dispatch(updateStateHistory());
        navigate("/");
      }
    } catch (err) {
      const typedError = err as Error;
      toast.error(typedError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="w-[400px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 bg-lime-600 rounded-2xl"
      onSubmit={handleSubmit(loginUser)}>
      <h2 className="text-center text-lg">Войдите в аккаунт</h2>

      <div className="mt-5">
        <InputField
          name="email"
          type="email"
          label="Email"
          icon={"Email"}
          register={register}
          error={errors.email}
        />
      </div>

      <div className="mt-5">
        <InputField
          name="password"
          type="password"
          label="Пароль"
          icon={"LockSvg"}
          register={register}
          error={errors.password}
        />
      </div>

      <p className="mt-5">
        Нет аккаунта?{" "}
        <Link className=" font-bold border-b border-black" to="/registration">
          Создайте его
        </Link>
      </p>

      <div className="mt-5">
        <Button disabled={loading} type="submit" className="w-full">
          {loading ? "загрузка..." : "Войти"}
        </Button>
      </div>
    </form>
  );
};
