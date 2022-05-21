import * as yup from "yup"

export const loginValidator = yup.object().shape({
    email : yup.string().email("Enter valid email").required("Please enter email"),
    password : yup.string().required("Please enter password")
})