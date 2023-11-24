import { Box } from '@chakra-ui/react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Box
        mt={4}
        mb={4}
        mx={'auto'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        {children}
      </Box>
    </main>
  );
}
