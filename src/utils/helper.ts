import { RcFile } from "antd/es/upload";

export const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export function getColorForAnimal(animal: string) {
  switch (animal) {
    case 'dog':
      return 'blue'
    case 'cat':
      return 'red'
    case 'parrot':
      return 'purple'
    case 'rabbit':
      return 'pink'
    case 'turtle':
      return 'green'
  }
}