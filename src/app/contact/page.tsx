'use client';

import PrimaryButton from '@/components/buttons/PrimaryButton';
import FormCard from '@/components/form/FormCard';
import ContactInput from '@/components/form/input/ContactInput';
import DescriptionInput from '@/components/form/input/DescriptionInput';
import NameInput from '@/components/form/input/NameInput';
import useFormHelper from '@/hooks/useFormHelper';
import useFormSubmissionHelper from '@/hooks/useFormSubmissionHelper';
import ToastifyConfig from '@/utils/toastify';
import { Box, Center, Heading, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import { toast } from 'react-toastify';
import { ZodError } from 'zod';

export default function Page() {
  const { loading, setLoading, type, setType, errors, setErrors, removeErrorOnChange, fileList, setFileList } = useFormHelper();
  const { handleFormSubmit } = useFormSubmissionHelper({ type: "contact" });
  const router = useRouter()

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setLoading(true);
      const form = new FormData(event.target as any);
      await handleFormSubmit(form);
      toast.success('Message sent successfully!', ToastifyConfig);
      setTimeout(() => {
        router.push('/');
      }, 1000);
    } catch (error) {
      toast.error('Failed to Post Form!', ToastifyConfig);
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
        <Center>
          <Heading color={'blue.600'} mt={1}>
            Contact Us
          </Heading>
        </Center>
        <Box mt={2}>
          <VStack spacing={5}>
            <NameInput isInvalid={errors.has('name')} onChange={removeErrorOnChange('name')} />
            <ContactInput isInvalid={errors.has('contact')} onChange={removeErrorOnChange('contact')} />
            <DescriptionInput label={'Your Message'} isInvalid={errors.has('message')} onChange={removeErrorOnChange('message')} />
            <PrimaryButton label='Send' isLoading={loading} />
          </VStack>
        </Box>
      </FormCard>
    </form>
  );
}
