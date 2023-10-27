"use client";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  VStack
} from "@chakra-ui/react";
import { BsPerson } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";

export default function AdoptionForm() {
  return (
    <Box bg="white" borderRadius="lg">
      <Box m={8} color="#0B0E3F">
        <VStack spacing={5}>
          <FormControl id="name">
            <FormLabel>Your Name</FormLabel>
            <InputGroup borderColor="#E0E1E7">
              <InputLeftElement pointerEvents="none">
                <BsPerson color="gray.800" />
              </InputLeftElement>
              <Input type="text" size="md" />
            </InputGroup>
          </FormControl>
          <FormControl id="name">
            <FormLabel>Contact</FormLabel>
            <InputGroup borderColor="#E0E1E7">
              <InputLeftElement pointerEvents="none">
                <MdOutlineEmail color="gray.800" />
              </InputLeftElement>
              <Input type="text" size="md" />
            </InputGroup>
          </FormControl>
          <FormControl id="name">
            <FormLabel>Message</FormLabel>
            <Textarea
              borderColor="gray.300"
              _hover={{
                borderRadius: "gray.300",
              }}
              placeholder="message"
            />
          </FormControl>
          <Button
            style={{
              backgroundColor: "var(--chakra-colors-brand-blue)",
            }}
            variant="solid"
            bg="brand.blue"
            color="white"
            _hover={{
              opacity: 0.6,
            }}
          >
            Send Message
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};


