import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import AnimalTypeDropdown from "../AnimalTypeDropdown";

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
      <FormErrorMessage>Pet type is required</FormErrorMessage>
    </FormControl>
  );
}
