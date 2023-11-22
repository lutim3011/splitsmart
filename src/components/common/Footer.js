"use client";

import {
  Box,
  Center,
  Container,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { CURRENT_YEAR } from "commons/const";

export default function SmallWithLogoMiddle() {
  return (
    <Center>
      <Box
        bg={useColorModeValue("gray.50", "gray.900")}
        color={useColorModeValue("gray.700", "gray.200")}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Text>© {CURRENT_YEAR} SmartSplit. All rights reserved</Text>
        </Container>
      </Box>
    </Center>
  );
}
