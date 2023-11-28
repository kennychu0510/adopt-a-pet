import {
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  FormErrorMessage,
  FormControlProps,
  Input,
} from "@chakra-ui/react";
import React from "react";

export default function TextFieldInput(
  props: FormControlProps & {
    id: string;
    label: string;
    errorMessage: string;
    icon: React.ReactNode;
  },
) {
  const {errorMessage, ...remainingProps} = props
  return (
    <FormControl {...remainingProps}>
      <FormLabel>{props.label}</FormLabel>
      <InputGroup borderColor="#E0E1E7">
        <InputLeftAddon pointerEvents="none">{props.icon}</InputLeftAddon>
        <Input name={props.id} id={props.id} type="text" size="md" />
      </InputGroup>
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
}
