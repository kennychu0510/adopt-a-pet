import PostFormType from "@/components/form/FormType";
import { Box } from "@chakra-ui/react";

export default function Page() {
  return (
    <main>
      <Box
        mt={4}
        mx={"auto"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <PostFormType />
      </Box>
    </main>
  );
}
