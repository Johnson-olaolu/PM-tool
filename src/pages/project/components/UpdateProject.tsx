import { Box, Button, Flex, Heading, Table, TableCaption, TableContainer, Td, Text, Tr, VStack } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useSelector } from "react-redux";
import CustomFormFileUpload from "../../../components/forms/FormGroup/CustomFormFileUpload";
import CustomFormInput from "../../../components/forms/FormGroup/CustomFormInput";
import CustomFormSelect from "../../../components/forms/FormGroup/CustomFormSelect";
import CustomFormTextArea from "../../../components/forms/FormGroup/CustomFormTextArea";
import { cloudinaryService } from "../../../services/cloudinary.service";
import { projectService } from "../../../services/project.service";
import { RootState } from "../../../store";
import { projectCategories } from "../../../utils/constants";
import { createInventoryValidatorSchema, createMiscellaneousValidatorSchema, createProjectValidatorSchema } from "../../../utils/validators";
import StateAndLgas from "../../../utils/nigeria-state-and-lgas.json";
import { useNavigate } from "react-router";
import { IInventory, IMiscellaneous, IProject } from "../../../interface/project.interface";
import NumberFormat from "react-number-format";
import { FaTrash } from "react-icons/fa";
import { useToast } from '@chakra-ui/react'
import CustomFormDatePicker from "../../../components/forms/FormGroup/CustomFormDatePicker";

interface ICreateProject {
  title_id : string
  project_type: string;
  renovation_category: string;
  office_area_for_renovation: string;
  project_description: string;
  images?: string[];
  receipt?: string[];
  state: string;
  start_date: Date;
  miscellaneous: IMiscellaneous[];
  inventory: {inventory_id : string, amount : number}[];
  paid_amount: number;
}

interface IUpdateProject {
  setProjectDetails: Dispatch<SetStateAction<IProject | undefined>>;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  projectDetails: IProject;
  name: string;
}

