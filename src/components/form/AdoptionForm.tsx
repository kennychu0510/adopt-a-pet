'use client';

import { submitAdoptionForm } from '@/app/serverActions/formSubmission';
import Images from '@/assets';
import {
  Box,
  Button,
  Card,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  VStack,
  useMediaQuery
} from '@chakra-ui/react';
import Image from 'next/image';
import { useState } from 'react';
import { BsPerson } from 'react-icons/bs';
import { MdOutlineEmail } from 'react-icons/md';
import AnimalTypeDropdown from './AnimalTypeDropdown';
import useIsLargeScreen from '@/hooks/useIsLargeScreen';

export default function AdoptionForm() {
  const isLargeScreen = useIsLargeScreen()
  const minWidth = isLargeScreen ? 500 : 300;
  const [type, setType] = useState('');

  function onSubmit(form: FormData) {
    form.append('type', type)
    submitAdoptionForm(form);
  }

  return (
    <form action={onSubmit}>
      <Card bg='white' borderRadius='lg' minW={minWidth} p={8}>
        <Center flexDir={'column'}>
          <Image
            objectFit='cover'
            src={Images.adopt}
            alt='adoption'
            width={150}
            height={150}
            style={{ minWidth: 50 }}
          />
          <Heading color={'blue.600'} mt={1}>
            Adoption
          </Heading>
        </Center>
        <Box mt={2} color='#0B0E3F'>
          <VStack spacing={5}>
            <FormControl>
              <FormLabel>Your Name</FormLabel>
              <InputGroup borderColor='#E0E1E7'>
                <InputLeftElement pointerEvents='none'>
                  <BsPerson color='gray.800' />
                </InputLeftElement>
                <Input name='name' id='name' type='text' size='md' />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Contact</FormLabel>
              <InputGroup borderColor='#E0E1E7'>
                <InputLeftElement pointerEvents='none'>
                  <MdOutlineEmail color='gray.800' />
                </InputLeftElement>
                <Input
                  name='contact'
                  id='contact'
                  type='text'
                  size='md'
                  placeholder='Phone or Email'
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Type</FormLabel>
              <AnimalTypeDropdown type={type} setType={setType} />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                name='description'
                id='description'
                borderColor='gray.300'
                _hover={{
                  borderRadius: 'gray.300',
                }}
                placeholder='Describe the pet you are putting up for adoption'
              />
            </FormControl>
            <FormControl>
              <FormLabel>Image</FormLabel>
              <Textarea
                name='description'
                id='description'
                borderColor='gray.300'
                _hover={{
                  borderRadius: 'gray.300',
                }}
                placeholder='Describe the pet you are putting up for adoption'
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
              Submit
            </Button>
          </VStack>
        </Box>
      </Card>
    </form>
  );
}
