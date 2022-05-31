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
  Text,
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

const ViewSingleProjectAdmin = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [projectDetails, setProjectDetails] = useState<IProject>();
  const { user } = useSelector((state: RootState) => state.user);
  const [approveModalOpn, setApproveModalOpn] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
          {/* <Box>
            <Text as={"span"} fontSize={"12px"} color={"blackAlpha.600"} marginBottom={"4px"}>
              Amount
            </Text>
            <Flex gap={"8px"} alignItems={"center"}>
              <Text>{projectDetails?.amount}</Text>
            </Flex>
          </Box> */}
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
