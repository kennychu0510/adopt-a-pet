import Images from "@/assets";
import { PetCardProps } from "./types";

export const NavBarHeight = 44 + 8 * 2 + 2;

export const CATEGORIES: PetCardProps[] = [
  {
    id: 0,
    name: "all",
    image: '/assets/pets.jpeg',
  },
  {
    id: 1,
    name: "dog",
    image: '/assets/dog.png',
  },
  {
    id: 2,
    name: "cat",
    image: '/assets/cat.png',
  },
  {
    id: 3,
    name: "parrot",
    image: '/assets/parrot.jpeg'
  },
  {
    id: 4,
    name: "rabbit",
    image: '/assets/rabbit.jpeg'
  },
  {
    id: 5,
    name: "turtle",
    image: '/assets/turtle.png'
  },
];
