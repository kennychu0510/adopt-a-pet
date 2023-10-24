import PostForm from "@/components/PostForm";
import { Box, Center } from "@chakra-ui/react";

export default function adoption() {
  return (
    <main>
      <Box
        mt={4}
        mx={"auto"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <PostForm />
      </Box>
    </main>
  );
}
