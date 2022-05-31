import { Box, Flex, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { IProject } from "../../../interface/project.interface";
import { projectService } from "../../../services/project.service";
import { RootState } from "../../../store";
import NumberFormat from "react-number-format";
import moment from "moment";
import CustomFormSelect from "../../../components/forms/FormGroup/CustomFormSelect";
import NigerianStates from "../../../utils/nigeria-state-and-lgas.json"

const ViewAllProjectsAdmin = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);
  const [selectedState, setSelectedState] = useState("")
  const [projects, setProjects] = useState<IProject[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<IProject[]>([]);
  const fetchAllProjects = () => {
    projectService
      .fetchAllProjects()
      .then((res) => {
        setProjects(res);
        setFilteredProjects(res)
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchAllProjects();
  }, []);

  const adminNavigateToProject = (id: string) => {
    navigate(`/project/admin/${id}`);
  };

  const sortProjects = (title: string) => {
    let sortedProjects = filteredProjects;
    switch (title) {
      case "title":
        sortedProjects = filteredProjects.sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1));
        setFilteredProjects([...sortedProjects]);
        break;
      case "project_description":
        sortedProjects = filteredProjects.sort((a, b) => (a.project_description.toLowerCase() > b.project_description.toLowerCase() ? 1 : -1));
        setFilteredProjects([...sortedProjects]);
        break;
      case "invoice":
        sortedProjects = filteredProjects.sort((a, b) => (a.receipt.length > 0 ? 1 : -1));
        setFilteredProjects([...sortedProjects]);
        break;
      case "total_amount":
        sortedProjects = filteredProjects.sort(
          (a, b) =>
            a.inventory.reduce((inva, invb) => invb.inventory.price * invb.amount + inva, 0) -
            b.inventory.reduce((inva, invb) => invb.inventory.price * invb.amount + inva, 0)
        );
        setFilteredProjects([...sortedProjects]);
        break;
      case "paid_amount":
        sortedProjects = filteredProjects.sort((a, b) => a.paid_amount - b.paid_amount);
        setFilteredProjects([...sortedProjects]);
        break;
      case "created_at":
        sortedProjects = filteredProjects.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
        setFilteredProjects([...sortedProjects]);
        break;
      case "status":
        sortedProjects = filteredProjects.sort((a, b) => (a.status > b.status ? 1 : -1));
        setFilteredProjects([...sortedProjects]);
        break;
      case "state":
        sortedProjects = filteredProjects.sort((a, b) => (a.state > b.state ? 1 : -1));
        setFilteredProjects([...sortedProjects]);
        break;

      default:
        break;
    }
  };

  const stateSelect = (name: string, value: string) => {
    if(value !== "") {
       setSelectedState(value)
      setFilteredProjects(projects.filter(project => project.state.toLowerCase() === value.toLowerCase()))
    }else {
      setSelectedState("")
      setFilteredProjects(projects)
    }
   
  }


  return (
    <Box paddingX={"120px"} overflowY={"auto"} paddingBottom={"40px"} paddingTop={"60px"}>
      <Flex marginBottom={"20px"} justifyContent= "space-between" width={"100%"}>
        <Flex alignItems={"center"} gap={"20px"}>
          <Text color={"blackAlpha.800"} fontWeight={"medium"}>
            Filter
          </Text>
        </Flex>
        <Box width={"240px"}>
        <CustomFormSelect
              name="state"
              data={NigerianStates.sort((a,b) => a.state.toLowerCase() > b.state.toLowerCase() ? 1: -1).map((state) => ({ name: state.state, value: state.state }))}
              onSelect={stateSelect}
              placeholder="Select State"
              required={false}
              value={selectedState}
              errMsg={null}
              onBlur={() => {}}
            />
          </Box>
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
              <Th fontSize={"10px"} fontWeight={"medium"} cursor={"pointer"} textTransform={"none"} onClick={() => sortProjects("state")}>
                State
              </Th>
              <Th fontSize={"10px"} fontWeight={"medium"} cursor={"pointer"} textTransform={"none"} onClick={() => sortProjects("created_at")}>
                Created At
              </Th>
              <Th fontSize={"10px"} fontWeight={"medium"} cursor={"pointer"} textTransform={"none"} onClick={() => sortProjects("status")}>
                Status
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredProjects.map((project) => (
              <Tr backgroundColor={"white"} cursor={"pointer "} borderRadius={"4px"} shadow={"sm"} onClick={() => adminNavigateToProject(project._id)}>
                <Td fontSize={"14px"}>
                  <Text maxW={"200px"} overflowX={"hidden"} textOverflow={"ellipsis"} title={project.title}>
                    {project.title}
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
                <Td fontSize={"14px"}>{project.state}</Td>
                <Td fontSize={"14px"}>{moment(project.createdAt).format("DD/MM/YYYY")}</Td>
                <Td fontSize={"14px"}>{project.status}</Td>
              </Tr>
            ))}
          </Tbody>
          <TableCaption>
            Total Cost :{" "}
            <NumberFormat
              value={filteredProjects
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
              value={filteredProjects.reduce((a, b) => b.paid_amount + a, 0).toString()}
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

export default ViewAllProjectsAdmin;
