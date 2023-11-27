"use client"

import FormCard from '@/components/form/FormCard';
import { getBase64 } from '@/utils/helper';
import ToastifyConfig from '@/utils/toastify';
import { Box, Button, Center, FormControl, FormHelperText, FormLabel, Heading, Input, InputGroup, InputLeftAddon, Textarea, VStack } from '@chakra-ui/react';
import router from 'next/router';
import { type } from 'os';
import { FormEvent, useState } from 'react';
import { BsPerson } from 'react-icons/bs';
import { MdOutlineEmail } from 'react-icons/md';
import { toast } from 'react-toastify';

export default function page() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setLoading(true);
      const form = new FormData(event.target as any);

      // await handleFormSubmit(form);
      toast.success('Form posted successfully!', ToastifyConfig);
      setTimeout(() => {
        router.push('/');
      }, 1000);
    } catch (error) {
      toast.error('Failed to Post Form!', ToastifyConfig);
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit}>
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
                maxLength={500}
              />
              <FormHelperText>Max 500 characters</FormHelperText>
            </FormControl>
            <Button
              variant='solid'
              colorScheme='blue'
              color='white'
              _hover={{
                opacity: 0.6,
              }}
              type='submit'
              isLoading={loading}
            >
              Send
            </Button>
          </VStack>
        </Box>
      </FormCard>
    </form>
  );
}
