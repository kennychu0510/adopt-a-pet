import { PostgrestError } from "@supabase/supabase-js";
import React from "react";
import ErrorPage from "../ErrorPage";
import FormCard from "../form/FormCard";
import { Box, Center } from "@chakra-ui/react";

type Props = {
  error: any;
  children: React.ReactNode;
};

export default function DetailPageLayout(props: Props) {
  const { error, children } = props;
  if (error) {
    return <ErrorPage />;
  }
  return (
    <Center mt={4}>
      <Box maxW={500}>
        <FormCard>{children}</FormCard>
      </Box>
    </Center>
  );
}
