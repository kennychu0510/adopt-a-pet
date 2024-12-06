import ClientMap from '@/components/ClientMap';
import PageError from '@/components/ErrorPage';
import PetImage from '@/components/PetImage';
import Row from '@/components/detail/Row';
import DetailPageLayout from '@/components/layouts/DetailPageLayout';
import services from '@/services';
import { emailSchema } from '@/utils/ZodSchema';
import { Button, Center, Heading, Text, VStack } from '@chakra-ui/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import _ from 'lodash';
import Link from 'next/link';
import { IoLocationSharp } from 'react-icons/io5';
import { MdEmail, MdLocalPhone, MdOutlineAccessTimeFilled, MdOutlineDescription, MdOutlinePets } from 'react-icons/md';

export const revalidate = 0;

dayjs.extend(relativeTime);

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const { error, data } = await services.getMissingDetailById(id);
  if (!data) {
    return <PageError />;
  }

  const isEmail = emailSchema.safeParse(data?.contact).success;

  const contactLink = isEmail ? `mailto:${data?.contact}` : `tel:${data?.contact}`;

  return (
    <DetailPageLayout error={error ?? !data}>
      <Center>
        <VStack mb={2}>
          <PetImage image={data.image!} />
          <Heading color={'red.600'} textAlign={'center'}>
            {data?.petName} is Missing!
          </Heading>
        </VStack>
      </Center>
      <Row icon={<MdOutlinePets color='gray.800' />} content={_.capitalize(data.type)} />
      <Row icon={<MdOutlineDescription color='gray.800' />} content={data.description} />
      <Row icon={<MdOutlineAccessTimeFilled color='gray.800' />} content={'Last seen ' + dayjs(data.lastSeen).fromNow()} />
      <Row icon={isEmail ? <MdEmail color='gray.800' /> : <MdLocalPhone color='gray.800' />} content={data.contact} />
      <Row icon={<IoLocationSharp />} content={'Last Seen Location'} />
      <ClientMap latLng={[data.lat, data.lng]} />
      <Text my={2} fontWeight={'bold'}>
        If you have seen {data.petName}, please contact {data.name}!
      </Text>
      <Center mt={4}>
        <Link href={contactLink}>
          <Button leftIcon={isEmail ? <MdEmail color='gray.800' /> : <MdLocalPhone color='gray.800' />} colorScheme='blue'>
            Contact Owner
          </Button>
        </Link>
      </Center>
    </DetailPageLayout>
  );
}
