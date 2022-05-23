import { Box, Divider, Flex, HStack, Spacer, Text } from '@chakra-ui/react'
import React from 'react'

const Header = () => {
  return (
    <Box position={"relative"} zIndex={5} borderTop={" 4px solid"} borderColor ={"moneypoint-blue"} bg ={"white"} shadow ={"md"} paddingX ={"120px"}>
        <Flex  height={"60px"} alignItems = {"center"}>
                <Text fontSize={"sm"} color ={"blackAlpha.800"}> <strong>State:</strong> Lagos</Text>
                <Spacer/>
                <Text fontSize={"sm"} color ={"blackAlpha.800"}><strong>Address:</strong>  Allen Avenue, Ikeja</Text>
        </Flex>
    </Box>
  )
}

export default Header