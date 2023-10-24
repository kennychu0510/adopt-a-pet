import PostForm from "@/components/PostForm";
import { Center, Text } from "@chakra-ui/react";

export default function adoption() {
  return (
    <main>
      <Center
        m={-4}
        width={"100vw"}
        height={"calc(100dvh - 100px)"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <PostForm />
      </Center>
    </main>
  );
}
