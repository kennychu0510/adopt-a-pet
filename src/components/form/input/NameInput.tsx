import { FormControl, FormLabel, InputGroup, InputLeftAddon, FormErrorMessage, FormControlProps, Input } from '@chakra-ui/react'
import React from 'react'
import { BsPerson } from 'react-icons/bs'

export default function NameInput(props: FormControlProps) {
  return (
    <FormControl {...props}>
    <FormLabel>Your Name</FormLabel>
    <InputGroup borderColor='#E0E1E7'>
      <InputLeftAddon pointerEvents='none'>
        <BsPerson color='gray.800' />
      </InputLeftAddon>
      <Input name='name' id='name' type='text' size='md' />
    </InputGroup>
    <FormErrorMessage>Your name is required</FormErrorMessage>
  </FormControl>
  )
}
