import Images from "@/assets";
import HorizontalSection from "@/components/HorizontalSection";
import { CATEGORIES } from "@/constants";
import { PetCardProps, PetType } from "@/types";
import supabase from "@/utils/supabase";

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

export default async function Home() {
  const adoptionList = await supabase.from('Adoption').select('*')
  const NEW_PETS: PetCardProps[] = adoptionList.data?.map(item => ({
    id: item.id,
    name: item.type as PetType,
    image: item.image ?? ''
  })) ?? []
  return (
    <main>
      <HorizontalSection
        items={CATEGORIES}
        header="Adopt a Pet"
        subHeader="Be a guardian angel"
        page="adopt"
      />
      <HorizontalSection
        items={NEW_PETS}
        header="New pets to adopt"
        subHeader="Bring a pet home now!"
        page="adopt"
      />
      <HorizontalSection
        items={MISSING_PETS}
        header="Lost Pets"
        subHeader="Save a pet!"
        page="lost"
      />
    </main>
  );
}
