import Images from '@/assets';
import { Heading, VStack } from '@chakra-ui/react';
import PetImage from '../PetImage';

export default function NoMissingPlaceholder() {
  return (
    <>
      <VStack mb={2}>
        <PetImage image={Images.noMissing} />
        <Heading color={'blue.600'} textAlign={'center'}>
          No pets reported missing in the past week!
        </Heading>
      </VStack>
    </>
  );
}
