import {
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { FiEdit, FiChevronsLeft, FiChevronLeft } from "react-icons/fi";
import { IProject } from "../../interface/project.interface";
import { projectService } from "../../services/project.service";
import UpdateProject from "./components/UpdateProject";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const ViewSingleProject = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [projectDetails, setProjectDetails] = useState<IProject>();
  const { user } = useSelector((state: RootState) => state.user);
  const [updateName, setUpdateName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

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

  useEffect(() => {
    if (user?.user_type === "State-Coordinator") {
      setIsOwner(true);
    }
    if (user?.user_type) {
      setIsAdmin(true);
    }
  }, [user]);

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
              {isOwner && (
                <Button
                  variant={"link"}
                  color={"moneypoint-blue"}
                  _focus={{ boxShadow: "none" }}
                  height={"auto"}
                  onClick={() => openModal("project_description")}
                >
                  {<FiEdit fontSize={"16px"} />}
                </Button>
              )}
            </Flex>
          </Box>
          <Box>
            <Text as={"span"} fontSize={"12px"} color={"blackAlpha.600"} marginBottom={"4px"}>
              Amount
            </Text>
            <Flex gap={"8px"} alignItems={"center"}>
              <Text>{projectDetails?.amount}</Text>
              {isOwner && (
                <Button variant={"link"} color={"moneypoint-blue"} _focus={{ boxShadow: "none" }} height={"auto"} onClick={() => openModal("amount")}>
                  {<FiEdit fontSize={"16px"} />}
                </Button>
              )}
            </Flex>
          </Box>
          <Box>
            <Text as={"span"} fontSize={"12px"} color={"blackAlpha.600"} marginBottom={"4px"}>
              Project Type
            </Text>
            <Flex gap={"8px"} alignItems={"center"}>
              <Text>{projectDetails?.project_type}</Text>
              {isOwner && (
                <Button
                  variant={"link"}
                  color={"moneypoint-blue"}
                  _focus={{ boxShadow: "none" }}
                  height={"auto"}
                  onClick={() => openModal("project_type")}
                >
                  {<FiEdit fontSize={"16px"} />}
                </Button>
              )}
            </Flex>
          </Box>
          <Box>
            <Text as={"span"} fontSize={"12px"} color={"blackAlpha.600"} marginBottom={"4px"}>
              Renovation Category
            </Text>
            <Flex gap={"8px"} alignItems={"center"}>
              <Text>{projectDetails?.renovation_category}</Text>
              {isOwner && (
                <Button
                  variant={"link"}
                  color={"moneypoint-blue"}
                  _focus={{ boxShadow: "none" }}
                  height={"auto"}
                  onClick={() => openModal("renovation_category")}
                >
                  {<FiEdit fontSize={"16px"} />}
                </Button>
              )}
            </Flex>
          </Box>
          <Box>
            <Text as={"span"} fontSize={"12px"} color={"blackAlpha.600"} marginBottom={"4px"}>
              Office Area for Renovation
            </Text>
            <Flex gap={"8px"} alignItems={"center"}>
              <Text>{projectDetails?.office_area_for_renovation}</Text>
              {isOwner && (
                <Button
                  variant={"link"}
                  color={"moneypoint-blue"}
                  _focus={{ boxShadow: "none" }}
                  height={"auto"}
                  onClick={() => openModal("office_area_for_renovation")}
                >
                  {<FiEdit fontSize={"16px"} />}
                </Button>
              )}
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
              {isOwner && (
                <Button variant={"link"} color={"moneypoint-blue"} _focus={{ boxShadow: "none" }} height={"auto"} onClick={() => openModal("images")}>
                  {<FiEdit fontSize={"16px"} />}
                </Button>
              )}
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
              {isOwner && (
                <Button
                  variant={"link"}
                  color={"moneypoint-blue"}
                  _focus={{ boxShadow: "none" }}
                  height={"auto"}
                  onClick={() => openModal("receipt")}
                >
                  {<FiEdit fontSize={"16px"} />}
                </Button>
              )}
            </Flex>
          </Box>
          {isAdmin && (
            <Flex paddingTop={"40px"} gap={"40px"}>
               <Button
                padding={"12px 40px"}
                color={"white"}
                bg={"moneypoint-red"}
                fontSize={"sm"}
                colorScheme={"moneypoint-red"}
              >
                Reject
              </Button>
              <Button
                padding={"12px 40px"}
                color={"white"}
                bg={"moneypoint-blue"}
                fontSize={"sm"}
                colorScheme={"moneypoint-blue"}
              >
               Approve
              </Button>
            </Flex>
          )}
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
