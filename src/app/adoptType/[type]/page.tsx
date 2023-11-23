import { Heading } from '@chakra-ui/react';
import React from 'react';

export default function AdoptPage({ params: { type } }: { params: { type: string } }) {
  console.log(type)
  return (
    <main>
      <Heading color={'blue.600'}>Adopt a {type}</Heading>
    </main>
  );
}
