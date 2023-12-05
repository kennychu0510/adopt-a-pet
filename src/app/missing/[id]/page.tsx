import PetImage from "@/components/PetImage";
import DetailPageLayout from "@/components/layouts/DetailPageLayout";
import supabase from "@/utils/supabase";
import { Center, VStack, Heading, Button, Text } from "@chakra-ui/react";
import PageError from "@/components/ErrorPage";
import Row from "@/components/detail/Row";
import dayjs from "dayjs";
import _ from "lodash";
import {
  MdOutlinePets,
  MdOutlineDescription,
  MdOutlineAccessTimeFilled,
  MdEmail,
  MdLocalPhone,
} from "react-icons/md";
import relativeTime from "dayjs/plugin/relativeTime";
import { emailSchema } from "@/utils/ZodSchema";
import Link from "next/link";
import ClientMap from "@/components/ClientMap";
import { IoLocationSharp } from "react-icons/io5";

export const revalidate = 0;

dayjs.extend(relativeTime);

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const { error, data } = await supabase
    .from("Missing")
    .select("*")
    .eq("id", id)
    .is("show", true)
    .single();

  if (!data) {
    return <PageError />;
  }

  const isEmail = emailSchema.safeParse(data?.contact).success;

  const contactLink = isEmail
    ? `mailto:${data?.contact}`
    : `tel:${data?.contact}`;

  return (
    <DetailPageLayout error={error ?? !data}>
      <Center>
        <VStack mb={2}>
          <PetImage image={data.image!} />
          <Heading color={"red.600"} textAlign={"center"}>
            {data?.petName} is Missing!
          </Heading>
        </VStack>
      </Center>
      <Row
        icon={<MdOutlinePets color="gray.800" />}
        content={_.capitalize(data.type)}
      />
      <Row
        icon={<MdOutlineDescription color="gray.800" />}
        content={data.description}
      />
      <Row
        icon={<MdOutlineAccessTimeFilled color="gray.800" />}
        content={"Last seen " + dayjs(data.lastSeen).fromNow()}
      />
      <Row
        icon={
          isEmail ? (
            <MdEmail color="gray.800" />
          ) : (
            <MdLocalPhone color="gray.800" />
          )
        }
        content={data.contact}
      />
      <Row icon={<IoLocationSharp />} content={"Last Seen Location"} />
      <ClientMap latLng={[data.lat, data.lng]} />
      <Text my={2} fontWeight={"bold"}>
        If you have seen {data.petName}, please contact {data.name}!
      </Text>
      <Center mt={4}>
        <Link href={contactLink}>
          <Button
            leftIcon={
              isEmail ? (
                <MdEmail color="gray.800" />
              ) : (
                <MdLocalPhone color="gray.800" />
              )
            }
            colorScheme="blue"
          >
            Contact Owner
          </Button>
        </Link>
      </Center>
    </DetailPageLayout>
  );
}
