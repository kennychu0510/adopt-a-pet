"use client";

import Images from "@/assets";
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Textarea,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Image from "next/image";
import { BsPerson } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";

const PostTypes = [
  {
    heading: "Adoption",
    icon: Images.adopt,
    description: "Post a pet for adoption!",
  },
  {
    heading: "Missing",
    icon: Images.missing,
    description: "Report your missing pet!",
  },
];

export default function PostForm() {
  return (
    <Flex>
      <Box color="white" borderRadius="lg" p={4}>
        <Box p={4}>
          <Wrap spacing={5}>
            <WrapItem>
              <Box>
                <Heading color={"brand.blue"}>Make a Post</Heading>
                <Text my={3} color="black">
                  What post would you like to make?
                </Text>
                <VStack>
                  {PostTypes.map((type) => (
                    <PostType {...type} key={type.heading} />
                  ))}
                </VStack>
              </Box>
            </WrapItem>
            <WrapItem>
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
                      _hover={{}}
                    >
                      Send Message
                    </Button>
                  </VStack>
                </Box>
              </Box>
            </WrapItem>
          </Wrap>
        </Box>
      </Box>
    </Flex>
  );
}

const PostType = ({
  heading,
  description,
  icon,
}: {
  heading: string;
  description: string;
  icon: string;
}) => {
  return (
    <Card variant="outline" flexShrink={1} w={300}>
      <CardBody>
        <Flex alignItems={"center"}>
          <Image
            objectFit="cover"
            src={icon}
            alt="adoption"
            className="w-20 h-20 p-4 pl-0 object-contain"
          />
          <Box>
            <Heading size="md">{heading}</Heading>
            <Text py="2">{description}</Text>
          </Box>
        </Flex>
      </CardBody>
    </Card>
  );
};
