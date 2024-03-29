export type PetCardProps = {
  id: string;
  name: string;
  image: string;
  link: string;
  badge?: string;
  badgeColor?: string;
};

export const NavBarHeight = 44 + 8 * 2 + 2;

export const CATEGORIES: PetCardProps[] = [
  {
    id: "all",
    name: "all",
    image: "/assets/pets.jpeg",
    link: "/adoptType/all",
  },
  {
    id: "dog",
    name: "dog",
    image: "/assets/dog.jpeg",
    link: "/adoptType/dog",
  },
  {
    id: "cat",
    name: "cat",
    image: "/assets/cat.jpeg",
    link: "/adoptType/cat",
  },
  {
    id: "parrot",
    name: "parrot",
    image: "/assets/parrot.jpeg",
    link: "/adoptType/parrot",
  },
  {
    id: "rabbit",
    name: "rabbit",
    image: "/assets/rabbit.jpeg",
    link: "/adoptType/rabbit",
  },
  {
    id: "turtle",
    name: "turtle",
    image: "/assets/turtle.jpeg",
    link: "/adoptType/turtle",
  },
];

export const HK_CENTER_LAT = 22.3193;
export const HK_CENTER_LNG = 114.1694;
export const HK_CENTER: L.LatLngExpression = [HK_CENTER_LAT, HK_CENTER_LNG];

export const FORM_ERRORS = {
  NAME: "Your name is required",
  PET_TYPE: "Pet type is required",
  CONTACT: "Your contact is required",
  DESCRIPTION: "Description is required",
  PET_NAME: "Pet name is required",
  DATE: "Date and time are required",
  IMAGE: "Image of pet is required",
};

export const ADMIN_TOKEN = "adopt-a-pet-token";
