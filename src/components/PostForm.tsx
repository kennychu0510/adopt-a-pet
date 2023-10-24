"use client";

import Images from "@/assets";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Radio,
  RadioGroup,
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
    id: "adoption",
    heading: "Adoption",
    icon: Images.adopt,
    description: "Post a pet for adoption!",
  },
  {
    id: "missing",
    heading: "Missing",
    icon: Images.missing,
    description: "Report your missing pet!",
  },
  {
    id: "wish",
    heading: "Wish",
    icon: Images.wish,
    description: "Share your dream pet!",
  },
];

export default function PostForm() {
  return (
    <Flex>
      <Card color="white" borderRadius="lg" p={8} boxShadow={"xl"}>
        <Wrap spacing={5}>
          <WrapItem>
            <Box>
              <Heading color={"brand.blue"}>Make a Post</Heading>
              <Text my={3} color="black">
                What post would you like to make?
              </Text>
              <RadioGroup defaultValue="adoption">
                <VStack gap={5}>
                  {PostTypes.map((type) => (
                    <PostType {...type} key={type.heading} />
                  ))}
                </VStack>
              </RadioGroup>
            </Box>
          </WrapItem>
        </Wrap>
        <ButtonGroup justifyContent={"space-between"} mt={8}>
          <Button mx={"auto"} colorScheme="blue">
            Next
          </Button>
        </ButtonGroup>
      </Card>
    </Flex>
  );
}

const AdoptionForm = () => {
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

const PostType = ({
  id,
  heading,
  description,
  icon,
}: {
  id: string;
  heading: string;
  description: string;
  icon: string;
}) => {
  return (
    <Card variant="outline" w={"100%"} minWidth={500}>
      <CardBody>
        <Radio value={id}>
          <Flex alignItems={"center"}>
            <Box p={4}>
              <Image
                objectFit="cover"
                src={icon}
                alt="adoption"
                width={60}
                height={60}
              />
            </Box>
            <Box>
              <Heading size="md">{heading}</Heading>
              <Text color={"grey"} py="2">
                {description}
              </Text>
            </Box>
          </Flex>
        </Radio>
      </CardBody>
    </Card>
  );
};
