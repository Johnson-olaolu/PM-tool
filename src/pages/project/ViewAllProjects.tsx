import { Box, Flex, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { IProject } from "../../interface/project.interface";
import { projectService } from "../../services/project.service";
import { RootState } from "../../store";
import NumberFormat from "react-number-format";

const ViewAllProjects = () => {
  const navigate = useNavigate()
  const { user } = useSelector((state: RootState) => state.user);
  const [projects, setProjects] = useState<IProject[]>([]);
  const fetchAllProjects = (state : string) => {
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

  const navigateToProject = (id : string) => {
    navigate(`/project/${id}`)
  }

  return (
    <Box paddingX={"120px"} overflowY={"auto"} paddingBottom={"40px"} paddingTop={"60px"}>
      <Flex marginBottom={"40px"}>
        <Text color={"blackAlpha.800"} fontWeight={"medium"}>
          {user?.state} Projects
        </Text>
      </Flex>
      <TableContainer>
        <Table variant="simple" style={{ borderCollapse: "separate", borderSpacing: "0 12px" }}>
          <Thead>
            <Tr color={"blackAlpha.600"} fontWeight={"medium"} fontSize={"px"}>
              <Th fontSize={"10px"} fontWeight={"medium"} textTransform={"none"}>
                Title
              </Th>
              <Th fontSize={"10px"} fontWeight={"medium"} textTransform={"none"}>
                Category
              </Th>
              <Th fontSize={"10px"} fontWeight={"medium"} textTransform={"none"}>
                Office area
              </Th>
              <Th fontSize={"10px"} fontWeight={"medium"} textTransform={"none"}>
                More Information
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
            {projects.map((project) => (
              <Tr backgroundColor={"white"} cursor={"pointer "} borderRadius={"4px"} shadow={"sm"} onClick ={() => navigateToProject(project._id)}>
                <Td fontSize={"14px"}>{project.title}</Td>
                <Td fontSize={"14px"}>{project.project_type}</Td>
                <Td fontSize={"14px"}>{project.office_area_for_renovation}</Td>
                <Td fontSize={"14px"}>{project.renovation_category}</Td>
                <Td fontSize={"14px"}>{project.receipt.length > 0 ? "Uploaded" : ""}</Td>
                <Td fontSize={"14px"}>
                <NumberFormat value={project.amount} displayType={"text"} thousandSeparator={true} prefix={"₦"} />
                </Td>
                <Td fontSize={"14px"}>{project.status}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ViewAllProjects;
