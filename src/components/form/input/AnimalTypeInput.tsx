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
  const { type, setType, ...remainingProps } = props;
  return (
    <FormControl {...remainingProps}>
      <FormLabel>Type</FormLabel>
      <AnimalTypeDropdown type={type} setType={setType} />
      <FormErrorMessage>{FORM_ERRORS.PET_TYPE}</FormErrorMessage>
    </FormControl>
  );
}