const UpdateProject: React.FC<IUpdateProject> = (props) => {
  const { projectDetails, name, setProjectDetails, setModalOpen } = props;
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);
  const [inventories, setInventories] = useState<IInventory[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast()
  const initialValues: ICreateProject = {
    title_id : projectDetails.title._id,
    project_description: projectDetails.project_description,
    project_type: projectDetails.project_type,
    renovation_category: projectDetails.renovation_category,
    office_area_for_renovation: projectDetails.office_area_for_renovation,
    images: projectDetails.images,
    start_date : projectDetails.start_date,
    receipt: projectDetails.receipt,
    state: projectDetails.state,
    inventory: projectDetails.inventory.map((inv) => ({inventory_id : inv.inventory._id, amount : inv.amount})),
    miscellaneous: projectDetails.miscellaneous,
    paid_amount: projectDetails.paid_amount,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: createProjectValidatorSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      projectService
        .updateSingleProject(projectDetails._id, {
          name: name,
          value: values[name as keyof ICreateProject],
        })
        .then((res) => {
          setProjectDetails(res);
          toast({
            title: 'Project Updated',
            description: "We've updated your project",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
          setModalOpen(false);
        })
        .catch((err) => {
          console.error(err);
        });
      setIsLoading(false);
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

  const inventoryInitialvalues: { inventory_id : string , amount : number} = { inventory_id: "", amount : 0 };
  const inventoryFormik = useFormik({
    validationSchema: createInventoryValidatorSchema,
    initialValues: inventoryInitialvalues,
    onSubmit: (values) => {
      const currentInventory = formik.values.inventory;
      currentInventory.push({
        inventory_id : values.inventory_id,
        amount: values.amount,
      });
      //formik.setFieldValue("inventory", currentInventory)
      inventoryFormik.resetForm();
    },
  });

  const miscellaneousInitialvalues: IMiscellaneous = { name: "", price: 0 };
  const miscellaneousFormik = useFormik({
    validationSchema: createMiscellaneousValidatorSchema,
    initialValues: miscellaneousInitialvalues,
    onSubmit: (values) => {
      const currentmiscellaneous = formik.values.miscellaneous;
      currentmiscellaneous.push({
        name: values.name,
        price: values.price,
      });
      //formik.setFieldValue("miscellaneous", currentmiscellaneous)
      miscellaneousFormik.resetForm();
    },
  });

  const handleRemoveInventory = (inventory_id : string) => {
    const newIventoryArray = formik.values.inventory.filter((inv) => inv.inventory_id !== inventory_id);
    formik.setFieldValue("inventory", newIventoryArray);
  };

  const handleRemovemiscellaneous = (item: IMiscellaneous) => {
    const newmiscellaneousArray = formik.values.miscellaneous.filter((misc) => misc !== item);
    formik.setFieldValue("miscellaneous", newmiscellaneousArray);
  };
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        {(name === "project_type" || name === "renovation_category") && (
          <VStack spacing={"16px"}>
            <Box width={"100%"}>
              <Text as={"span"} fontSize={"12px"} color={"blackAlpha.600"} marginBottom={"4px"}>
                Project Type
              </Text>
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
            </Box>
            <Box width={"100%"}>
              <Text as={"span"} fontSize={"12px"} color={"blackAlpha.600"} marginBottom={"4px"}>
                Renovation Category
              </Text>
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
            </Box>
          </VStack>
        )}

        {name === "office_area_for_renovation" && (
          <Box>
            <Text as={"span"} fontSize={"12px"} color={"blackAlpha.600"} marginBottom={"4px"}>
              Office Area for renovation
            </Text>
            <CustomFormInput
              name="office_area_for_renovation"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Enter the office area for renovation"
              required={false}
              type="text"
              value={formik.values.office_area_for_renovation}
              errMsg={
                formik.errors.office_area_for_renovation && formik.touched.office_area_for_renovation
                  ? formik.errors.office_area_for_renovation
                  : null
              }
            />
          </Box>
        )}

        {name === "project_description" && (
          <Box>
            <Text as={"span"} fontSize={"12px"} color={"blackAlpha.600"} marginBottom={"4px"}>
              Project Description
            </Text>
            <CustomFormTextArea
              name="project_description"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Project Description"
              required={false}
              value={formik.values.project_description}
              errMsg={formik.errors.project_description && formik.touched.project_description ? formik.errors.project_description : null}
            />
          </Box>
        )}

        {name === "start_date" && (
          <Box>
            <Text as={"span"} fontSize={"12px"} color={"blackAlpha.600"} marginBottom={"4px"}>
              Start Date
            </Text>
            <CustomFormDatePicker
             name="start_date"
             onSelect={onSelect}
             onBlur ={formik.handleBlur}
             placeholder ="Select Date"
             required ={true}
             value ={formik.values.start_date}
             errMsg={formik.errors.project_description && formik.touched.project_description ? formik.errors.project_description : null}
            />
          </Box>
        )}

        {name === "inventory" && (
          <Box width={"100%"} border={"solid 2px"} borderColor={"moneypoint-blue"} padding={"16px"} borderRadius={"4px"}>
            <Heading fontWeight={"bold"} fontSize={"16px"} color={"blackAlpha.800"} marginBottom={"16px"}>
              Add Inventory
            </Heading>
            <TableContainer marginBottom={"20px"}>
                <Table variant="simple" style={{ borderCollapse: "separate", borderSpacing: "0 12px" }}>
                  {formik.values.inventory.map((inv) => (
                    <Tr backgroundColor={"white"} cursor={"pointer "} borderRadius={"4px"} shadow={"sm"}>
                      <Td fontSize={"12px"}>
                        Name: <strong>{inventories.find((i) => i._id === inv.inventory_id)?.name}</strong>
                      </Td>
                      <Td fontSize={"12px"}>
                        Amount: <strong>{inv.amount}</strong>
                      </Td>
                      <Td fontSize={"12px"}>
                        Price:{" "}
                        <strong>
                          <NumberFormat
                            value={inventories.find((i) => i._id === inv.inventory_id)?.price}
                            thousandSeparator={true}
                            prefix={"₦"}
                            displayType={"text"}
                          />
                        </strong>
                      </Td>
                      <Td fontSize={"12px"}>
                        Vendor: <strong> {inventories.find((i) => i._id === inv.inventory_id)?.vendor} </strong>
                      </Td>
                      <Td fontSize={"12px"}>
                        <FaTrash color="red" onClick={() => handleRemoveInventory(inv.inventory_id)} />
                      </Td>
                    </Tr>
                  ))}
                  <TableCaption fontSize={"12px"} textAlign={"left"}>
                    Total Amount :{" "}
                    <NumberFormat
                      value={formik.values.inventory
                        .reduce((a, b) => b.amount * inventories.find((i) => i._id === b.inventory_id)?.price! + a, 0)
                        .toString()}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₦"}
                    />
                  </TableCaption>
                </Table>
              </TableContainer>

              <VStack spacing={"12px"} alignItems={"start"}>
                <CustomFormSelect
                  name="inventory_id"
                  data={inventories.map(inv => ({name : inv.name, value : inv._id}))}
                  onSelect={onSelect}
                  placeholder="Select Inventory"
                  required={true}
                  value={inventoryFormik.values.inventory_id}
                  errMsg={inventoryFormik.errors.inventory_id && inventoryFormik.touched.inventory_id ? inventoryFormik.errors.inventory_id : null}
                  onBlur={inventoryFormik.handleBlur}
                />
                <CustomFormInput
                  name="amount"
                  onBlur={inventoryFormik.handleBlur}
                  onChange={inventoryFormik.handleChange}
                  placeholder="Item Amount"
                  required={true}
                  type="number"
                  value={inventoryFormik.values.amount > 0 ? inventoryFormik.values.amount : ""}
                  errMsg={inventoryFormik.errors.amount && inventoryFormik.touched.amount ? inventoryFormik.errors.amount : null}
                />
                <Button
                  padding={"12px 40px"}
                  color={"white"}
                  bg={"moneypoint-blue"}
                  fontSize={"sm"}
                  colorScheme={"moneypoint-blue"}
                  onClick={(e) => inventoryFormik.handleSubmit()}
                >
                  Add Inventory Item
                </Button>
              </VStack>
          </Box>
        )}

        {name === "miscellaneous" && (
          <Box width={"100%"} border={"solid 2px"} borderColor={"moneypoint-blue"} padding={"16px"} borderRadius={"4px"}>
            <Heading fontWeight={"bold"} fontSize={"16px"} color={"blackAlpha.800"} marginBottom={"16px"}>
              Update Miscellaneous
            </Heading>
            <TableContainer marginBottom={"20px"}>
              <Table variant="simple" style={{ borderCollapse: "separate", borderSpacing: "0 12px" }}>
                {formik.values.miscellaneous.map((misc) => (
                  <Tr backgroundColor={"white"} cursor={"pointer "} borderRadius={"4px"} shadow={"sm"}>
                    <Td fontSize={"12px"}>
                      Name: <strong>{misc.name}</strong>
                    </Td>
                    <Td fontSize={"12px"}>
                      Price:{" "}
                      <strong>
                        {" "}
                        <NumberFormat value={misc.price} thousandSeparator={true} prefix={"₦"} displayType={"text"} />
                      </strong>
                    </Td>
                    <Td fontSize={"12px"}>
                      <FaTrash color="red" onClick={() => handleRemovemiscellaneous(misc)} />
                    </Td>
                  </Tr>
                ))}
                <TableCaption fontSize={"12px"} textAlign={"left"}>
                  Total Amount :{" "}
                  <NumberFormat
                    value={formik.values.miscellaneous.reduce((a, b) => b.price + a, 0).toString()}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₦"}
                  />
                </TableCaption>
              </Table>
            </TableContainer>

            <VStack spacing={"12px"} alignItems={"start"}>
              <CustomFormInput
                name="name"
                onBlur={miscellaneousFormik.handleBlur}
                onChange={miscellaneousFormik.handleChange}
                placeholder="Item Name"
                required={true}
                type="text"
                value={miscellaneousFormik.values.name}
                errMsg={miscellaneousFormik.errors.name && miscellaneousFormik.touched.name ? miscellaneousFormik.errors.name : null}
              />
              <CustomFormInput
                name="price"
                onBlur={miscellaneousFormik.handleBlur}
                onChange={miscellaneousFormik.handleChange}
                placeholder="miscellaneous Price"
                required={true}
                type="number"
                value={miscellaneousFormik.values.price > 0 ? miscellaneousFormik.values.price : ""}
                errMsg={miscellaneousFormik.errors.price && miscellaneousFormik.touched.price ? miscellaneousFormik.errors.price : null}
              />
              <Button
                padding={"12px 40px"}
                color={"white"}
                bg={"moneypoint-blue"}
                fontSize={"sm"}
                colorScheme={"moneypoint-blue"}
                onClick={(e) => miscellaneousFormik.handleSubmit()}
              >
                Add miscellaneous
              </Button>
            </VStack>
          </Box>
        )}

        {name === "paid_amount" && (
          <Box>
            <Text as={"span"} fontSize={"12px"} color={"blackAlpha.600"} marginBottom={"4px"}>
              Paid Amount
            </Text>
            <CustomFormInput
              name="paid_amount"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Paid Amount"
              required={false}
              type="amount"
              value={formik.values.paid_amount}
              errMsg={formik.errors.paid_amount && formik.touched.paid_amount ? formik.errors.paid_amount : null}
            />
          </Box>
        )}

        {name === "images" && (
          <Box>
            <Text as={"span"} fontSize={"12px"} color={"blackAlpha.600"} marginBottom={"4px"}>
              Images
            </Text>
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
          </Box>
        )}

        {name === "receipt" && (
          <Box>
            <Text as={"span"} fontSize={"12px"} color={"blackAlpha.600"} marginBottom={"4px"}>
              Receipt
            </Text>
            <CustomFormFileUpload
              name="receipt"
              title="Upload Reciept"
              text="Is this an official receipt? If not, you would need to send a mail with tthe official receipt within 1 week of payment"
              handleDeleteImage={handleDeleteImage}
              handleSelectImage={handleSelectImage}
              handleBlur={formik.handleBlur}
              value={formik.values.receipt!}
              errMsg={formik.errors.receipt && formik.touched.receipt ? formik.errors.receipt : null}
              required={false}
            />
          </Box>
        )}

        <Flex justifyContent={"end"} width={"100%"} marginTop={"20px"}>
          <Button
            type="submit"
            padding={"12px 40px"}
            color={"white"}
            bg={"moneypoint-blue"}
            fontSize={"sm"}
            colorScheme={"moneypoint-blue"}
            isLoading={isLoading}
          >
            Update
          </Button>
        </Flex>
      </form>
    </>
  );
};

export default UpdateProject;
