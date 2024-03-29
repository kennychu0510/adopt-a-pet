"use client";
import { PetCardProps } from "@/constants";
import { Box, Text } from "@chakra-ui/react";
import PetCard from "./PetCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Link from "next/link";
import Images from "@/assets";

type Props = {
  header: string;
  subHeader: string;
  items: PetCardProps[];
  page: string;
};

const responsive = {
  desktop: {
    breakpoint: { max: 4000, min: 1420 },
    items: 5,
  },
  minDesktop: {
    breakpoint: { max: 1420, min: 1000 },
    items: 4,
  },
  bigTablet: {
    breakpoint: { max: 1000, min: 720 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 720, min: 500 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 500, min: 0 },
    items: 1,
  },
};

const noAdoption: PetCardProps = {
  id: "no pets",
  link: "/",
  name: "",
  image: Images.noAdoption,
  badgeColor: "purple",
  badge: "No pets for adoption!",
};

const noMissingPet: PetCardProps = {
  id: "no missing",
  link: "/",
  name: "",
  image: Images.noMissing,
  badge: "All pets are safe!",
  badgeColor: "blue",
};

const noWishList: PetCardProps = {
  id: "no wish list",
  link: "/",
  name: "",
  image: Images.noWish,
  badge: "No wishes this week!",
  badgeColor: "purple",
};

export default function HorizontalSection(props: Props) {
  function getEmptyPlaceholder() {
    switch (props.page) {
      case "adopt":
        return [noAdoption];
      case "missing":
        return [noMissingPet];
      case "wish":
        return [noWishList];
      default:
        return;
    }
  }
  return (
    <Box mb={"4"}>
      <Text fontSize={"lg"} fontWeight={"bold"}>
        {props.header}
      </Text>
      <Text fontSize={"sm"} color={"grey"} mb={2}>
        {props.subHeader}
      </Text>
      <Box minH={212} mt={4} itemID={props.page}>
        <Carousel responsive={responsive} swipeable={true}>
          {(props.items.length > 0
            ? props.items
            : getEmptyPlaceholder() ?? []
          ).map((item) => (
            <Box key={item.name} justifyContent={"center"} display={"flex"}>
              <Link href={item.link} id={`hor-sec-link-${item.name}`}>
                <PetCard {...item} />
              </Link>
            </Box>
          ))}
        </Carousel>
      </Box>
    </Box>
  );
}
