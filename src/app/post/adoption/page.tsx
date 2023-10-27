import Form from "@/components/form/AdoptionForm";
import { Box } from "@chakra-ui/react";

export default function AdoptionForm() {
  return (
    <main>
      <Box
        mt={4}
        mx={"auto"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Form />
      </Box>
    </main>
  );
}
