"use client";
import { Database } from "@/utils/database.types";
import {
  Box,
  Button,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react";
import PetSummary from "../PetSummary";
import { FaTrashAlt } from "react-icons/fa";

const TabLabel = ["Adoption", "Wish", "Missing", "Messages"];

type Adoption = Database["public"]["Tables"]["Adoption"]["Row"];
type Missing = Database["public"]["Tables"]["Missing"]["Row"];
type Wish = Database["public"]["Tables"]["Wish"]["Row"];
type Message = Database["public"]["Tables"]["Contact Us"]["Row"];

type Props = {
  data: {
    adoptionList: Adoption[] | null;
    missingList: Missing[] | null;
    wishList: Wish[] | null;
    messages: Message[] | null;
  };
};

export default function PostManager(props: Props) {
  const {
    data: { adoptionList, messages, missingList, wishList },
  } = props;
  return (
    <Tabs colorScheme="orange">
      <TabList>
        {TabLabel.map((tab) => (
          <Tab key={tab}>{tab}</Tab>
        ))}
      </TabList>
      <TabPanels>
        <TabPanel>
          {adoptionList?.map((item) => (
            <VStack key={item.id}>
              <PetSummary {...item}>
                <Flex mt={4} justify={"space-between"}>
                  <Button colorScheme="blackAlpha">Hide</Button>
                  <Button leftIcon={<FaTrashAlt />} colorScheme={"red"}>
                    Delete
                  </Button>
                </Flex>
              </PetSummary>
            </VStack>
          ))}
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
        <TabPanel>
          <p>three!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
