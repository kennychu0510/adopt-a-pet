import Images from "@/assets";
import { PetCardProps } from "./types";

export const NavBarHeight = 44 + 8 * 2 + 2;

export const CATEGORIES: PetCardProps[] = [
  {
    name: "all",
    image: '/assets/pets.jpeg',
  },
  {
    name: "dog",
    image: '/assets/dog.png',
  },
  {
    name: "cat",
    image: '/assets/cat.png',
  },
  {
    name: "parrot",
    image: '/assets/parrot.jpeg'
  },
  {
    name: "rabbit",
    image: '/assets/rabbit.jpeg'
  },
  {
    name: "turtle",
    image: '/assets/turtle.png'
  },
];
