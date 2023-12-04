import { LoginForm } from "@/components/form/LoginForm";
import { Card, CardBody, Center, Heading, VStack } from "@chakra-ui/react";

export const revalidate = 0;

export default function Page() {
  return (
    <Center h={"80dvh"}>
      <VStack>
        <Heading color="blue.600" mb={2}>
          Admin Login
        </Heading>
        <Card>
          <CardBody>
            <LoginForm />
          </CardBody>
        </Card>
      </VStack>
    </Center>
  );
}
