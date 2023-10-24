import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import NavBar from '@/components/Nav';
import { Container } from '@chakra-ui/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Adopt A Pet',
  description: 'A website for matching potential pet owners and animals for adoption.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
          <NavBar />
          <Container maxW={'8xl'} p={'4'}>
            {children}
          </Container>
        </Providers>
      </body>
    </html>
  );
}
