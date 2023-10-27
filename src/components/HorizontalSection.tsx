'use client';
import {
  Box,
  ResponsiveValue,
  Text,
  useBreakpointValue,
  useMediaQuery,
} from '@chakra-ui/react';
import * as CSS from 'csstype';
import PetCard from './PetCard';
import { PetCardProps } from '@/types';
import { Grid, GridItem } from '@chakra-ui/react';

type Props = {
  header: string;
  subHeader: string;
  items: PetCardProps[];
};

export default function HorizontalSection(props: Props) {
  const [isLargeScreen] = useMediaQuery('(min-width: 35em)', {
    ssr: false,
  });
  return (
    <Box mb={'4'}>
      <Text fontSize={'lg'} fontWeight={'bold'}>
        {props.header}
      </Text>
      <Text fontSize={'sm'} color={'grey'} mb={2}>
        {props.subHeader}
      </Text>
      <Grid
        gridTemplateColumns={'repeat(auto-fit, 220px)'}
        flexWrap={'wrap'}
        alignContent={'center'}
        alignSelf={'center'}
        justifyContent={isLargeScreen ? 'normal' : 'center'}
        p={2}
        gap={5}
        sx={{ overflowX: 'auto' }}
        pb={8}
      >
        {props.items.map((category) => (
          <GridItem key={category.name} display={'flex'} justifyContent={'center'}>
            <PetCard image={category.image} name={category.name} />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}
