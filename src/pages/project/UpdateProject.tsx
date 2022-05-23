import { Box, Button, Flex, Heading, VStack } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useSelector } from "react-redux";
import CustomFormFileUpload from "../../components/forms/FormGroup/CustomFormFileUpload";
import CustomFormInput from "../../components/forms/FormGroup/CustomFormInput";
import CustomFormSelect from "../../components/forms/FormGroup/CustomFormSelect";
import CustomFormTextArea from "../../components/forms/FormGroup/CustomFormTextArea";
import { cloudinaryService } from "../../services/cloudinary.service";
import { projectService } from "../../services/project.service";
import { RootState } from "../../store";
import { projectCategories } from "../../utils/constants";
import { createProjectValidatorSchema, updateProjectValidatorSchema } from "../../utils/validators";
import StateAndLgas from "../../utils/nigeria-state-and-lgas.json";
import { useNavigate } from "react-router";
import { IProject } from "../../interface/project.interface";

interface ICreateProject {
  project_type: string;
  renovation_category: string;
  office_area_for_renovation: string;
  project_description: string;
  amount: string;
  images?: string[];
  receipt?: string[];
  state: string;
  address: string;
}

interface IUpdateProject {
  setProjectDetails : Dispatch<SetStateAction<IProject | undefined>>
  setModalOpen : Dispatch<SetStateAction< boolean>>
  projectDetails: IProject;
  name: string;
}

