'use client';
import Header from '@/components/Header';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <body className={`bg-[#f2f8f6] ${inter.className}`}>
                <Header />
                {children}
            </body>
        </>
    );
}
