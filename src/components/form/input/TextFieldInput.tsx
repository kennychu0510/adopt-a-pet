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
import { BsPerson } from "react-icons/bs";

export default function TextFieldInput(
  props: FormControlProps & {
    id: string;
    label: string;
    errorMessage: string;
    icon: React.ReactNode;
  },
) {
  return (
    <FormControl {...props}>
      <FormLabel>{props.label}</FormLabel>
      <InputGroup borderColor="#E0E1E7">
        <InputLeftAddon pointerEvents="none">{props.icon}</InputLeftAddon>
        <Input name={props.id} id={props.id} type="text" size="md" />
      </InputGroup>
      <FormErrorMessage>{props.errorMessage}</FormErrorMessage>
    </FormControl>
  );
}
