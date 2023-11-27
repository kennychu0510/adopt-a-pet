import { FormControl, FormControlProps, FormErrorMessage, FormHelperText, FormLabel, Textarea } from '@chakra-ui/react';

export default function DescriptionInput(props: FormControlProps) {
  return (
    <FormControl {...props}>
      <FormLabel>Description</FormLabel>
      <Textarea
        name='description'
        id='description'
        borderColor='gray.300'
        _hover={{
          borderRadius: 'gray.300',
        }}
        maxLength={500}
      />
      <FormHelperText>Max 500 characters</FormHelperText>
      <FormErrorMessage>Description is required</FormErrorMessage>
    </FormControl>
  );
}
