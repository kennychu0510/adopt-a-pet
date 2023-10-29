import useIsLargeScreen from '@/hooks/useIsLargeScreen';
import { PetCardProps } from '@/types';
import { Card, CardBody, CardHeader, Stack, Text } from '@chakra-ui/react';
import Image from 'next/image';

export default function PetCard(props: PetCardProps) {
  return (
    <Card sx={{ w: 220 }} flexShrink={0}>
      <CardHeader p={0} borderBottomWidth={1} borderBottomStyle={'solid'} borderBottomColor={'brand.white'}>
        <Image
          src={props.image}
          alt={props.name}
          style={{
            objectFit: 'cover',
            width: '100%',
            height: 140,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        />
      </CardHeader>
      <CardBody>
        <Stack>
          <Text textAlign={'center'} textTransform={'capitalize'}>
            {props.name}
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
}
