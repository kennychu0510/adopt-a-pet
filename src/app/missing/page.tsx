import ErrorPage from "@/components/ErrorPage";
import NoMissingPlaceholder from "@/components/placeholder/NoMissingPlaceholder";
import PetSummary from "@/components/PetSummary";
import DetailPageLayout from "@/components/layouts/DetailPageLayout";
import { getTimestampMinusOneWeek } from "@/utils/helper";
import supabase from "@/utils/supabase";
import { Center, Flex, Heading, Text, VStack } from "@chakra-ui/react";

export const revalidate = 0;
export default async function MissingPage() {
  const { error, data } = await supabase
    .from("Missing")
    .select("*")
    .gte("created_at", getTimestampMinusOneWeek())
    .order("created_at", { ascending: false })
    .is("show", true);
  if (!data) {
    return <ErrorPage />;
  }
  return (
    <DetailPageLayout error={error}>
      {data.length > 0 ? (
        <>
          <Center mb={2}>
            <Heading color={"blue.600"}>Missing Pets</Heading>
          </Center>
          <Text textAlign={"center"} color={"gray.500"}>
            Missing pets reported in the past week
          </Text>
          <Flex justify={"flex-end"}>
            <Text mr={1}>Total: </Text>
            <Text>{data?.length ?? 0}</Text>
          </Flex>
          <VStack>
            {data?.map((item) => (
              <PetSummary page="missing" {...item} key={item.id} />
            ))}
          </VStack>
        </>
      ) : (
        <NoMissingPlaceholder />
      )}
    </DetailPageLayout>
  );
}
