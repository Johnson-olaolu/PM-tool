import { Box, Divider, Flex, HStack, Spacer, Text } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Header = () => {
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <Box position={"relative"} zIndex={5} borderTop={" 4px solid"} borderColor ={"moneypoint-blue"} bg ={"white"} shadow ={"md"} paddingX ={"120px"}>
        <Flex  height={"60px"} alignItems = {"center"}>
                <Text fontSize={"sm"} color ={"blackAlpha.800"}> <strong>Email:</strong> {user?.email}</Text>
                <Spacer/>
                <Text fontSize={"sm"} color ={"blackAlpha.800"}><strong>State:</strong> {user?.state}</Text>
        </Flex>
    </Box>
  )
}

export default Header