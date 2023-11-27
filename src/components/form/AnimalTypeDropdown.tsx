import { CATEGORIES } from "@/constants";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

const AnimalTypes = CATEGORIES.filter((item) => item.name !== "all").map(
  (item) => item.name,
);
export default function AnimalTypeDropdown({
  type,
  setType,
}: {
  type: string;
  setType: Dispatch<SetStateAction<string>>;
}) {
  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        color={type ? "#000" : "#888"}
      >
        <Text textTransform={"capitalize"}>
          {type.length > 0 ? type : "Select a Type"}
        </Text>
      </MenuButton>
      <MenuList>
        {AnimalTypes.map((type) => (
          <MenuItem key={type} onClick={() => setType(type)}>
            <Text textTransform={"capitalize"}>{type}</Text>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
