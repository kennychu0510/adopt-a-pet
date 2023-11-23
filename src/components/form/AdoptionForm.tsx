'use client';

import Images from '@/assets';
import { getBase64 } from '@/utils/helper';
import {
  Box,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { UploadFile } from 'antd';
import { MdOutlinePets } from "react-icons/md";
import Image from 'next/image';
import { FormEvent, useState } from 'react';
import { BsPerson } from 'react-icons/bs';
import { MdOutlineEmail } from 'react-icons/md';
import { toast } from 'react-toastify';
import PrimaryButton from '../buttons/PrimaryButton';
import AnimalTypeDropdown from './AnimalTypeDropdown';
import FormCard from './FormCard';
import UploadPhoto from './UploadPhoto';
import useFormSubmissionHelper from '@/hooks/useFormSubmissionHelper';
import ToastifyConfig from '@/utils/toastify';
import { useRouter } from 'next/navigation';

export default function AdoptionForm() {
  const [type, setType] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { handleFormSubmit } = useFormSubmissionHelper({ type: 'adoption' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setLoading(true);
      const form = new FormData(event.target as any);
      if (fileList[0] && fileList[0]?.originFileObj) {
        const base64Image = await getBase64(fileList[0]?.originFileObj);
        form.append('image', base64Image);
      }
      form.append('type', type);
      await handleFormSubmit(form);
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
              <FormLabel>Pet Name</FormLabel>
              <InputGroup borderColor='#E0E1E7'>
                <InputLeftAddon pointerEvents='none'>
                  <MdOutlinePets color='gray.800' />
                </InputLeftAddon>
                <Input name='petName' id='petName' type='text' size='md' />
              </InputGroup>
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
              <UploadPhoto fileList={fileList} setFileList={setFileList} />
            </FormControl>
            <PrimaryButton label='Submit' isLoading={loading} />
          </VStack>
        </Box>
      </FormCard>
    </form>
  );
}
