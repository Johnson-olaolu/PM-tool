import {
  Box,
  Button,
  Flex,
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
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { FiChevronLeft } from "react-icons/fi";
import { IProject } from "../../../interface/project.interface";
import { projectService } from "../../../services/project.service";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import ApproveProject from "./components/ApproveProject";
import RejectProject from "./components/RejectProject";
import NumberFormat from "react-number-format";

const ViewSingleProjectAdmin = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [projectDetails, setProjectDetails] = useState<IProject>();
  const { user } = useSelector((state: RootState) => state.user);
  const [approveModalOpn, setApproveModalOpn] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast()
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

  const approveProject = () => {
    setIsLoading(true);
    projectService
      .approveProject(projectId!)
      .then((res) => {
        setIsLoading(false);
        toast({
          title: 'Project Approved.',
          description: "You have approved this project",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        navigate("/project/admin/all");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const rejectProject = (comment: string) => {
    projectService
      .rejectProject(projectId!, comment)
      .then((res) => {
        toast({
          title: 'Project Reject',
          description: "You have rejected this project",
          status: 'warning',
          duration: 9000,
          isClosable: true,
        })
        navigate("/project/admin/all");
      })
      .catch((err) => {
        console.error(err);
      });
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
            </Flex>
          </Box>

          <Box>
            <Text as={"span"} fontSize={"12px"} color={"blackAlpha.600"} marginBottom={"4px"}>
              Project Type
            </Text>
            <Flex gap={"8px"} alignItems={"center"}>
              <Text>{projectDetails?.project_type}</Text>
            </Flex>
          </Box>

          <Box>
            <Text as={"span"} fontSize={"12px"} color={"blackAlpha.600"} marginBottom={"4px"}>
              Renovation Category
            </Text>
            <Flex gap={"8px"} alignItems={"center"}>
              <Text>{projectDetails?.renovation_category}</Text>
            </Flex>
          </Box>

          <Box>
            <Text as={"span"} fontSize={"12px"} color={"blackAlpha.600"} marginBottom={"4px"}>
              Office Area for Renovation
            </Text>
            <Flex gap={"8px"} alignItems={"center"}>
              <Text>{projectDetails?.office_area_for_renovation}</Text>
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
            </Flex>
          </Box>


          <Flex paddingTop={"40px"} gap={"40px"}>
            <Button
              padding={"12px 40px"}
              color={"white"}
              bg={"moneypoint-red"}
              fontSize={"sm"}
              colorScheme={"red"}
              onClick={() => setRejectModalOpen(true)}
            >
              Reject
            </Button>
            <Button
              padding={"12px 40px"}
              color={"white"}
              bg={"moneypoint-blue"}
              fontSize={"sm"}
              colorScheme={"moneypoint-blue"}
              onClick={() => setApproveModalOpn(true)}
            >
              Approve
            </Button>
          </Flex>
        </VStack>
      </Box>

      {/* Approve Modal */}
      <Modal
        isOpen={approveModalOpn}
        onClose={() => {
          setApproveModalOpn(false);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Approve project {projectDetails?.title}</Text>
          </ModalBody>
          <ModalFooter>
            <Flex justifyContent={"space-between"} width={"100%"}>
              <Button
                padding={"12px"}
                color={"white"}
                bg={"moneypoint-blue"}
                fontSize={"sm"}
                colorScheme={"moneypoint-blue"}
                onClick={approveProject}
                isLoading={isLoading}
              >
                Approve Project
              </Button>
              <Button colorScheme="red" variant="ghost" fontSize={"sm"} onClick={() => setApproveModalOpn(false)}>
                Cancel
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Reject Modal */}
      <Modal
        isOpen={rejectModalOpen}
        onClose={() => {
          setRejectModalOpen(false);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reject Project {projectDetails?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RejectProject rejectProject={rejectProject} closeModal={() => setRejectModalOpen(false)} />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ViewSingleProjectAdmin;
