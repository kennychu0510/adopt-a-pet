'use client';
import { PetCardProps } from '@/types';
import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import PetCard from './PetCard';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import { useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import useIsSmallScreen from '@/hooks/useIsSmallScreen';
import Link from 'next/link';
import LoadingPage from './LoadingPage';
import Images from '@/assets';

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
    breakpoint: { max: 1420, min: 1000 },
    items: 4,
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

const noAdoption: PetCardProps = {
  id: 'no pets',
  link: '/',
  name: 'No pets for adoption right now!',
  image: Images.noAdoption,
};

const noMissingPet: PetCardProps = {
  id: 'no missing',
  link: '/',
  name: 'All pets are safe!',
  image: Images.noMissing,
};

const noWishList: PetCardProps = {
  id: 'no wish list',
  link: '/',
  name: 'No wishes this week!',
  image: Images.noWish,
};

export default function HorizontalSection(props: Props) {
  function getEmptyPlaceholder() {
    switch (props.page) {
      case 'adopt':
        return [noAdoption];
      case 'missing':
        return [noMissingPet];
      case 'wish':
        return [noWishList]
      default:
        return;
    }
  }
  return (
    <Box mb={'4'}>
      <Text fontSize={'lg'} fontWeight={'bold'}>
        {props.header}
      </Text>
      <Text fontSize={'sm'} color={'grey'} mb={2}>
        {props.subHeader}
      </Text>
      <Box minH={212} mt={4}>
        <Carousel responsive={responsive} swipeable={true}>
          {(props.items.length > 0 ? props.items : getEmptyPlaceholder() ?? []).map((item) => (
            <Box key={item.name} justifyContent={'center'} display={'flex'}>
              <Link href={item.link}>
                <PetCard {...item}/>
              </Link>
            </Box>
          ))}
        </Carousel>
      </Box>
    </Box>
  );
}
