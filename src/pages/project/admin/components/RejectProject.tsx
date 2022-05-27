import { Button, Flex } from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useState } from "react";
import CustomFormTextArea from "../../../../components/forms/FormGroup/CustomFormTextArea";
import { rejectProjectValidatorSchema } from "../../../../utils/validators";

interface IRejectProject {
  rejectProject: (comment: string) => void;
  closeModal: () => void;
}

interface IRejectProjectInitialValues {
  comment: string;
}

const RejectProject : React.FC<IRejectProject> = (props)  => {
    const { closeModal, rejectProject} = props
  const [isLoading, setIsLoading] = useState(false);
  const rejectProjectInitailValues: IRejectProjectInitialValues = {
    comment: "",
  };
  const formik = useFormik({
    initialValues: rejectProjectInitailValues,
    validationSchema : rejectProjectValidatorSchema,
    onSubmit: (values) => {
      setIsLoading(true);
        rejectProject(values.comment)
        closeModal()
      setIsLoading(false);
    },
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <CustomFormTextArea
          name="comment"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          placeholder="Add a comment"
          required={true}
          value={formik.values.comment}
          errMsg={formik.errors.comment && formik.touched.comment ? formik.errors.comment : null}
        />
        <Flex justifyContent={"end"} width={"100%"} marginTop={"20px"}>
          <Button
            type="submit"
            padding={"12px"}
            color={"white"}
            bg={"moneypoint-red"}
            fontSize={"sm"}
            colorScheme={"moneypoint-red"}
            isLoading={isLoading}
          >
            Delete
          </Button>
        </Flex>
      </form>
    </>
  );
};

export default RejectProject;
