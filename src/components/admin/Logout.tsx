'use client';

import { ADMIN_TOKEN } from '@/constants';
import ToastifyConfig from '@/utils/toastify';
import { Button } from '@chakra-ui/react';
import { toast } from 'react-toastify';

export default function Logout() {

  function logout() {
    localStorage.removeItem(ADMIN_TOKEN);
    toast.success('Logout Success!', ToastifyConfig);
    setTimeout(() => {
      location.replace('/')
    }, 2000);
  }
  return (
    <Button colorScheme='orange' onClick={logout}>
      Logout
    </Button>
  );
}
