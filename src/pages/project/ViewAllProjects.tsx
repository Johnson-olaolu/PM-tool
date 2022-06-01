import { Box, Flex, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { IProject } from "../../interface/project.interface";
import { projectService } from "../../services/project.service";
import { RootState } from "../../store";
import NumberFormat from "react-number-format";
import { FiChevronLeft } from "react-icons/fi";
import moment from "moment";

const ViewAllProjects = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [sortDetails, setSortDetails] = useState({
    ascending: false,
    title: "",
  });
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
  }, [user]);

  const navigateToProject = (id: string) => {
    navigate(`/project/${id}`);
  };

  const sortProjects = (title: string) => {
    let sortedProjects = projects;
    switch (title) {
      case "title":
        sortedProjects = projects.sort((a, b) => (a.title.title.toLowerCase() > b.title.title.toLowerCase() ? 1 : -1));
        setProjects([...sortedProjects]);
        break;
      case "project_description":
        sortedProjects = projects.sort((a, b) => (a.project_description.toLowerCase() > b.project_description.toLowerCase() ? 1 : -1));
        setProjects([...sortedProjects]);
        break;
      case "invoice":
        sortedProjects = projects.sort((a, b) => (a.receipt.length > 0 ? 1 : -1));
        setProjects([...sortedProjects]);
        break;
      case "total_amount":
        sortedProjects = projects.sort(
          (a, b) =>
            a.inventory.reduce((inva, invb) => invb.inventory.price * invb.amount + inva, 0) -
            b.inventory.reduce((inva, invb) => invb.inventory.price * invb.amount + inva, 0)
        );
        setProjects([...sortedProjects]);
        break;
      case "paid_amount":
        sortedProjects = projects.sort((a, b) => a.paid_amount - b.paid_amount);
        setProjects([...sortedProjects]);
        break;
      case "start_date":
        sortedProjects = projects.sort((a, b) => a.start_date.getTime() - b.start_date.getTime());
        setProjects([...sortedProjects]);
        break;
      case "status":
        sortedProjects = projects.sort((a, b) => (a.status > b.status ? 1 : -1));
        setProjects([...sortedProjects]);
        break;

      default:
        break;
    }
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
              <Th
                fontSize={"10px"}
                fontWeight={"medium"}
                textTransform={"none"}
                cursor={"pointer"}
                onClick={() => {
                  sortProjects("title");
                }}
              >
                Title
              </Th>
              <Th
                fontSize={"10px"}
                fontWeight={"medium"}
                textTransform={"none"}
                cursor={"pointer"}
                onClick={() => sortProjects("project_description")}
              >
                Project Description
              </Th>
              <Th fontSize={"10px"} fontWeight={"medium"} cursor={"pointer"} textTransform={"none"} onClick={() => sortProjects("invoice")}>
                Invoice
              </Th>
              <Th fontSize={"10px"} fontWeight={"medium"} cursor={"pointer"} textTransform={"none"} onClick={() => sortProjects("total_amount")}>
                Total Amount
              </Th>
              <Th fontSize={"10px"} fontWeight={"medium"} cursor={"pointer"} textTransform={"none"} onClick={() => sortProjects("paid_amount")}>
                Paid Amount
              </Th>
              <Th fontSize={"10px"} fontWeight={"medium"} cursor={"pointer"} textTransform={"none"} onClick={() => sortProjects("start_date")}>
                 Start Date
              </Th>
              <Th fontSize={"10px"} fontWeight={"medium"} cursor={"pointer"} textTransform={"none"} onClick={() => sortProjects("status")}>
                Status
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {projects.map((project) => (
              <Tr backgroundColor={"white"} cursor={"pointer "} borderRadius={"4px"} shadow={"sm"} onClick={() => navigateToProject(project._id)}>
                <Td fontSize={"14px"}>
                  <Text maxW={"200px"} overflowX={"hidden"} textOverflow={"ellipsis"} title={project.title.title}>
                    {project.title.title}
                  </Text>
                </Td>
                <Td fontSize={"14px"}>
                  <Text maxW={"400px"} overflowX={"hidden"} textOverflow={"ellipsis"} title={project.project_description}>
                    {project.project_description}
                  </Text>
                </Td>
                <Td>
                {project.receipt.length > 0 ? "Uploaded" : "Not-uploaded"}
                </Td>
                <Td fontSize={"14px"}>
                  <NumberFormat
                    value={
                      project.inventory.reduce((ainv, binv) => binv.inventory.price * binv.amount + ainv, 0) +
                      project.miscellaneous.reduce((amisc, bmisc) => bmisc.price + amisc, 0)
                    }
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₦"}
                  />
                </Td>
                <Td fontSize={"14px"}>{project.paid_amount}</Td>
                <Td fontSize={"14px"}>{moment(project.start_date).format("DD/MM/YYYY")}</Td>
                <Td fontSize={"14px"}>{project.status}</Td>
              </Tr>
            ))}
          </Tbody>
          <TableCaption>
            Total Cost :{" "}
            <NumberFormat
              value={projects
                .reduce(
                  (a, b) =>
                    b.inventory.reduce((ainv, binv) => binv.inventory.price * binv.amount + ainv, 0) +
                    b.miscellaneous.reduce((amisc, bmisc) => bmisc.price + amisc, 0) +
                    a,
                  0
                )
                .toString()}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₦"}
            />
            <br />
            Total Paid :{" "}
            <NumberFormat
              value={projects.reduce((a, b) => b.paid_amount + a, 0).toString()}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₦"}
            />
          </TableCaption>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ViewAllProjects;
