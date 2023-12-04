import {
  getAdoption,
  getMessages,
  getMissing,
  getWishes,
} from "@/app/api/admin/supabase";
import AdminGuard from "@/components/admin/AdminGuard";
import Logout from "@/components/admin/Logout";
import PostManager from "@/components/admin/PostManager";
import { Box, Button, Center, Heading, VStack } from "@chakra-ui/react";

export default async function Page() {
  const [adoptionList, wishList, missingList, messages] = await Promise.all([
    getAdoption(),
    getWishes(),
    getMissing(),
    getMessages(),
  ]);

  return (
    <VStack h={"80dvh"}>
      <Center>
        <AdminGuard />
        <VStack>
          <Heading color="orange.500" mb={2}>
            Manage Posts
          </Heading>
          <PostManager
            data={{
              adoptionList,
              wishList,
              missingList,
              messages,
            }}
          />
        </VStack>
      </Center>
      <Center mt={"auto"}>
        <Logout />
      </Center>
    </VStack>
  );
}
