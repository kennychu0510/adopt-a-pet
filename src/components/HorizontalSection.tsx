'use client';
import { Box, ResponsiveValue, Text, useBreakpointValue } from '@chakra-ui/react';
import * as CSS from 'csstype';
import PetCard, { PetCardProps } from './PetCard';

type Props = {
  header: string;
  subHeader: string;
  items: PetCardProps[];
};

export default function HorizontalSection(props: Props) {
  const flexWrap = useBreakpointValue({ base: 'no-wrap', md: 'wrap' }, { ssr: false }) as ResponsiveValue<CSS.Property.FlexWrap>;
  return (
    <section className='mb-4'>
      <Text fontSize={'lg'} fontWeight={'bold'}>
        {props.header}
      </Text>
      <Text fontSize={'sm'} color={'grey'} mb={2}>
        {props.subHeader}
      </Text>
      <Box flexWrap={flexWrap} p={2} flexDirection={'row'} display={'flex'} gap={5}>
        {props.items.map((category) => (
          <PetCard key={category.name} {...category} />
        ))}
      </Box>
    </section>
  );
}
