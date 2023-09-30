import * as Yup from "yup";

export const loginValidation = Yup.object().shape({
  email: Yup.string()
    .required("*поле обязательно для заполнения")
    .email("*поле обязательно для заполнения"),
  password: Yup.string().required("*поле обязательно для заполнения"),
});
