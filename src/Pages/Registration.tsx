import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";

import { registrationValidation } from "../utils/registration";
import { Button } from "../components/button/Button";
import { InputField } from "../components/input/Input";
import { useAppDispatch } from "../store/hooks";

import { registrationAction } from "../store/auth/actions/authActions";

export interface RegistrationForm {
  email: string;
  password: string;
  confirmPassword: string;
}

export const Registration = () => {
  const navigate = useNavigate();

  const loading = false;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registrationValidation),
  });
  const dispatch = useAppDispatch();
  //   const registrationUser = (data: RegistrationForm) => {
  //     const auth = getAuth();
  //     console.log(auth);
  //     createUserWithEmailAndPassword(auth, data.email, data.password)
  //       .then(({ user }) => {
  //         console.log("user", user);
  //         dispatch(
  //           setUser({
  //             email: user.email,
  //             id: user.uid,
  //             // @ts-ignore
  //             token: user.accessToken,
  //           })
  //         );
  //         navigate("/");
  //       })
  //       .catch(console.error);
  //   };

  const registrationUser = async (data: RegistrationForm) => {
    try {
      const user = await dispatch(registrationAction(data));

      if (user.type !== "auth/registration/rejected") {
        navigate("/");
      }
    } catch (err) {
      const typedError = err as Error;
      toast.error(typedError.message);
    }
  };

  return (
    <form
      className="w-[400px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 bg-lime-600 rounded-2xl"
      onSubmit={handleSubmit(registrationUser)}>
      <h2 className="text-center text-lg">Создайте аккаунт</h2>

      <div className="mt-5">
        <InputField
          name="email"
          type="email"
          label="Email"
          icon={"EmailSvg"}
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

      <div className="mt-5">
        <InputField
          name="confirmPassword"
          type="password"
          label="Повторите пароль"
          icon={"LockSvg"}
          register={register}
          error={errors.confirmPassword}
        />
      </div>

      <p className="mt-5">
        Уже есть аккаунт?{" "}
        <Link className=" font-bold border-b border-black" to="/login">
          Войдите
        </Link>
      </p>

      <div className="mt-5">
        <Button disabled={loading} className="w-full">
          {loading ? "загрузка..." : "Зарегистрироваться"}
        </Button>
      </div>
    </form>
  );
};
