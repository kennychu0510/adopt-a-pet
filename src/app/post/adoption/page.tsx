'use client';

import Images from '@/assets';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import FormCard from '@/components/form/FormCard';
import UploadPhoto from '@/components/form/UploadPhoto';
import AnimalTypeInput from '@/components/form/input/AnimalTypeInput';
import ContactInput from '@/components/form/input/ContactInput';
import DescriptionInput from '@/components/form/input/DescriptionInput';
import NameInput from '@/components/form/input/NameInput';
import TextFieldInput from '@/components/form/input/TextFieldInput';
import useFormHelper from '@/hooks/useFormHelper';
import useFormSubmissionHelper from '@/hooks/useFormSubmissionHelper';
import { getBase64 } from '@/utils/helper';
import ToastifyConfig from '@/utils/toastify';
import { Box, Center, FormControl, FormErrorMessage, FormLabel, Heading, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import { MdOutlinePets } from 'react-icons/md';
import { toast } from 'react-toastify';
import { ZodError } from 'zod';

export default function Page() {
  const { handleFormSubmit } = useFormSubmissionHelper({ type: 'adoption' });
  const router = useRouter();
  const { loading, setLoading, type, setType, errors, setErrors, removeErrorOnChange, fileList, setFileList } = useFormHelper();

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
      toast.error('Please check your form!', ToastifyConfig);
      if (error instanceof ZodError) {
        setErrors(new Set(Object.keys(error.formErrors.fieldErrors)));
      }
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <FormCard>
        <Center flexDir={'column'}>
          <Image objectFit='cover' src={Images.adopt} alt='adoption' width={150} height={150} style={{ minWidth: 50 }} />
          <Heading color={'blue.600'} mt={1}>
            Adoption
          </Heading>
        </Center>
        <Box mt={2} color='#0B0E3F'>
          <VStack spacing={5}>
            <NameInput isInvalid={errors.has('name')} onChange={removeErrorOnChange('name')} />
            <ContactInput isInvalid={errors.has('contact')} onChange={removeErrorOnChange('contact')} />
            <AnimalTypeInput isInvalid={errors.has('type')} type={type} setType={setType} />
            <TextFieldInput
              isInvalid={errors.has('petName')}
              onChange={removeErrorOnChange('petName')}
              label='Pet Name'
              id='petName'
              errorMessage='Pet name is required'
              icon={<MdOutlinePets color='gray.800' />}
            />
            <DescriptionInput placeholder='Describe the pet you want people to adopt.' isInvalid={errors.has('description')} onChange={removeErrorOnChange('description')} />
            <FormControl isInvalid={errors.has('image')}>
              <FormLabel>Image</FormLabel>
              <UploadPhoto fileList={fileList} setFileList={setFileList} />
              <FormErrorMessage>Image of pet is required</FormErrorMessage>
            </FormControl>
            <PrimaryButton label='Submit' isLoading={loading} />
          </VStack>
        </Box>
      </FormCard>
    </form>
  );
}
