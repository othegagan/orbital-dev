import { Inter } from 'next/font/google';
import './globals.css';
import Head from './head';
import Providers from '@/lib/Providers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from '@/components/ScrollToTop';

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en' className='!scroll-smooth' suppressHydrationWarning={true}>
            <Head />
            <ToastContainer />
            <body className={` ${inter.className} flex min-h-screen  w-full flex-col`}>
                <Providers>
                    {children} <ScrollToTop />
                </Providers>
            </body>
        </html>
    );
}
