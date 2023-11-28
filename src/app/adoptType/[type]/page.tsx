import PetSummary from '@/components/PetSummary';
import DetailPageLayout from '@/components/layouts/DetailPageLayout';
import supabase from '@/utils/supabase';
import { Badge, Center, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import _ from 'lodash';
import { getColorForAnimal } from '@/utils/helper';
import Link from 'next/link';
import ErrorPage from '@/components/ErrorPage';

export const revalidate = 0;
export default async function AdoptPage({
  params: { type },
}: {
  params: { type: string };
}) {
  const { error, data } =
    type === 'all'
      ? await supabase.from('Adoption').select('*')
      : await supabase.from('Adoption').select('*').eq('type', type);
  if (!data) {
    return <ErrorPage />;
  }
  const petTypes = _.uniqBy(data ?? [], 'type').map((item) => item.type);
  if (data.length === 0) {
    return (
      <DetailPageLayout error={error}>
        <Center mb={2}>
          <Heading color={'blue.600'} textAlign={'center'}>
            No {type === 'all' ? 'pet' : type} is up for adoption
          </Heading>
        </Center>
      </DetailPageLayout>
    );
  }
  return (
    <DetailPageLayout error={error}>
      <Center mb={2}>
        <Heading color={'blue.600'}>
          Adopt {type === 'all' ? 'a pet' : `a ${type}`}
        </Heading>
      </Center>
      <Flex gap={2}>
        {petTypes.map((item) => (
          <Link href={`/adoptType/${item}`} key={item}>
            <Badge p={2} borderRadius={5} colorScheme={getColorForAnimal(item)}>
              {item}
            </Badge>
          </Link>
        ))}
      </Flex>
      <Flex justify={'flex-end'}>
        <Text mr={1}>Total: </Text>
        <Text>{data?.length ?? 0}</Text>
      </Flex>
      <VStack>
        {data?.map((item) => (
          <PetSummary page='adopt' {...item} key={item.id} />
        ))}
      </VStack>
    </DetailPageLayout>
  );
}
