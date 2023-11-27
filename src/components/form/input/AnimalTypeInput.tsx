import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import AnimalTypeDropdown from "../AnimalTypeDropdown";
import { FORM_ERRORS } from "@/constants";

export default function AnimalTypeInput(
  props: FormControlProps & {
    type: string;
    setType: Dispatch<SetStateAction<string>>;
  },
) {
  return (
    <FormControl {...props}>
      <FormLabel>Type</FormLabel>
      <AnimalTypeDropdown type={props.type} setType={props.setType} />
      <FormErrorMessage>{FORM_ERRORS.PET_TYPE}</FormErrorMessage>
    </FormControl>
  );
}
