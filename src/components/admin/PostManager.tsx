"use client";
import { Database } from "@/utils/database.types";
import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import PetSummary from "../PetSummary";
import { FaTrashAlt } from "react-icons/fa";
import { onDeleteItem, onHideItem } from "@/ServerActions/formActions";
import { useFormState, useFormStatus } from "react-dom";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import ToastifyConfig from "@/utils/toastify";
import { AnimatePresence, motion } from "framer-motion";
import { getImageForPetType } from "@/utils/helper";
import useAdminToken from "@/hooks/useAdminToken";
import { useRouter } from "next/navigation";
import AdminGuard from "./AdminGuard";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const TabLabel = ["Adoption", "Missing", "Wish", "Messages"];
type Table = keyof Database["public"]["Tables"];

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

const AdminTokenContext = createContext<string | null>(null);

export default function PostManager(props: Props) {
  const { data } = props;
  const [adoptionList, setAdoptionList] = useState(data.adoptionList ?? []);
  const [missingList, setMissingList] = useState(data.missingList ?? []);
  const [wishList, setWishList] = useState(data.wishList ?? []);
  const { adminToken } = useAdminToken();

  return (
    <>
      <AdminGuard />
      <AdminTokenContext.Provider value={adminToken}>
        <Tabs colorScheme="orange">
          <TabList>
            {TabLabel.map((tab) => (
              <Tab key={tab}>{tab}</Tab>
            ))}
          </TabList>
          <TabPanels>
            <TabPanel>
              <DisplayItemWrapper
                list={adoptionList}
                setList={setAdoptionList}
                table="Adoption"
              />
            </TabPanel>
            <TabPanel>
              <DisplayItemWrapper
                list={missingList}
                setList={setMissingList}
                table="Missing"
              />
            </TabPanel>
            <TabPanel>
              <DisplayItemWrapper
                list={wishList.map((item) => ({
                  ...item,
                  petName: item.type,
                  image: getImageForPetType(item.type),
                }))}
                setList={setWishList}
                table="Wish"
              />
            </TabPanel>
            <TabPanel>
              <Flex justify={"flex-end"}>
                <Badge>Total: {data.messages?.length ?? 0}</Badge>
              </Flex>
              {data.messages?.map((message) => (
                <MessageDisplay {...message} key={message.id} />
              ))}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </AdminTokenContext.Provider>
    </>
  );
}

function DisplayItemWrapper({
  list,
  setList,
  table,
}: {
  list: ListItem[];
  setList: Dispatch<SetStateAction<Array<any>>>;
  table: Table;
}) {
  return (
    <>
      <Flex justify={"flex-end"}>
        <Badge>Total: {list.length}</Badge>
      </Flex>
      <AnimatePresence>
        {list?.map((item) => (
          <motion.div
            key={item.id}
            animate={{ x: 0, opacity: 1 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ ease: "easeOut", duration: 0.3 }}
          >
            <VStack key={item.id}>
              <DisplayItem detail={item} setList={setList} table={table} />
            </VStack>
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
}

function HideButton({ show }: { show: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button
      colorScheme={show ? "blackAlpha" : "gray"}
      type="submit"
      isLoading={pending}
    >
      {show ? "Hide" : "Unhide"}
    </Button>
  );
}

function DeleteButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      leftIcon={<FaTrashAlt />}
      colorScheme={"red"}
      isLoading={pending}
      type="submit"
    >
      Delete
    </Button>
  );
}

type ListItem = Database["public"]["Tables"]["Adoption"]["Row"];

function DisplayItem({
  detail,
  setList,
  table,
}: {
  detail: ListItem;
  setList: Dispatch<SetStateAction<Array<any>>>;
  table: Table;
}) {
  const [hideItemState, hideItemAction] = useFormState(onHideItem, null);
  const [deleteItemState, deleteItemAction] = useFormState(onDeleteItem, null);
  const adminToken = useContext(AdminTokenContext);
  const router = useRouter();
  useEffect(() => {
    if (hideItemState === null) return;
    if (hideItemState?.includes("success")) {
      setList(
        (list) =>
          list?.map((item) => {
            if (item.id === detail.id) {
              return {
                ...item,
                show: !item.show,
              };
            } else return item;
          }),
      );
      toast.success("Hide item success!", {
        ...ToastifyConfig,
        autoClose: 1000,
      });
    } else {
      if (hideItemState.includes("Credentials")) {
        toast.error("Credentials Expired, Login again!", ToastifyConfig);
        setTimeout(() => {
          router.replace("/admin");
        }, 2000);
      } else {
        toast.error(
          `Failed to ${detail.show ? "hide" : "unhide"} item!`,
          ToastifyConfig,
        );
      }
    }
  }, [hideItemState]);

  useEffect(() => {
    if (deleteItemState === null) return;
    if (deleteItemState?.includes("success")) {
      setList((list) => list.filter((item) => item.id !== detail.id));
      toast.success("Delete item success!", {
        ...ToastifyConfig,
        autoClose: 1000,
      });
    } else {
      if (deleteItemState.includes("Credentials")) {
        toast.error("Credentials Expired, Login again!", ToastifyConfig);
        setTimeout(() => {
          router.replace("/admin");
        }, 2000);
      } else {
        toast.error(`Failed to delete item!`, ToastifyConfig);
      }
    }
  }, [deleteItemState]);

  return (
    <PetSummary {...detail}>
      <Flex mt={4} justify={"space-between"}>
        <form action={hideItemAction}>
          <input type="hidden" name="id" value={detail.id} />
          <input type="hidden" name="table" value={table} />
          <input type="hidden" name="token" value={adminToken ?? ""} />
          <input
            type="hidden"
            name="show"
            value={JSON.stringify(detail.show)}
          />
          <HideButton show={detail.show} />
        </form>
        <form action={deleteItemAction}>
          <input type="hidden" name="id" value={detail.id} />
          <input type="hidden" name="token" value={adminToken ?? ""} />
          <input type="hidden" name="table" value={table} />
          <DeleteButton />
        </form>
      </Flex>
    </PetSummary>
  );
}

function MessageDisplay(props: Message) {
  return (
    <Card key={props.id} borderRadius={10} w={"100%"} my={5} p={4}>
      <VStack alignItems={"flex-start"}>
        <Text fontWeight={"bold"}>{props.name}</Text>
        <Text noOfLines={5}>{props.message}</Text>
        <Flex justify={"flex-end"} width={"100%"}>
          <Text color={"grey"}>{dayjs(props.created_at).fromNow()}</Text>
        </Flex>
      </VStack>
    </Card>
  );
}
