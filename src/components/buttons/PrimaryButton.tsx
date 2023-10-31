import { Button, ButtonProps } from '@chakra-ui/react';
import React from 'react';

interface Props extends ButtonProps {
  label: string;
}
export default function PrimaryButton(props: Props) {
  const { label, ...remainingProps } = props;
  return (
    <Button
      variant='solid'
      bg='blue.600'
      color='white'
      _hover={{
        opacity: 0.6,
      }}
      type='submit'
      {...remainingProps}
    >
      {props.label}
    </Button>
  );
}
