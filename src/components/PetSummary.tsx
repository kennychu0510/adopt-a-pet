'use client';

import { Card, Flex, VStack } from '@chakra-ui/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { motion } from 'framer-motion';
import _ from 'lodash';
import Image from 'next/legacy/image';
import Link from 'next/link';
import React from 'react';
import { IoMdPricetag } from 'react-icons/io';
import { MdOutlineAccessTimeFilled, MdOutlinePets } from 'react-icons/md';
import { Item } from './admin/PostManager';
import Row from './detail/Row';

dayjs.extend(relativeTime);

type Props = Item & {
  page?: 'adopt' | 'missing' | 'wish';
  children?: React.ReactNode;
};

export default function PetSummary(props: Props) {
  return (
    <Card borderRadius={10} w={'100%'} my={5} p={4} _hover={{ backgroundColor: '#EDF2F7' }}>
      <Link href={`/${props.page}/${props.id}`} style={{ width: '100%' }}>
        <motion.div initial={{ opacity: props.show ? 1 : 0.4 }} animate={{ opacity: props.show ? 1 : 0.4 }}>
          <Flex justify={'space-between'}>
            <VStack justifyContent={props.petName ? 'space-between' : 'space-around'} flexShrink={1} mr={2}>
              {props.petName && <Row icon={<IoMdPricetag color='gray.800' />} content={props.petName} my={0} />}
              <Row icon={<MdOutlinePets color='gray.800' />} content={_.capitalize(props.type)} my={0} />
              <Row icon={<MdOutlineAccessTimeFilled color='gray.800' />} content={dayjs(props.created_at).fromNow()} my={0} />
            </VStack>
            <Image
              src={props.image!}
              alt={props.petName}
              width={150}
              height={150}
              objectFit='cover'
              style={{
                borderRadius: 10,
                marginTop: 'auto',
                marginBottom: 'auto',
              }}
            />
          </Flex>
        </motion.div>
      </Link>
      {props.children}
    </Card>
  );
}
