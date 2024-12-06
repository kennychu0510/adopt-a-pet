import ErrorPage from '@/components/ErrorPage';
import PetSummary from '@/components/PetSummary';
import DetailPageLayout from '@/components/layouts/DetailPageLayout';
import NoMissingPlaceholder from '@/components/placeholder/NoMissingPlaceholder';
import services from '@/services';
import { Center, Flex, Heading, Text, VStack } from '@chakra-ui/react';

export const revalidate = 0;
export default async function MissingPage() {
  const { error, data } = await services.getMissingList();
  if (!data) {
    return <ErrorPage />;
  }
  return (
    <DetailPageLayout error={error}>
      {data.length > 0 ? (
        <>
          <Center mb={2}>
            <Heading color={'red.600'}>Missing Pets</Heading>
          </Center>
          <Text textAlign={'center'} color={'gray.500'}>
            Missing pets reported in the past week
          </Text>
          <Flex justify={'flex-end'}>
            <Text mr={1}>Total: </Text>
            <Text>{data?.length ?? 0}</Text>
          </Flex>
          <VStack>{data?.map((item) => <PetSummary page='missing' {...item} key={item.id} />)}</VStack>
        </>
      ) : (
        <NoMissingPlaceholder />
      )}
    </DetailPageLayout>
  );
}
