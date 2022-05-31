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
  FormLabel,
  TableContainer,
  Table,
  Tr,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomFormFileUpload from "../../components/forms/FormGroup/CustomFormFileUpload";
import CustomFormInput from "../../components/forms/FormGroup/CustomFormInput";
import CustomFormSelect from "../../components/forms/FormGroup/CustomFormSelect";
import CustomFormTextArea from "../../components/forms/FormGroup/CustomFormTextArea";
import { cloudinaryService } from "../../services/cloudinary.service";
import { projectService } from "../../services/project.service";
import { RootState } from "../../store";
import { projectCategories } from "../../utils/constants";
import { createInventoryValidatorSchema, createMiscellaneousValidatorSchema, createProjectValidatorSchema } from "../../utils/validators";
import { useNavigate } from "react-router";
import { FiChevronLeft } from "react-icons/fi";
import { IInventory, IMiscellaneous, Ititle } from "../../interface/project.interface";
import { FaTrash } from "react-icons/fa";
import NumberFormat from "react-number-format";
import { inventoryService } from "../../services/inventories.service";

interface ICreateProject {
  title: string;
  project_type: string;
  renovation_category: string;
  office_area_for_renovation: string;
  project_description: string;
  inventory: { inventoryId: string; amount: number }[];
  miscellaneous: IMiscellaneous[];
  amount_paid: number;
  images?: string[];
  receipt?: string[];
  state: string;
}

