import ErrorPage from '@/components/ErrorPage';
import PetImage from '@/components/PetImage';
import Row from '@/components/detail/Row';
import DetailPageLayout from '@/components/layouts/DetailPageLayout';
import services from '@/services';
import { emailSchema } from '@/utils/ZodSchema';
import { Button, Center, Heading, VStack } from '@chakra-ui/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import _ from 'lodash';
import Link from 'next/link';
import { MdEmail, MdLocalPhone, MdOutlineAccessTimeFilled, MdOutlineDescription, MdOutlinePets } from 'react-icons/md';

dayjs.extend(relativeTime);

export const revalidate = 0;
export default async function AdoptPage({ params: { id } }: { params: { id: string } }) {
  const { error, data } = await services.getAdoptionDetailById(id);

  if (!data) {
    return <ErrorPage />;
  }

  const detail = data!;

  const isEmail = emailSchema.safeParse(detail?.contact).success;

  const contactLink = isEmail ? `mailto:${detail?.contact}` : `tel:${detail?.contact}`;

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
