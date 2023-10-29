'use client';
import useIsLargeScreen from '@/hooks/useIsLargeScreen';
import { PetCardProps } from '@/types';
import { Box, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import PetCard from './PetCard';

type Props = {
  header: string;
  subHeader: string;
  items: PetCardProps[];
};

export default function HorizontalSection(props: Props) {
  return (
    <Box mb={'4'}>
      <Text fontSize={'lg'} fontWeight={'bold'}>
        {props.header}
      </Text>
      <Text fontSize={'sm'} color={'grey'} mb={2}>
        {props.subHeader}
      </Text>
      <Flex p={2} gap={5} sx={{ overflowX: 'auto' }}>
        {props.items.map((category) => (
          <PetCard image={category.image} name={category.name} key={category.name} />
        ))}
      </Flex>
    </Box>
  );
}
