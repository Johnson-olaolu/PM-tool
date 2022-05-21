import { Box, Center, Flex, HStack, Image, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      <Center className="moneypoint-blue-gradient" h={"100vh"} w={"full"}>
        <Box>
          <Image src={require("../../assets/monypointlogo.svg").default} margin={"auto"} marginBottom={"10"} />
          <Text fontSize={"2xl"} color={"white"} fontWeight={"medium"} textAlign={"center"} marginBottom={16}>
            Log Into your account as
          </Text>
          <HStack gap={10}>
            <Link to={"/auth/login"}>
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
                  As an Admin
                </Text>
              </Flex>
            </Link>

            <Link to={"#"}>
              {" "}
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
                  As State Cordinator
                </Text>
              </Flex>
            </Link>
          </HStack>
        </Box>
      </Center>
    </>
  );
};

export default LandingPage;
