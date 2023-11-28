import { PetCardProps } from '@/types';
import {
  Card,
  CardBody,
  CardHeader,
  Stack,
  Text,
  TextProps,
} from '@chakra-ui/react';
import { Badge } from '@chakra-ui/react';
import Image from 'next/image';
import _ from 'lodash';

export default function PetCard(
  props: PetCardProps & {
    textProps?: TextProps;
    isWish?: boolean;
  }
) {
  return (
    <Card sx={{ w: 220 }} flexShrink={0} mb={2}>
      <CardHeader
        p={0}
        borderBottomColor={'brand.white'}
        sx={{ height: 140, position: 'relative' }}
      >
        <Image
          src={props.image}
          alt={props.name}
          fill
          style={{
            objectFit: 'cover',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        />
      </CardHeader>
      <CardBody>
        <Stack>
          <Text
            textAlign={'center'}
            textTransform={'capitalize'}
            {...props.textProps}
          >
            {_.capitalize(props.name)}
            {props.badge && <Badge ml={props.name ? 2 : 0} colorScheme={props.badgeColor ?? 'green'}>{props.badge}</Badge>}
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
}
