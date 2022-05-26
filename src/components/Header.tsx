import { Box, Divider, Flex, HStack, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { authService } from "../services/auth.service";
import { RootState } from "../store";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);

  const handleLogout = () => {
    authService.logout();
    navigate("/");
  };
  return (
    <Box position={"relative"} zIndex={5} borderTop={" 4px solid"} borderColor={"moneypoint-blue"} bg={"white"} shadow={"md"} paddingX={"120px"}>
      <Flex height={"60px"} alignItems={"center"}>
        <Flex gap={"16px"} alignItems={"center"}>
          <Text fontSize={"sm"} color={"blackAlpha.800"}>
            <strong>Email:</strong> {user?.email}
          </Text>
          <Text fontSize={"sm"} color={"blackAlpha.800"}>
            <strong>State:</strong> {user?.state}
          </Text>
          <Text fontSize={"sm"} color={"blackAlpha.800"}>
            <strong>Position:</strong> {user?.user_type}
          </Text>
        </Flex>

        <Spacer />
        <Text alignItems={"center"} gap={"8px"} display={"flex"} fontSize={"sm"} color={"moneypoint-blue"}>
          Sign-out
          <FaSignOutAlt fontSize={"24px"} cursor={"pointer"} onClick={handleLogout} />
        </Text>
      </Flex>
    </Box>
  );
};

export default Header;
