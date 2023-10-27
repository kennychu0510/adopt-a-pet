import Images from "@/assets";
import { PetCardProps } from "./types";

export const NavBarHeight = 44 + 8 * 2 + 2;

export const CATEGORIES: PetCardProps[] = [
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
  {
    name: "parot",
    image: Images.parot
  },
  {
    name: "rabbit",
    image: Images.rabbit
  },
  {
    name: "turtle",
    image: Images.turtle
  },
];
