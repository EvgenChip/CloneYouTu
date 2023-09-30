import * as Yup from "yup";

export const registrationValidation = Yup.object().shape({
  email: Yup.string()
    .required("*поле обязательно для заполнения")
    .email("*поле обязательно для заполнения"),
  password: Yup.string()
    .required("*поле обязательно для заполнения")
    .min(6, "*минимальное кол-во символов 6")
    .max(40, "*минимальное кол-во символов 40"),
  confirmPassword: Yup.string()
    .required("*поле обязательно для заполнения")
    .oneOf([Yup.ref("password")], "*пароли не совпадают"),
});