const UpdateProject: React.FC<IUpdateProject> = (props) => {
  const { projectDetails, name, setProjectDetails , setModalOpen} = props;
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);
  const [isLoading, setIsLoading] = useState(false)

  const initialValues: ICreateProject = {
    project_description: projectDetails.project_description,
    project_type: projectDetails.project_type,
    renovation_category: projectDetails.renovation_category,
    office_area_for_renovation: projectDetails.office_area_for_renovation,
    amount: projectDetails.amount.toString(),
    images: projectDetails.images,
    receipt: projectDetails.receipt,
    state: projectDetails.state,
    address: projectDetails.address,
  };
  
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema : updateProjectValidatorSchema,
    onSubmit: (values) => {
      setIsLoading(true)
        projectService.updateSingleProject(projectDetails._id, {
            name : name,
            value : values[name as keyof ICreateProject]
        })
        .then(res => {
            setProjectDetails(res)
            setModalOpen(false)
        })
        .catch(err => {
            console.error(err);
        })
        setIsLoading(false)
    },
    
  });

  const onSelect = (name: string, value: any) => {
    formik.setFieldValue(name, value);
  };

  const handleSelectImage = (name: string, image: File) => {
    cloudinaryService
      .uploadToCloudinary({
        image: image,
        upload_preset: "pm_tool",
        cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME!,
      })
      .then((data) => {
        let newImageArray = formik.values[name as keyof ICreateProject] as string[];
        newImageArray = [...newImageArray, data.url];
        formik.setFieldValue(name, newImageArray);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteImage = (name: string, url: string) => {
    // let public_array = url.split("/");
    // let public_id = public_array.pop()!;
    // public_id = public_id.split(".")[0];
    // // cloudinaryService
    // //   .deleteFromCloudinary({
    // //     public_id,
    // //     cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME!,
    // //     upload_preset: "pm_tool",
    // //   })
    // //   .then((data) => {
    // //     let newImageArray = formik.values[name as keyof ICreateProject] as string[];
    // //     newImageArray = newImageArray.filter((image) => image !== url);
    // //     formik.setFieldValue(name, newImageArray);
    // //   })
    // //   .catch((err : AxiosError) => {
    // //     formik.setFieldError(name, ((err.response?.data as any).error.message));
    // //   });
    let newImageArray = formik.values[name as keyof ICreateProject] as string[];
    newImageArray = newImageArray.filter((image) => image !== url);
    formik.setFieldValue(name, newImageArray);
  };

  return (
    <>
        <form onSubmit={formik.handleSubmit}>
          {name === "project_type" && (
            <CustomFormSelect
              name="project_type"
              data={projectCategories.map((cat) => ({ name: cat.name, value: cat.name }))}
              onSelect={onSelect}
              placeholder="Select Project Type"
              required={false}
              value={formik.values.project_type}
              errMsg={formik.errors.project_type && formik.touched.project_type ? formik.errors.project_type : null}
              onBlur={formik.handleBlur}
            />
          )}
          {name === "renovation_category" && (
            <CustomFormSelect
              name="renovation_category"
              data={projectCategories
                .find((cat) => cat.name === formik.values.project_type)!
                ?.subCategories.map((subcat) => ({ name: subcat, value: subcat }))}
              onSelect={onSelect}
              placeholder="Select Categories"
              required={false}
              value={formik.values.renovation_category}
              errMsg={formik.errors.renovation_category && formik.touched.renovation_category ? formik.errors.renovation_category : null}
              onBlur={formik.handleBlur}
            />
          )}
          {name === "office_area_for_renovation" && (
            <CustomFormInput
              name="office_area_for_renovation"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Enter the office area for renovation"
              required={false}
              value={formik.values.office_area_for_renovation}
              errMsg={
                formik.errors.office_area_for_renovation && formik.touched.office_area_for_renovation
                  ? formik.errors.office_area_for_renovation
                  : null
              }
            />
          )}

          {name === "project_description" && (
            <CustomFormTextArea
              name="project_description"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Project Description"
              required={false}
              value={formik.values.project_description}
              errMsg={formik.errors.project_description && formik.touched.project_description ? formik.errors.project_description : null}
            />
          )}

          {name === "amount" && (
            <CustomFormInput
              name="amount"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Amount"
              required={false}
              value={formik.values.amount}
              errMsg={formik.errors.amount && formik.touched.amount ? formik.errors.amount : null}
            />
          )}

          {name === "state" && (
            <CustomFormSelect
              name="state"
              data={StateAndLgas.map((state) => ({ name: state.state, value: state.state }))}
              onSelect={onSelect}
              placeholder="Select State"
              required={false}
              value={formik.values.state}
              errMsg={formik.errors.state && formik.touched.state ? formik.errors.state : null}
              onBlur={formik.handleBlur}
            />
          )}

          {name === "address" && (
            <CustomFormInput
              name="address"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Address"
              required={false}
              value={formik.values.address}
              errMsg={formik.errors.address && formik.touched.address ? formik.errors.address : null}
            />
          )}

          {name === "images" && (
            <CustomFormFileUpload
              name="images"
              title="Upload Images"
              handleSelectImage={handleSelectImage}
              handleDeleteImage={handleDeleteImage}
              handleBlur={formik.handleBlur}
              value={formik.values.images!}
              text="Images of office supplies to be bought or changed, if available"
              errMsg={formik.errors.images && formik.touched.images ? formik.errors.images : null}
              required={false}
            />
          )}

          {name === "receipt" && (
            <CustomFormFileUpload
              name="receipt"
              title="Upload Reciept"
              text="Is this an official receipt? If not, you would need to send a mail with tthe official receipt within 1 week of payment"
              handleDeleteImage={handleDeleteImage}
              handleSelectImage={handleSelectImage}
              handleBlur={formik.handleBlur}
              value={formik.values.receipt!}
              errMsg={formik.errors.amount && formik.touched.amount ? formik.errors.amount : null}
              required={false}
            />
          )}

          <Flex justifyContent={"end"} width={"100%"} marginTop={"20px"}>
            <Button type="submit" padding={"12px 40px"} color={"white"} bg={"moneypoint-blue"} fontSize={"sm"} colorScheme={"moneypoint-blue"} isLoading = {isLoading}>
              Update
            </Button>
          </Flex>
        </form>
    </>
  );
};

export default UpdateProject;
