import { Box, Divider, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { useFormik } from "formik";
import React from "react";
import CustomFormFileUpload from "../../components/forms/FormGroup/CustomFormFileUpload";
import CustomFormInput from "../../components/forms/FormGroup/CustomFormInput";
import CustomFormSelect from "../../components/forms/FormGroup/CustomFormSelect";
import CustomFormTextArea from "../../components/forms/FormGroup/CustomFormTextArea";
import { projectCategories } from "../../utils/constants";

// data.append('title', 'new project');
// data.append('project_type', 'Appliances');
// data.append('renovation_category', 'Electricals');
// data.append('office_area_for_renovation', 'General');
// data.append('project_description', 'Full office renovation');
// data.append('amount', '50000');
// data.append('images', fs.createReadStream('/C:/Users/pc/Documents/dev_pictures/nails.jpg'));
// data.append('receipt', fs.createReadStream('/C:/Users/pc/Documents/dev_pictures/ui_design.jpg'));
// data.append('state', 'Lagos');
// data.append('address', '86, Allen avenue Ikeja');
// data.append('images', fs.createReadStream('/C:/Users/pc/Documents/dev_pictures/books.jpg'));
// data.append('status', 'Pre-approved');
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
  status: string;
}

const CreateProject = () => {
  const initialValues: ICreateProject = {
    title: "",
    project_description: "",
    project_type: "",
    renovation_category: "",
    office_area_for_renovation: "",
    amount: "",
    images : [],
    receipt : [],
    state: "",
    address: "",
    status: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: () => {},
  });

  const onSelect = (name: string, value: any) => {
    formik.setFieldValue(name, value);
  };

  return (
    <Box paddingX={"120px"} overflowY ={"auto"} paddingBottom ={"40px"} paddingTop ={"60px"}>
      <Heading fontSize={"24px"} color={"blackAlpha.800"} textAlign={"center"} marginBottom={8}>
        Enter Project information
      </Heading>
      <form>
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
            errMsg={formik.errors.office_area_for_renovation && formik.touched.office_area_for_renovation ? formik.errors.office_area_for_renovation : null}
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
          <CustomFormFileUpload
            name="image"
            title="Upload Images"
            text="Images of office supplies to be bought or changed, if available"
          />
          <CustomFormFileUpload
            name="reciepts"
            title="Upload Reciept"
            text="Is this an official receipt? If not, you would need to send a mail with tthe official receipt within 1 week of payment"
          />
        </VStack>
      </form>
    </Box>
  );
};

export default CreateProject;