const CreateProject = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDetails, setModalDetails] = useState({ title: "", text: "", link: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [inventories, setInventories] = useState<IInventory[]>([]);
 const [titles, setTitles] = useState<Ititle[]>([])
  const { user } = useSelector((state: RootState) => state.user);
  const initialValues: ICreateProject = {
    title: "",
    project_description: "",
    project_type: "",
    renovation_category: "",
    office_area_for_renovation: "",
    amount_paid: 0,
    inventory: [],
    miscellaneous: [],
    images: [],
    receipt: [],
    state: user!?.state,
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: createProjectValidatorSchema,
    onSubmit: (values) => {
      setIsLoading(true);
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
      setIsLoading(false);
    },
  });

  const inventoryInitialvalues: { inventoryId: string; amount: number } = { inventoryId: "", amount: 0 };
  const inventoryFormik = useFormik({
    validationSchema: createInventoryValidatorSchema,
    initialValues: inventoryInitialvalues,
    onSubmit: (values) => {
      const currentInventory = formik.values.inventory;
      currentInventory.push({
        inventoryId: values.inventoryId,
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

  const onSelect = (name: string, value: any) => {
    formik.setFieldValue(name, value);
  };

  const inventoryOnSelect = (name: string, value: any) => {
    inventoryFormik.setFieldValue(name, value);
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

  const handleRemoveInventory = (inventoryId: string) => {
    const newIventoryArray = formik.values.inventory.filter((inv) => inv.inventoryId !== inventoryId);
    formik.setFieldValue("inventory", newIventoryArray);
  };

  const handleRemovemiscellaneous = (item: IMiscellaneous) => {
    const newmiscellaneousArray = formik.values.miscellaneous.filter((misc) => misc !== item);
    formik.setFieldValue("miscellaneous", newmiscellaneousArray);
  };

  useEffect(() => {
    inventoryService.getAllInventories()
      .then(res => {
        setInventories(res)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  useEffect(() => {
    projectService.fetchProjectsTitles()
      .then(res => {
        setTitles(res)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])
  
  return (
    <>
      <Box paddingX={"120px"} overflowY={"auto"} paddingBottom={"40px"} paddingTop={"60px"}>
        <Flex alignItems="center" marginBottom={8}>
          <FiChevronLeft
            cursor={"pointer"}
            fontSize={"24px"}
            onClick={() => {
              navigate(`/project`);
            }}
          />
          <Heading fontSize={"24px"} color={"blackAlpha.800"} textAlign={"center"} flexGrow={1}>
            Enter Project information
          </Heading>
        </Flex>

        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={"12px"} maxWidth={"500px"} margin={"0 auto"}>
          <CustomFormSelect
              name="title"
              data={titles.map((cat) => ({ name: cat.title, value: cat._id }))}
              onSelect={onSelect}
              placeholder="Select Title"
              required={true}
              value={formik.values.title}
              errMsg={formik.errors.title && formik.touched.title ? formik.errors.title : null}
              onBlur={formik.handleBlur}
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
              type="text"
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

            <Box width={"100%"} border={"solid 2px"} borderColor={"moneypoint-blue"} padding={"16px"} borderRadius={"4px"}>
              <Heading fontWeight={"bold"} fontSize={"16px"} color={"blackAlpha.800"} marginBottom={"16px"}>
                Add Inventory
              </Heading>
              <TableContainer marginBottom={"20px"}>
                <Table variant="simple" style={{ borderCollapse: "separate", borderSpacing: "0 12px" }}>
                  {formik.values.inventory.map((inv) => (
                    <Tr backgroundColor={"white"} cursor={"pointer "} borderRadius={"4px"} shadow={"sm"}>
                      <Td fontSize={"12px"}>
                        Name: <strong>{inventories.find((i) => i._id === inv.inventoryId)?.name}</strong>
                      </Td>
                      <Td fontSize={"12px"}>
                        Amount: <strong>{inv.amount}</strong>
                      </Td>
                      <Td fontSize={"12px"}>
                        Price:{" "}
                        <strong>
                          <NumberFormat
                            value={inventories.find((i) => i._id === inv.inventoryId)?.price}
                            thousandSeparator={true}
                            prefix={"₦"}
                            displayType={"text"}
                          />
                        </strong>
                      </Td>
                      <Td fontSize={"12px"}>
                        Vendor: <strong> {inventories.find((i) => i._id === inv.inventoryId)?.vendor} </strong>
                      </Td>
                      <Td fontSize={"12px"}>
                        <FaTrash color="red" onClick={() => handleRemoveInventory(inv.inventoryId)} />
                      </Td>
                    </Tr>
                  ))}
                  <TableCaption fontSize={"12px"} textAlign={"left"}>
                    Total Amount :{" "}
                    <NumberFormat
                      value={formik.values.inventory
                        .reduce((a, b) => b.amount * inventories.find((i) => i._id === b.inventoryId)?.price! + a, 0)
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
                  name="inventoryId"
                  data={inventories.map(inv => ({name : inv.name, value : inv._id}))}
                  onSelect={inventoryOnSelect}
                  placeholder="Select Inventory"
                  required={true}
                  value={inventoryFormik.values.inventoryId}
                  errMsg={inventoryFormik.errors.inventoryId && inventoryFormik.touched.inventoryId ? inventoryFormik.errors.inventoryId : null}
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

            <Box width={"100%"} border={"solid 2px"} borderColor={"moneypoint-blue"} padding={"16px"} borderRadius={"4px"}>
              <Heading fontWeight={"bold"} fontSize={"16px"} color={"blackAlpha.800"} marginBottom={"16px"}>
                Add miscellaneous
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

            <CustomFormInput
              name="amount_paid"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Amount Paid"
              required={true}
              type="number"
              value={formik.values.amount_paid > 0 ? formik.values.amount_paid : null}
              errMsg={formik.errors.amount_paid && formik.touched.amount_paid ? formik.errors.amount_paid : null}
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
              errMsg={formik.errors.receipt && formik.touched.receipt ? formik.errors.receipt : null}
              required={false}
            />

            <Flex justifyContent={"end"} width={"100%"}>
              <Button
                type="submit"
                padding={"12px 40px"}
                color={"white"}
                bg={"moneypoint-blue"}
                fontSize={"sm"}
                colorScheme={"moneypoint-blue"}
                isLoading={isLoading}
              >
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
