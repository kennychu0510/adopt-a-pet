"use client";

import Images from "@/assets";
import useBetterMediaQuery from "@/hooks/useBetterMediaQuery";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Flex,
  Heading,
  Radio,
  RadioGroup,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Image from "next/legacy/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

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

export default function Page() {
  const [formType, setFormType] = useState<string>("adoption");
  const pathName = usePathname();

  return (
    <Flex>
      <Card color="white" borderRadius="lg" p={8} boxShadow={"xl"}>
        <Wrap spacing={5}>
          <WrapItem>
            <Box>
              <Heading color={"blue.600"}>Make a Post</Heading>
              <Text my={3} color="black">
                What post would you like to make?
              </Text>
              <RadioGroup onChange={setFormType} value={formType}>
                <VStack gap={5}>
                  {PostTypes.map((type) => (
                    <PostType {...type} key={type.heading} />
                  ))}
                </VStack>
              </RadioGroup>
            </Box>
          </WrapItem>
        </Wrap>
        <ButtonGroup justifyContent={"center"} mt={8}>
          <Link href={pathName + `/${formType}`}>
            <Button mx={"auto"} colorScheme="blue">
              Next
            </Button>
          </Link>
        </ButtonGroup>
      </Card>
    </Flex>
  );
}

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
  const isLargeScreen = useBetterMediaQuery("(min-width: 35em)");
  const minWidth = isLargeScreen ? 500 : 200;

  return (
    <Card variant="outline" w={"100%"} minWidth={minWidth}>
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
                style={{ minWidth: 50 }}
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
