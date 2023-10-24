import PetCard, { PetCardProps } from "@/components/PetCard";
import { Box, Container, Text } from "@chakra-ui/react";
import Images from "@/assets";
import HorizontalSection from "@/components/HorizontalSection";

const CATEGORIES: PetCardProps[] = [
  {
    name: "all",
    image: Images.pets,
  },
  {
    name: "dog",
    image: Images.dog,
  },
  {
    name: "cat",
    image: Images.cat,
  },
];

const NEW_PETS: PetCardProps[] = [
  {
    name: "Paw",
    image: Images.dog,
  },
];

export default function Home() {
  return (
    <main>
      <HorizontalSection
        items={CATEGORIES}
        header="Adopt a Pet"
        subHeader="Be a guardian angel"
      />
      <HorizontalSection
        items={NEW_PETS}
        header="New pets to adopt"
        subHeader="Bring a pet home now!"
      />
    </main>
  );
}
