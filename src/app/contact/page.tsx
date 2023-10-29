import FormCard from '@/components/form/FormCard';
import { Box, Button, Center, FormControl, FormLabel, Heading, Input, InputGroup, InputLeftAddon, Textarea, VStack } from '@chakra-ui/react';
import { BsPerson } from 'react-icons/bs';
import { MdOutlineEmail } from 'react-icons/md';

export default function page() {
  return (
    <form>
      <FormCard>
        <Center>
          <Heading color={'blue.600'} mt={1}>
            Contact Us
          </Heading>
        </Center>
        <Box mt={2}>
          <VStack spacing={5}>
            <FormControl>
              <FormLabel>Your Name</FormLabel>
              <InputGroup borderColor='#E0E1E7'>
                <InputLeftAddon pointerEvents='none'>
                  <BsPerson color='gray.800' />
                </InputLeftAddon>
                <Input name='name' id='name' type='text' size='md' />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Contact</FormLabel>
              <InputGroup borderColor='#E0E1E7'>
                <InputLeftAddon pointerEvents='none'>
                  <MdOutlineEmail color='gray.800' />
                </InputLeftAddon>
                <Input name='contact' id='contact' type='text' size='md' placeholder='Phone or Email' />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Your Message</FormLabel>
              <Textarea
                name='message'
                id='message'
                borderColor='gray.300'
                _hover={{
                  borderRadius: 'gray.300',
                }}
              />
            </FormControl>
            <Button
              variant='solid'
              colorScheme='blue'
              color='white'
              _hover={{
                opacity: 0.6,
              }}
              type='submit'
            >
              Send
            </Button>
          </VStack>
        </Box>
      </FormCard>
    </form>
  );
}
