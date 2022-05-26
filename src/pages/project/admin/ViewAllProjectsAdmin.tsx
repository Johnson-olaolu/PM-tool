import { Box, Flex, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { IProject } from "../../../interface/project.interface";
import { projectService } from "../../../services/project.service";
import { RootState } from "../../../store";
import NumberFormat from "react-number-format";
import { FiChevronLeft } from "react-icons/fi";

const ViewAllProjects = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);
  const [projects, setProjects] = useState<IProject[]>([]);
  const fetchAllProjects = (state: string) => {
    projectService
      .fetchAllProjects(state)
      .then((res) => {
        setProjects(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchAllProjects(user?.state!);
  }, []);

  const navigateToProject = (id: string) => {
    navigate(`/project/${id}`);
  };

  return (
    <Box paddingX={"120px"} overflowY={"auto"} paddingBottom={"40px"} paddingTop={"60px"}>
      <Flex marginBottom={"20px"}>
        <Flex alignItems={"center"} gap={"20px"}>
          <FiChevronLeft
            style={{ cursor: "pointer" }}
            fontSize={"24px"}
            onClick={() => {
              navigate(`/project`);
            }}
          />
          <Text color={"blackAlpha.800"} fontWeight={"medium"}>
            {user?.state} State
          </Text>
        </Flex>
      </Flex>
      <TableContainer>
        <Table variant="simple" style={{ borderCollapse: "separate", borderSpacing: "0 12px" }}>
          <Thead>
            <Tr color={"blackAlpha.600"} fontWeight={"medium"} fontSize={"px"}>
              <Th fontSize={"10px"} fontWeight={"medium"} textTransform={"none"}>
                Title
              </Th>
              <Th fontSize={"10px"} fontWeight={"medium"} textTransform={"none"}>
                Product Description
              </Th>
              <Th fontSize={"10px"} fontWeight={"medium"} textTransform={"none"}>
                Vendor
              </Th>
              <Th fontSize={"10px"} fontWeight={"medium"} textTransform={"none"}>
                Invoice
              </Th>
              <Th fontSize={"10px"} fontWeight={"medium"} textTransform={"none"}>
                Amount
              </Th>
              <Th fontSize={"10px"} fontWeight={"medium"} textTransform={"none"}>
                Status
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {projects
              .sort((a, b) => (a.title < b.title ? -1 : 1))
              .map((project) => (
                <Tr backgroundColor={"white"} cursor={"pointer "} borderRadius={"4px"} shadow={"sm"} onClick={() => navigateToProject(project._id)}>
                  <Td fontSize={"14px"} >
                    <Text maxW={"200px"} overflowX={"hidden"} textOverflow={"ellipsis"} title={project.title}>{project.title}</Text>
                  </Td>
                  <Td fontSize={"14px"}>
                    <Text maxW={"400px"} overflowX={"hidden"} textOverflow={"ellipsis"} title={project.project_description}>
                      {project.project_description}
                    </Text>
                  </Td>
                  <Td fontSize={"14px"}>{project.vendor}</Td>
                  <Td fontSize={"14px"}>{project.receipt.length > 0 ? "Uploaded" : ""}</Td>
                  <Td fontSize={"14px"}>
                    <NumberFormat value={project.amount} displayType={"text"} thousandSeparator={true} prefix={"₦"} />
                  </Td>
                  <Td fontSize={"14px"}>{project.status}</Td>
                </Tr>
              ))}
          </Tbody>
          <TableCaption>
            Total Amount :{" "}
            <NumberFormat value={projects.reduce((a, b) => b.amount + a, 0).toString() } displayType={"text"} thousandSeparator={true} prefix={"₦"} />
          </TableCaption>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ViewAllProjects;