import { RcFile } from "antd/es/upload";
import imageCompression, { Options } from "browser-image-compression";

export const getBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export function getColorForAnimal(animal: string) {
  switch (animal) {
    case "dog":
      return "blue";
    case "cat":
      return "red";
    case "parrot":
      return "purple";
    case "rabbit":
      return "pink";
    case "turtle":
      return "green";
  }
}

export function getTimestampMinusOneWeek(): string {
  const today = new Date();
  const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000); // Subtracting 7 days in milliseconds

  const timestamp = oneWeekAgo.toISOString(); // Converting to ISO string format
  return timestamp;
}

export function getImageForPetType(type: string) {
  switch (type) {
    case "cat":
      return "/assets/cat.jpeg";
    case "parrot":
      return "/assets/parrot.jpeg";
    case "rabbit":
      return "/assets/rabbit.jpeg";
    case "turtle":
      return "/assets/turtle.jpeg";
    default:
      return "/assets/dog.jpeg";
  }
}

const options: Options = {
  maxSizeMB: 0.5,
  useWebWorker: true,
};

export async function compressImage(image: File) {
  const compressedImage = await imageCompression(image, options);
  return compressedImage;
}
