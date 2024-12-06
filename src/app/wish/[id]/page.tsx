import PageError from '@/components/ErrorPage';
import PetImage from '@/components/PetImage';
import Row from '@/components/detail/Row';
import DetailPageLayout from '@/components/layouts/DetailPageLayout';
import services from '@/services';
import { emailSchema } from '@/utils/ZodSchema';
import { getImageForPetType } from '@/utils/helper';
import { Button, Center, Heading, Text, VStack } from '@chakra-ui/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Link from 'next/link';
import { MdEmail, MdLocalPhone, MdOutlineAccessTimeFilled, MdOutlineDescription } from 'react-icons/md';

export const revalidate = 0;

dayjs.extend(relativeTime);

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const { error, data } = await services.getWishDetailById(id);

  if (!data) {
    return <PageError />;
  }

  const isEmail = emailSchema.safeParse(data?.contact).success;

  const contactLink = isEmail ? `mailto:${data?.contact}` : `tel:${data?.contact}`;

  return (
    <DetailPageLayout error={error ?? !data}>
      <Center>
        <VStack mb={2}>
          <PetImage image={getImageForPetType(data.type)} />
          <Heading color={'blue.600'} textAlign={'center'}>
            {data.name} wants to adopt a {data.type}!
          </Heading>
        </VStack>
      </Center>
      <Row icon={<MdOutlineDescription color='gray.800' />} content={data.description} />
      <Row icon={<MdOutlineAccessTimeFilled color='gray.800' />} content={'Posted ' + dayjs(data.created_at).fromNow()} />
      <Row icon={isEmail ? <MdEmail color='gray.800' /> : <MdLocalPhone color='gray.800' />} content={data.contact} />
      <Text my={2} fontWeight={'bold'}>
        If you have a {data.type} and would like {data.name} to adopt, please contact the them!
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
