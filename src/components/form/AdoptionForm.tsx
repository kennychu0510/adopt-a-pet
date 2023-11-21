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
import { UploadFile } from 'antd';
import { getBase64 } from '@/utils/helper';
import useSwr from 'swr'
import { postForm } from '@/utils/swr';

export default function AdoptionForm() {
  const [type, setType] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  // const { error, isLoading, mutate } = useSwr('/api/form', postForm, {
  //   onErrorRetry: (error, key) => {
  //     if (key === '/api/form') return
  //   }
  // })

  async function onSubmit(form: FormData) {
    if (fileList[0] && fileList[0]?.originFileObj) {
      const base64Image = await getBase64(fileList[0]?.originFileObj)
      form.append('image', base64Image)
    }
    form.append('type', type);
    const submittedForm = {
      name: form.get('name'),
      contact: form.get('contact'),
      description: form.get('description'),
      type: form.get('type'),
      image: form.get('image') ?? undefined,
    }
    console.log(submittedForm)
    const submissionResult = await fetch('/api/form?type=adoption', {
      method: 'POST',
      body: JSON.stringify(submittedForm)
    })
    const result = await submissionResult.json();
    console.log({result})
    // submitAdoptionForm(form);
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
              <UploadPhoto 
                fileList={fileList}
                setFileList={setFileList}
              />
            </FormControl>
            <PrimaryButton label='Submit'/>
          </VStack>
        </Box>
      </FormCard>
    </form>
  );
}
