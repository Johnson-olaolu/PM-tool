import { Box, Center, Flex, HStack, Image, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const ProjectDashboard = () => {
  return (
    <>
      <Center className="moneypoint-blue-gradient" h={"full"} w={"full"}>
        <Box>
          <Text fontSize={"6xl"} color={"white"} fontWeight={"medium"} textAlign={"center"} marginBottom={16}>
            Project Dashbord
          </Text>
          <HStack gap={10}>
            <Link to={"/project/all"}>
              <Flex
                justify={"center"}
                direction={"column"}
                height={44}
                width={"72"}
                bg={"white"}
                borderRadius={8}
                gap={"10px"}
                cursor={"pointer"}
                shadow={"md"}
              >
                <Image src={require("../../assets/loginlogo.svg").default} h={16} />
                <Text fontSize={"sm"} color={"moneypoint-blue"} textAlign={"center"} fontWeight={"medium"}>
                  View Project
                </Text>
              </Flex>
            </Link>

            <Link to={"/project/create"}>
              <Flex
                justify={"center"}
                direction={"column"}
                height={44}
                width={"72"}
                bg={"white"}
                borderRadius={8}
                gap={"10px"}
                cursor={"pointer"}
                shadow={"md"}
              >
                <Image src={require("../../assets/loginlogo.svg").default} h={16} />
                <Text fontSize={"sm"} color={"moneypoint-blue"} textAlign={"center"} fontWeight={"medium"}>
                  Create Projects
                </Text>
              </Flex>
            </Link>
          </HStack>
        </Box>
      </Center>
    </>
  );
};

export default ProjectDashboard;
