import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Td,
  Text,
  Tr,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { FiEdit, FiChevronLeft } from "react-icons/fi";
import { IProject } from "../../interface/project.interface";
import { projectService } from "../../services/project.service";
import UpdateProject from "./components/UpdateProject";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import NumberFormat from "react-number-format";

const ViewSingleProject = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [projectDetails, setProjectDetails] = useState<IProject>();
  const { user } = useSelector((state: RootState) => state.user);
  const [updateName, setUpdateName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const fetchSingleProject = () => {
    projectService
      .fetchSingleProject(projectId!)
      .then((res) => {
        setProjectDetails(res);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    fetchSingleProject();
  }, []);

  const openModal = (name: string) => {
    setUpdateName(name);
    setModalOpen(true);
  };

  return (
    <>
      <Box paddingX={"120px"} overflowY={"auto"} paddingBottom={"40px"} paddingTop={"60px"}>
        <Flex marginBottom={"20px"}>
          <Flex alignItems={"center"} gap={"20px"}>
            <FiChevronLeft
              fontSize={"24px"}
              onClick={() => {
                navigate(`/project/all`);
              }}
              cursor={"pointer"}
            />
            <Text color={"blackAlpha.800"} fontWeight={"medium"} textTransform={"capitalize"}>
              {projectDetails?.title}
            </Text>
          </Flex>
        </Flex>
        <VStack spacing={"16px"} justify={"start"} align={"start"}>
          <Box>
            <Text as={"span"} fontSize={"12px"} color={"blackAlpha.600"} marginBottom={"4px"}>
              Project Description
            </Text>
            <Flex gap={"8px"} alignItems={"center"}>
              <Text>{projectDetails?.project_description}</Text>
              <Button
                variant={"link"}
                color={"moneypoint-blue"}
                _focus={{ boxShadow: "none" }}
                height={"auto"}
                onClick={() => openModal("project_description")}
              >
                {<FiEdit fontSize={"16px"} />}
              </Button>
            </Flex>
          </Box>

          <Box>
            <Text as={"span"} fontSize={"12px"} color={"blackAlpha.600"} marginBottom={"4px"}>
              Project Type
            </Text>
            <Flex gap={"8px"} alignItems={"center"}>
              <Text>{projectDetails?.project_type}</Text>
              <Button
                variant={"link"}
                color={"moneypoint-blue"}
                _focus={{ boxShadow: "none" }}
                height={"auto"}
                onClick={() => openModal("project_type")}
              >
                {<FiEdit fontSize={"16px"} />}
              </Button>
            </Flex>
          </Box>

          <Box>
            <Text as={"span"} fontSize={"12px"} color={"blackAlpha.600"} marginBottom={"4px"}>
              Renovation Category
            </Text>
            <Flex gap={"8px"} alignItems={"center"}>
              <Text>{projectDetails?.renovation_category}</Text>
              <Button
                variant={"link"}
                color={"moneypoint-blue"}
                _focus={{ boxShadow: "none" }}
                height={"auto"}
                onClick={() => openModal("renovation_category")}
              >
                {<FiEdit fontSize={"16px"} />}
              </Button>
            </Flex>
          </Box>

          <Box>
            <Text as={"span"} fontSize={"12px"} color={"blackAlpha.600"} marginBottom={"4px"}>
              Office Area for Renovation
            </Text>
            <Flex gap={"8px"} alignItems={"center"}>
              <Text>{projectDetails?.office_area_for_renovation}</Text>
              <Button
                variant={"link"}
                color={"moneypoint-blue"}
                _focus={{ boxShadow: "none" }}
                height={"auto"}
                onClick={() => openModal("office_area_for_renovation")}
              >
                {<FiEdit fontSize={"16px"} />}
              </Button>
            </Flex>
          </Box>

          <Box>
            <Text as={"span"} fontSize={"12px"} color={"blackAlpha.600"} marginBottom={"4px"}>
              Inventory
            </Text>
            <Flex gap={"8px"} alignItems={"center"}>
              <TableContainer>
                <Table variant="simple" style={{ borderCollapse: "separate", borderSpacing: "0 12px" }}>
                  {projectDetails?.inventory.map((inv) => (
                    <Tr backgroundColor={"white"} cursor={"pointer "} borderRadius={"4px"} shadow={"sm"}>
                      <Td fontSize={"12px"}>
                        Name: <strong>{inv.inventory.name}</strong>
                      </Td>
                      <Td fontSize={"12px"}>
                        Amount: <strong>{inv.amount}</strong>
                      </Td>
                      <Td fontSize={"12px"}>
                        Price:{" "}
                        <strong>
                          <NumberFormat value={inv.inventory.price} thousandSeparator={true} prefix={"₦"} displayType={"text"} />
                        </strong>
                      </Td>
                      <Td fontSize={"12px"}>
                        Vendor: <strong> {inv.inventory.vendor} </strong>
                      </Td>
                    </Tr>
                  ))}
                  <TableCaption fontSize={"12px"} textAlign={"left"} padding={0} margin ={0}>
                    Total Amount :{" "}
                    <NumberFormat
                      value={projectDetails?.inventory.reduce((a, b) => b.amount * b.inventory.price + a, 0).toString()}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₦"}
                    />
                  </TableCaption>
                </Table>
              </TableContainer>
              <Button
                variant={"link"}
                color={"moneypoint-blue"}
                _focus={{ boxShadow: "none" }}
                height={"auto"}
                onClick={() => openModal("inventory")}
              >
                {<FiEdit fontSize={"16px"} />}
              </Button>
            </Flex>
          </Box>

          <Box>
            <Text as={"span"} fontSize={"12px"} color={"blackAlpha.600"} marginBottom={"4px"}>
              Miscellaneous
            </Text>
            <Flex gap={"8px"} alignItems={"center"}>
              <TableContainer>
                <Table variant="simple" style={{ borderCollapse: "separate", borderSpacing: "0 12px" }}>
                  {projectDetails?.miscellaneous.map((misc) => (
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
                    </Tr>
                  ))}
                  <TableCaption fontSize={"12px"} textAlign={"left"} padding={0} margin={0}>
                    Total Amount :{" "}
                    <NumberFormat
                      value={projectDetails?.miscellaneous.reduce((a, b) => b.price + a, 0).toString()}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₦"}
                    />
                  </TableCaption>
                </Table>
              </TableContainer>
              <Button
                variant={"link"}
                color={"moneypoint-blue"}
                _focus={{ boxShadow: "none" }}
                height={"auto"}
                onClick={() => openModal("miscellaneous")}
              >
                {<FiEdit fontSize={"16px"} />}
              </Button>
            </Flex>
          </Box>

          <Box>
            <Text as={"span"} fontSize={"12px"} color={"blackAlpha.600"} marginBottom={"4px"}>
              Paid Amount
            </Text>
            <Flex gap={"8px"} alignItems={"center"}>
              <Text>
                <NumberFormat value={projectDetails?.paid_amount} displayType={"text"} thousandSeparator={true} prefix={"₦"} />
              </Text>
              <Button
                variant={"link"}
                color={"moneypoint-blue"}
                _focus={{ boxShadow: "none" }}
                height={"auto"}
                onClick={() => openModal("paid_amount")}
              >
                {<FiEdit fontSize={"16px"} />}
              </Button>
            </Flex>
          </Box>

          <Box>
            <Text as={"span"} fontSize={"12px"} color={"blackAlpha.600"} marginBottom={"4px"}>
              Images
            </Text>
            <Flex gap={"8px"} alignItems={"center"}>
              <Stack direction={"row"}>
                {projectDetails?.images.map((img, idx) => (
                  <Image objectFit={"cover"} boxSize={"200px"} src={img} key={idx} />
                ))}
              </Stack>
              <Button variant={"link"} color={"moneypoint-blue"} _focus={{ boxShadow: "none" }} height={"auto"} onClick={() => openModal("images")}>
                {<FiEdit fontSize={"16px"} />}
              </Button>
            </Flex>
          </Box>

          <Box>
            <Text as={"span"} fontSize={"12px"} color={"blackAlpha.600"} marginBottom={"4px"}>
              Reciepts
            </Text>
            <Flex gap={"8px"} alignItems={"center"}>
              <Stack direction={"row"}>
                {projectDetails?.receipt.map((img, idx) => (
                  <Image objectFit={"cover"} boxSize={"200px"} src={img} key={idx} />
                ))}
              </Stack>
              <Button variant={"link"} color={"moneypoint-blue"} _focus={{ boxShadow: "none" }} height={"auto"} onClick={() => openModal("receipt")}>
                {<FiEdit fontSize={"16px"} />}
              </Button>
            </Flex>
          </Box>
        </VStack>
      </Box>

      {/* Update Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Module</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UpdateProject name={updateName} projectDetails={projectDetails!} setProjectDetails={setProjectDetails} setModalOpen={setModalOpen} />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ViewSingleProject;
