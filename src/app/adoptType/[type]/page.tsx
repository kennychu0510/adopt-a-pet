import PetCard from '@/components/PetCard';
import PetSummary from '@/components/PetSummary';
import DetailPageLayout from '@/components/layouts/DetailPageLayout';
import supabase from '@/utils/supabase';
import { Badge, Center, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import _ from 'lodash';
import { getColorForAnimal } from '@/utils/helper';
import Link from 'next/link';

export default async function AdoptPage({ params: { type } }: { params: { type: string } }) {
  const { error, data } = type === 'all' ? await supabase.from('Adoption').select('*') : await supabase.from('Adoption').select('*').eq('type', type);
  const petTypes = _.uniqBy(data ?? [], 'type').map((item) => item.type);
  return (
    <DetailPageLayout error={error || !data}>
      <Center mb={2}>
        <Heading color={'blue.600'}>Adopt {type === 'all' ? 'a pet' : `a ${type}`}</Heading>
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
      <VStack>{data?.map((item) => <PetSummary {...item} key={item.id} />)}</VStack>
    </DetailPageLayout>
  );
}
