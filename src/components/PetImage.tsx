import Image from "next/legacy/image";

export default function PetImage({ image }: { image: string }) {
  return (
    <Image
      src={image}
      alt={"pet image"}
      objectFit="cover"
      style={{
        borderRadius: 10,
      }}
      height={250}
      width={250}
    />
  );
}
