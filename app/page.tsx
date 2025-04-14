// This is the main entry point for the application
import {Josefin_Sans} from 'next/font/google';
import Navbar from '@/components/home/navbar';

const josefin = Josefin_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-josefin',
});

export default async function Home() {

  return (
    <>
    <header className={josefin.className}>
      <Navbar/>
    </header>
    <main className='pt-20 bg-gray-50 min-h-screen'>
      lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </main>
    </>
  );
}
