import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { MdOutlinePets } from 'react-icons/md';

export default function Row({ icon, content }: { icon: React.ReactNode; content: string | null }) {
  return (
    <Flex alignSelf={'flex-start'} justify={'space-between'} alignItems={'center'} my={3}>
      <Box mr={2} alignSelf={'flex-start'} pt={1}>{icon}</Box>
      <Text >{content}</Text>
    </Flex>
  );
}
