'use client';

import { Login } from '@/ServerActions/login';
import { ADMIN_TOKEN } from '@/constants';
import ToastifyConfig from '@/utils/toastify';
import { Button, Input, InputGroup, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { toast } from 'react-toastify';

const initialState = {
  message: null,
};

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button type='submit' colorScheme='blue' aria-disabled={pending} isLoading={pending}>
      Login
    </Button>
  );
}

export function LoginForm() {
  const [state, formAction] = useFormState(Login, initialState);
  const router = useRouter()
  useEffect(() => {
    if (state.success) {
      console.log(state.message);
      localStorage.setItem(ADMIN_TOKEN, state.message);
      toast.success('Login Success!', ToastifyConfig)
      setTimeout(() => {
        location.replace('/')
      }, 2000)
    } else {
      toast.error(state.message, ToastifyConfig);
    }
  }, [state]);
  return (
    <form action={formAction}>
      <VStack gap={4}>
        <InputGroup size='md'>
          <Input name='username' type={'text'} placeholder='Enter Username' />
        </InputGroup>
        <InputGroup size='md'>
          <Input name='password' type={'password'} placeholder='Enter password' />
        </InputGroup>
        <LoginButton />
      </VStack>
    </form>
  );
}
