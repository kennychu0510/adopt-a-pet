import Images from "@/assets";
import HorizontalSection from "@/components/HorizontalSection";
import { CATEGORIES } from "@/constants";
import { PetCardProps } from "@/types";

const NEW_PETS: PetCardProps[] = [
  // {
  //   name: "Paw",
  //   image: Images.dog,
  // },
  // {
  //   name: "Paw",
  //   image: Images.dog,
  // },
  // {
  //   name: "Paw",
  //   image: Images.dog,
  // },
  // {
  //   name: "Paw",
  //   image: Images.dog,
  // },
];

const MISSING_PETS: PetCardProps[] = [
  // {
  //   name: "Bobo",
  //   image: Images.dog,
  // },
  // {
  //   name: "Paw",
  //   image: Images.dog,
  // },
  // {
  //   name: "Paw",
  //   image: Images.dog,
  // },
  // {
  //   name: "Paw",
  //   image: Images.dog,
  // },
]

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
      <HorizontalSection
        items={MISSING_PETS}
        header="Missing Pets"
        subHeader="Save a pet!"
      />
    </main>
  );
}
