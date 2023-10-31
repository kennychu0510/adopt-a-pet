'use client';

import { submitAdoptionForm } from '@/app/serverActions/formSubmission';
import Images from '@/assets';
import useIsLargeScreen from '@/hooks/useIsLargeScreen';
import { Box, Button, Card, Center, FormControl, FormHelperText, FormLabel, Heading, Input, InputGroup, InputLeftAddon, InputLeftElement, Textarea, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import { useState } from 'react';
import { BsPerson } from 'react-icons/bs';
import { MdOutlineEmail } from 'react-icons/md';
import AnimalTypeDropdown from './AnimalTypeDropdown';
import UploadPhoto from './UploadPhoto';
import FormCard from './FormCard';
import PrimaryButton from '../buttons/PrimaryButton';

export default function AdoptionForm() {
  const [type, setType] = useState('');

  function onSubmit(form: FormData) {
    form.append('type', type);
    submitAdoptionForm(form);
  }

  return (
    <form action={onSubmit}>
      <FormCard>
        <Center flexDir={'column'}>
          <Image objectFit='cover' src={Images.adopt} alt='adoption' width={150} height={150} style={{ minWidth: 50 }} />
          <Heading color={'blue.600'} mt={1}>
            Adoption
          </Heading>
        </Center>
        <Box mt={2} color='#0B0E3F'>
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
                maxLength={500}
              />
              <FormHelperText>Max 500</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Image</FormLabel>
              <UploadPhoto />
            </FormControl>
            <PrimaryButton label='Submit'/>
          </VStack>
        </Box>
      </FormCard>
    </form>
  );
}
