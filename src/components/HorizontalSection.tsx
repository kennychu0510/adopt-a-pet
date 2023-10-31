'use client';
import { PetCardProps } from '@/types';
import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import PetCard from './PetCard';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import { useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import useIsSmallScreen from '@/hooks/useIsSmallScreen';

type Props = {
  header: string;
  subHeader: string;
  items: PetCardProps[];
  page: string;
};

const responsive = {
  desktop: {
    breakpoint: { max: 4000, min: 1420 },
    items: 5,
  },
  minDesktop: {
    breakpoint: {max: 1420, min: 1000},
    items: 4
  },
  bigTablet: {
    breakpoint: { max: 1000, min: 720 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 720, min: 500 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 500, min: 0 },
    items: 1,
  },
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
      <Carousel responsive={responsive} swipeable={true} >
        {props.items.map((category) => (
          <Box key={category.name} justifyContent={'center'} display={'flex'}>
            <PetCard image={category.image} name={category.name} key={category.name} />
          </Box>
        ))}
      </Carousel>
      {/* <Box position={'relative'}>
        {showButtons && (
          <IconButton aria-label='left-button' top={'50%'} left={'20px'} position={'absolute'} zIndex={2} transform={'translate(0%, -50%)'}>
            <BiLeftArrowAlt size='40px' />
          </IconButton>
        )}
        <Flex p={2} gap={5} sx={{ overflowX: 'hidden' }}>
          {props.items.map((category) => (
            <PetCard image={category.image} name={category.name} key={category.name} />
          ))}
        </Flex>
        {showButtons && (
          <IconButton aria-label='right-button' top={'50%'} right={'20px'} position={'absolute'} zIndex={2} transform={'translate(0%, -50%)'}>
            <BiRightArrowAlt size='40px' />
          </IconButton>
        )}
      </Box> */}
    </Box>
  );
}
