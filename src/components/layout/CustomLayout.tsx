import { Box, Divider, Flex, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router";
import Header from "../Header";

const CustomLayout = () => {
  return (
    <>
      <Flex height={"100vh"} w={"100%"} direction={"column"} bg={"moneypoint-light-blue"}>
        <Header/>
        <Outlet />
      </Flex>
    </>
  );
};

export default CustomLayout;
