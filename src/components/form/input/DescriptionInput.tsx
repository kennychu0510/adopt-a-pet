import { FORM_ERRORS } from "@/constants";
import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";

export default function DescriptionInput(props: FormControlProps) {
  return (
    <FormControl {...props}>
      <FormLabel>Description</FormLabel>
      <Textarea
        name="description"
        id="description"
        borderColor="gray.300"
        _hover={{
          borderRadius: "gray.300",
        }}
        maxLength={500}
        placeholder={props.placeholder}
      />
      <FormHelperText>Max 500 characters</FormHelperText>
      <FormErrorMessage>{FORM_ERRORS.DESCRIPTION}</FormErrorMessage>
    </FormControl>
  );
}
