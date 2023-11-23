import { Database } from '@/utils/database.types';
import { Box, Button, Card, Flex, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import Row from './detail/Row';
import _ from 'lodash';
import { MdOutlineAccessTimeFilled, MdOutlinePets } from 'react-icons/md';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { IoMdPricetag } from 'react-icons/io';
import Link from 'next/link';

dayjs.extend(relativeTime);

type Props = Database['public']['Tables']['Adoption']['Row'];

export default function PetSummary(props: Props) {
  return (
    <Link href={`/adopt/${props.id}`} style={{ width: '100%' }}>
      <Card borderRadius={10} w={'100%'} my={5} p={4}  _hover={{'backgroundColor': '#EDF2F7'}}>
        <Flex justify={'space-between'}>
          <VStack justifyContent={'space-between'} flexShrink={1}>
            <Row icon={<IoMdPricetag color='gray.800' />} content={props.petName} my={0}/>
            <Row icon={<MdOutlinePets color='gray.800' />} content={_.capitalize(props.type)} my={0}/>
            <Row icon={<MdOutlineAccessTimeFilled color='gray.800' />} content={'Posted ' + dayjs(props.created_at).fromNow()} my={0}/>
          </VStack>
          <Image src={props.image!} alt={props.petName} width={150} height={150} style={{ borderRadius: 10, objectFit: 'cover', height: 150, marginTop: 'auto', marginBottom: 'auto'}} />
        </Flex>
      </Card>
    </Link>
  );
}
