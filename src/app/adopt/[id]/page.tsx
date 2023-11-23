import ErrorPage from '@/components/ErrorPage';
import PetCard from '@/components/PetCard';
import PetImage from '@/components/PetImage';
import Row from '@/components/detail/Row';
import FormCard from '@/components/form/FormCard';
import DetailPageLayout from '@/components/layouts/DetailPageLayout';
import supabase from '@/utils/supabase';
import { Box, Button, Center, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import { MdOutlinePets, MdOutlineDescription, MdEmail, MdLocalPhone } from 'react-icons/md';
import { MdOutlineAccessTimeFilled } from 'react-icons/md';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import _ from 'lodash';
import z from 'zod';
import { emailSchema } from '@/utils/ZodSchema';
import Link from 'next/link';

dayjs.extend(relativeTime);

export default async function AdoptPage({ params: { id } }: { params: { id: string } }) {
  const { error, data } = await supabase.from('Adoption').select('*').eq('id', id).limit(1).single();
  const detail = data!;

  const isEmail = emailSchema.safeParse(detail.contact).success;

  const contactLink = isEmail ? `mailto:${detail.contact}` : `tel:${detail.contact}`;

  return (
    <DetailPageLayout error={error}>
      <Center>
        <VStack mb={2}>
          <PetImage image={detail.image!} />
          <Heading color={'blue.600'}>{data?.petName}</Heading>
        </VStack>
      </Center>
      <Row icon={<MdOutlinePets color='gray.800' />} content={_.capitalize(detail.type)} />
      <Row icon={<MdOutlineDescription color='gray.800' />} content={detail.description} />
      <Row icon={<MdOutlineAccessTimeFilled color='gray.800' />} content={'Posted ' + dayjs(detail.created_at).fromNow()} />
      <Row icon={isEmail ? <MdEmail color='gray.800' /> : <MdLocalPhone color='gray.800' />} content={detail.contact} />
      <Center mt={4}>
        <Link href={contactLink}>
          <Button leftIcon={isEmail ? <MdEmail color='gray.800' /> : <MdLocalPhone color='gray.800' />} colorScheme='blue'>
            Contact Now
          </Button>
        </Link>
      </Center>
    </DetailPageLayout>
  );
}
