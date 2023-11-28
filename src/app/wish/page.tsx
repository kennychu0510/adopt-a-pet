import ErrorPage from "@/components/ErrorPage";
import PetSummary from "@/components/PetSummary";
import DetailPageLayout from "@/components/layouts/DetailPageLayout";
import NoWishListPlaceholder from "@/components/placeholder/NoWishListPlaceholder";
import { getImageForPetType, getTimestampMinusOneWeek } from "@/utils/helper";
import supabase from "@/utils/supabase";
import { Center, Flex, Heading, Text, VStack } from "@chakra-ui/react";

export const revalidate = 0;
export default async function WishListPage({
  params: { type },
}: {
  params: { type: string };
}) {
  const { error, data } = !!type
    ? await supabase
        .from("Wish")
        .select("*")
        .eq("type", type)
        .gte("created_at", getTimestampMinusOneWeek())
        .order("created_at", { ascending: false })
    : await supabase
        .from("Wish")
        .select("*")
        .gte("created_at", getTimestampMinusOneWeek())
        .order("created_at", { ascending: false });

  if (!data) {
    return <ErrorPage />;
  }
  return (
    <DetailPageLayout error={error}>
      {data.length > 0 ? (
        <>
          <Center mb={2}>
            <Heading color={"blue.600"}>Wish List</Heading>
          </Center>
          <Text textAlign={"center"} color={"gray.500"}>
            Pets the community want to adopt
          </Text>
          <Flex justify={"flex-end"}>
            <Text mr={1}>Total: </Text>
            <Text>{data?.length ?? 0}</Text>
          </Flex>
          <VStack>
            {data?.map((item) => (
              <PetSummary
                page="wish"
                {...item}
                key={item.id}
                petName=""
                image={getImageForPetType(item.type)}
              />
            ))}
          </VStack>
        </>
      ) : (
        <NoWishListPlaceholder />
      )}
    </DetailPageLayout>
  );
}
