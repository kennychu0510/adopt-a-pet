import { FORM_ERRORS } from "@/constants";
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
import { MdOutlineEmail } from "react-icons/md";

export default function ContactInput(props: FormControlProps) {
  return (
    <FormControl {...props}>
      <FormLabel>Contact</FormLabel>
      <InputGroup borderColor="#E0E1E7">
        <InputLeftAddon pointerEvents="none">
          <MdOutlineEmail color="gray.800" />
        </InputLeftAddon>
        <Input
          name="contact"
          id="contact"
          type="text"
          size="md"
          placeholder="Phone or Email"
        />
      </InputGroup>
      <FormErrorMessage>{FORM_ERRORS.CONTACT}</FormErrorMessage>
    </FormControl>
  );
}
