import ErrorPage from '@/components/ErrorPage';
import NoMissingPlaceholder from '@/components/NoMissingPlaceholder';
import PetSummary from '@/components/PetSummary';
import DetailPageLayout from '@/components/layouts/DetailPageLayout';
import { getTimestampMinusOneWeek } from '@/utils/helper';
import supabase from '@/utils/supabase';
import { Center, Flex, Heading, Text, VStack } from '@chakra-ui/react';

export default async function WishListPage({ params: { type } }: { params: { type: string } }) {
  const { error, data } = !!type
    ? await supabase.from('Wish').select('*').eq('type', type).gte('created_at', getTimestampMinusOneWeek()).order('created_at', { ascending: false })
    : await supabase.from('Wish').select('*').gte('created_at', getTimestampMinusOneWeek()).order('created_at', { ascending: false });

  if (!data) {
    return <ErrorPage />;
  }
  return (
    <DetailPageLayout error={error}>
      {data.length > 0 ? (
        <>
          <Center mb={2}>
            <Heading color={'blue.600'}>Wish List</Heading>
          </Center>
          <Text textAlign={'center'} color={'gray.500'}>
            Pets the community want to adopt
          </Text>
          <Flex justify={'flex-end'}>
            <Text mr={1}>Total: </Text>
            <Text>{data?.length ?? 0}</Text>
          </Flex>
          <VStack>{data?.map((item) => <PetSummary {...item} key={item.id} petName='' image={getImageForPetType(item.type)} />)}</VStack>
        </>
      ) : (
        <NoMissingPlaceholder />
      )}
    </DetailPageLayout>
  );
}

function getImageForPetType(type: string) {
  switch (type) {
    case 'cat':
      return '/assets/cat.png';
    case 'parrot':
      return '/assets/parrot.png';
    case 'rabbit':
      return '/assets/rabbit.png';
    case 'turtle':
      return '/assets/turtle.png';
    default:
      return '/assets/dog.png';
  }
}
