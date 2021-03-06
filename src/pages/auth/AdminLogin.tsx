import { Box, Button, Center, Flex, Image, Text, VStack } from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../../components/forms/CustomInput";
import { authService } from "../../services/auth.service";
import { userLogin } from "../../store/userStore";
import { userTypes } from "../../utils/constants";
import { loginValidator } from "../../utils/validators";

interface IloginValues {
  email: string;
  password: string;
}

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues: IloginValues = { email: "", password: "" };
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: loginValidator,
    onSubmit: async (values) => {
      setIsLoading(true);
      const response = await authService.login(values.email, values.password);
      if (response.user_type === userTypes.ADMIN) {
        dispatch(userLogin(response));
        setTimeout(() => {
          navigate("/project/admin/all");
        }, 300);
      } else if (response.user_type === userTypes.SENIOR_ADMIN) {
           dispatch(userLogin(response))
        setTimeout(() => {
          navigate("/project/admin/all")
        }, 300) 
      }else if (response.user_type === userTypes.FINANCE) {

      }else {
        formik.setFieldError("email", "User not authorized")
      }
      setIsLoading(false);
    },
  });
  return (
    <>
      <Center h={"100vh"} w={"full"} bg={"moneypoint-light-blue"}>
        <Box w={"385px"} borderRadius={"12px"} bg={"white"} shadow={"lg"} padding={8} paddingTop={"72px"} position={"relative"}>
          <Image
            src={require("../../assets/images/Bluebox.svg").default}
            h={"100px"}
            position={"absolute"}
            left={"50%"}
            transform={" translate(-50%, -40%)"}
            top={0}
          />

          <Text color={"blackAlpha.800"} fontSize={"2xl"} fontWeight={"medium"} mb={"24px"}>
            Login
          </Text>

          <form onSubmit={formik.handleSubmit}>
            <VStack width={"full"} spacing={"16px"} alignItems={"stretch"}>
              <CustomInput
                label="Email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter Email"
                type="email"
                value={formik.values.email}
                errMsg={formik.touched.email && formik.errors.email ? formik.errors.email : null}
              />

              <CustomInput
                label="Password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter Password"
                type="password"
                value={formik.values.password}
                errMsg={formik.touched.email && formik.errors.password ? formik.errors.password : null}
              />
            </VStack>

            <Flex marginTop={"40px"} justifyContent={"flex-end"} alignItems={"center"} gap={"24px"}>
              <Link to={"auth/forgot-password"}>
                <Text color={"moneypoint-blue"} fontSize={"12px"} fontWeight={"medium"}>
                  Forgot Password?
                </Text>
              </Link>
              <Button
                type="submit"
                padding={"12px 40px"}
                color={"white"}
                bg={"moneypoint-blue"}
                colorScheme={"moneypoint-blue"}
                isLoading={isLoading}
              >
                Login
              </Button>
            </Flex>
          </form>
        </Box>
      </Center>
    </>
  );
};

export default AdminLogin;
