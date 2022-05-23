import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import CustomFormFileUpload from "../../components/forms/FormGroup/CustomFormFileUpload";
import CustomFormInput from "../../components/forms/FormGroup/CustomFormInput";
import CustomFormSelect from "../../components/forms/FormGroup/CustomFormSelect";
import CustomFormTextArea from "../../components/forms/FormGroup/CustomFormTextArea";
import { cloudinaryService } from "../../services/cloudinary.service";
import { projectService } from "../../services/project.service";
import { RootState } from "../../store";
import { projectCategories } from "../../utils/constants";
import { createProjectValidatorSchema } from "../../utils/validators";
import StateAndLgas from "../../utils/nigeria-state-and-lgas.json";
import { useNavigate } from "react-router";
import { FiChevronLeft, FiChevronsLeft } from "react-icons/fi";

interface ICreateProject {
  title: string;
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

const CreateProject = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDetails, setModalDetails] = useState({ title: "", text: "", link: "" });
  const { user } = useSelector((state: RootState) => state.user);
  const initialValues: ICreateProject = {
    title: "",
    project_description: "",
    project_type: "",
    renovation_category: "",
    office_area_for_renovation: "",
    amount: "",
    images: [],
    receipt: [],
    state: user!?.state,
    address: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: createProjectValidatorSchema,
    onSubmit: (values) => {
      projectService
        .createNewProject(values)
        .then((res) => {
          console.log(res);
          setModalDetails({
            title: `new Project ${res.title}`,
            text: res.project_description,
            link: res._id,
          });
          setModalOpen(true);
        })
        .catch((err) => {
          console.error(err);
        });
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
      <Box paddingX={"120px"} overflowY={"auto"} paddingBottom={"40px"} paddingTop={"60px"}>
        <Flex  alignItems ="center" marginBottom={8}>
          <FiChevronLeft
            cursor={"pointer"}
            fontSize={"24px"}
            onClick={() => {
              navigate(`/project`);
            }}
          />
          <Heading fontSize={"24px"} color={"blackAlpha.800"} textAlign={"center"}  flexGrow ={1}>
            Enter Project information
          </Heading>
        </Flex>

        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={"12px"} maxWidth={"500px"} margin={"0 auto"}>
            <CustomFormInput
              name="title"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Title/Summary"
              required={true}
              value={formik.values.title}
              errMsg={formik.errors.title && formik.touched.title ? formik.errors.title : null}
            />
            <CustomFormSelect
              name="project_type"
              data={projectCategories.map((cat) => ({ name: cat.name, value: cat.name }))}
              onSelect={onSelect}
              placeholder="Select Project Type"
              required={true}
              value={formik.values.project_type}
              errMsg={formik.errors.project_type && formik.touched.project_type ? formik.errors.project_type : null}
              onBlur={formik.handleBlur}
            />
            <CustomFormSelect
              name="renovation_category"
              data={projectCategories
                .find((cat) => cat.name === formik.values.project_type)!
                ?.subCategories.map((subcat) => ({ name: subcat, value: subcat }))}
              onSelect={onSelect}
              placeholder="Select Categories"
              required={true}
              value={formik.values.renovation_category}
              errMsg={formik.errors.renovation_category && formik.touched.renovation_category ? formik.errors.renovation_category : null}
              onBlur={formik.handleBlur}
            />
            <CustomFormInput
              name="office_area_for_renovation"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Enter the office area for renovation"
              required={true}
              value={formik.values.office_area_for_renovation}
              errMsg={
                formik.errors.office_area_for_renovation && formik.touched.office_area_for_renovation
                  ? formik.errors.office_area_for_renovation
                  : null
              }
            />
            <CustomFormTextArea
              name="project_description"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Project Description"
              required={true}
              value={formik.values.project_description}
              errMsg={formik.errors.project_description && formik.touched.project_description ? formik.errors.project_description : null}
            />
            <CustomFormInput
              name="amount"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Amount"
              required={true}
              value={formik.values.amount}
              errMsg={formik.errors.amount && formik.touched.amount ? formik.errors.amount : null}
            />
            <CustomFormSelect
              name="state"
              data={StateAndLgas.sort((a, b) => (a.state < b.state ? -1 : 1)).map((state) => ({ name: state.state, value: state.state }))}
              onSelect={onSelect}
              placeholder="Select State"
              required={true}
              value={formik.values.state}
              errMsg={formik.errors.state && formik.touched.state ? formik.errors.state : null}
              onBlur={formik.handleBlur}
            />
            <CustomFormInput
              name="address"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Address"
              required={true}
              value={formik.values.address}
              errMsg={formik.errors.address && formik.touched.address ? formik.errors.address : null}
            />
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
            <Flex justifyContent={"end"} width={"100%"}>
              <Button type="submit" padding={"12px 40px"} color={"white"} bg={"moneypoint-blue"} fontSize={"sm"} colorScheme={"moneypoint-blue"}>
                Submit
              </Button>
            </Flex>
          </VStack>
        </form>
      </Box>
      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalDetails.title}</ModalHeader>
          <ModalBody>
            <Text>{modalDetails.text}</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              color={"white"}
              bg={"moneypoint-blue"}
              fontSize={"sm"}
              colorScheme={"moneypoint-blue"}
              onClick={() => {
                navigate(`/project/${modalDetails.link}`);
              }}
            >
              View Project
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateProject;
