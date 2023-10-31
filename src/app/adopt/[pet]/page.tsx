import { Heading } from '@chakra-ui/react';
import React from 'react';

export default function AdoptPage({ params: { pet } }: { params: { pet: string } }) {
  console.log(pet)
  return (
    <main>
      <Heading color={'blue.600'}>Adopt a Pet</Heading>
    </main>
  );
}
