import AdminGuard from '@/components/admin/AdminGuard';
import Logout from '@/components/admin/Logout';
import PostManager from '@/components/admin/PostManager';
import services from '@/services';
import { Center, Heading, VStack } from '@chakra-ui/react';

export const revalidate = 0;

export default async function Page() {
  const [adoptionList, wishList, missingList, messages] = await Promise.all([
    services.getAdoptionListByType('all'),
    services.getWishListList(),
    services.getMissingList(),
    services.getContactUsList(),
  ]);

  return (
    <VStack minH={'80dvh'}>
      <Center>
        <AdminGuard />
        <VStack>
          <Heading color='orange.500' mb={2}>
            Manage Posts
          </Heading>
          <PostManager
            data={{
              adoptionList: adoptionList.data,
              wishList: wishList.data,
              missingList: missingList.data,
              messages: messages.data,
            }}
          />
        </VStack>
      </Center>
      <Center mt={'auto'} mb={4}>
        <Logout />
      </Center>
    </VStack>
  );
}
