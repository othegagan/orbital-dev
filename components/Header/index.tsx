'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SetStateAction, useEffect, useState } from 'react';
import menuData from './menuData';
import { Menu } from '@/app/types/menu';
import { Button } from '../ui/button';
import DropdownUser from './DropdownUser';

const Header = () => {
    // Navbar toggle
    const [navbarOpen, setNavbarOpen] = useState(false);
    const navbarToggleHandler = () => {
        setNavbarOpen(!navbarOpen);
    };

    // Sticky Navbar
    const [sticky, setSticky] = useState(false);
    const handleStickyNavbar = () => {
        if (window.scrollY >= 80) {
            setSticky(true);
        } else {
            setSticky(false);
        }
    };
    useEffect(() => {
        window.addEventListener('scroll', handleStickyNavbar);
    });

    // submenu handler
    const [openIndex, setOpenIndex] = useState(-1);
    const handleSubmenu = (index: SetStateAction<number>) => {
        if (openIndex === index) {
            setOpenIndex(-1);
        } else {
            setOpenIndex(index);
        }
    };

    const usePathName = usePathname();

    const [showPopover, setShowPopover] = useState(false);

    const togglePopover = () => {
        setShowPopover(!showPopover);
    };

    return (
        <>
            <header
                className={`header left-0 top-0 z-40 flex h-20 w-full items-center ${
                    sticky
                        ? 'dark:bg-gray-dark dark:shadow-sticky-dark shadow-sticky fixed z-[9999] bg-white !bg-opacity-80 backdrop-blur-sm transition'
                        : 'dark:bg-gray-dark dark:shadow-sticky-dark shadow-sticky absolute z-[9999] bg-white !bg-opacity-80 backdrop-blur-sm transition'
                }`}>
                <div className='container'>
                    <div className='relative -mx-4 flex items-center justify-between'>
                        <div className='w-60 max-w-full px-4 xl:mr-12'>
                            <Link href='#' className={`header-logo block w-full ${sticky ? 'py-5 lg:py-2' : 'py-8'} `}>
                                <Image src='/orbital_logo.png' alt='logo' width={44} height={44} className='dark:hidden' />
                            </Link>
                        </div>
                        <div className='flex w-full items-center justify-between px-4'>
                            <div>
                                <button
                                    onClick={navbarToggleHandler}
                                    id='navbarToggler'
                                    aria-label='Mobile Menu'
                                    className='absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden'>
                                    <span
                                        className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                                            navbarOpen ? ' top-[7px] rotate-45' : ' '
                                        }`}
                                    />
                                    <span
                                        className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                                            navbarOpen ? 'opacity-0 ' : ' '
                                        }`}
                                    />
                                    <span
                                        className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                                            navbarOpen ? ' top-[-8px] -rotate-45' : ' '
                                        }`}
                                    />
                                </button>
                                <nav
                                    id='navbarCollapse'
                                    className={`navbar border-body-color/50 dark:border-body-color/20 dark:bg-dark absolute right-0 z-30 w-[250px] rounded border-[.5px] bg-white px-6 py-4 duration-300 lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
                                        navbarOpen ? 'visibility top-full opacity-100' : 'invisible top-[120%] opacity-0'
                                    }`}>
                                    <ul className='block lg:flex lg:space-x-6'>
                                        {menuData.map((menuItem, index) => (
                                            <li key={index} className='group relative'>
                                                {menuItem.path ? (
                                                    <Link
                                                        href={menuItem.path}
                                                        className={`flex px-8 py-4 text-base lg:mr-0 lg:inline-flex lg:px-4 lg:py-3 ${
                                                            usePathName === menuItem.path
                                                                ? 'font-weight: 600; text-[#01B286]-foreground bg-[#01B286]/5 text-[14px] font-semibold text-[#42a48b] shadow-sm'
                                                                : 'font-weight: 600 text-[14px] text-[#747474] hover:text-[#01B286] dark:text-white/70 dark:hover:text-white'
                                                        }`}>
                                                        {menuItem.title}
                                                    </Link>
                                                ) : (
                                                    <>
                                                        <p
                                                            onClick={() => handleSubmenu(index)}
                                                            className='text-dark flex cursor-pointer items-center justify-between py-2 text-base group-hover:text-primary dark:text-white/70 dark:group-hover:text-white lg:mr-0 lg:inline-flex lg:px-0 lg:py-6'>
                                                            {menuItem.title}
                                                            <span className='pl-3'>
                                                                <svg width='25' height='24' viewBox='0 0 25 24'>
                                                                    <path
                                                                        fillRule='evenodd'
                                                                        clipRule='evenodd'
                                                                        d='M6.29289 8.8427C6.68342 8.45217 7.31658 8.45217 7.70711 8.8427L12 13.1356L16.2929 8.8427C16.6834 8.45217 17.3166 8.45217 17.7071 8.8427C18.0976 9.23322 18.0976 9.86639 17.7071 10.2569L12 15.964L6.29289 10.2569C5.90237 9.86639 5.90237 9.23322 6.29289 8.8427Z'
                                                                        fill='currentColor'
                                                                    />
                                                                </svg>
                                                            </span>
                                                        </p>
                                                        <div
                                                            className={`submenu dark:bg-dark relative left-0 top-full rounded-sm bg-white transition-[top] duration-300 group-hover:opacity-100 lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full ${
                                                                openIndex === index ? 'block' : 'hidden'
                                                            }`}>
                                                            {menuItem.submenu && (
                                                                <div
                                                                    className={`submenu dark:bg-dark relative left-0 top-full rounded-sm bg-white transition-[top] duration-300 group-hover:opacity-100 lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full ${openIndex === index ? 'block' : 'hidden'}`}>
                                                                    {menuItem.submenu.map((submenuItem: Menu, subIndex: number) => (
                                                                        <Link
                                                                            href={submenuItem.path || '#'}
                                                                            key={subIndex}
                                                                            className='text-dark block rounded py-2.5 text-sm hover:text-primary dark:text-white/70 dark:hover:text-white lg:px-3'>
                                                                            {submenuItem.title}
                                                                        </Link>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>
                            {/* <div className="flex items-center justify-end pr-16 lg:pr-0">
                <Link
                  href="/signin"
                  className="hidden px-7 py-3 text-base font-medium text-dark hover:opacity-70 dark:text-white md:block"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="ease-in-up shadow-btn hover:shadow-btn-hover hidden rounded-sm bg-primary px-8 py-3 text-base font-medium text-white transition duration-300 hover:bg-opacity-90 md:block md:px-9 lg:px-6 xl:px-9"
                >
                  Sign Up
                </Link>
                <div>
                  <ThemeToggler />
                </div>
              </div> */}

                            <div className='flex items-center justify-end gap-2 pr-16 lg:pr-0'>
                                <button
                                    aria-label='theme toggler'
                                    className='bg-gray-2 dark:bg-dark-bg flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-black dark:text-white md:h-14 md:w-14'>
                                    <svg width='20' height='21' viewBox='0 0 20 21' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                        <path
                                            d='M9 17.5C13.4183 17.5 17 13.9183 17 9.5C17 5.08172 13.4183 1.5 9 1.5C4.58172 1.5 1 5.08172 1 9.5C1 13.9183 4.58172 17.5 9 17.5Z'
                                            stroke='black'
                                            stroke-width='2'
                                            stroke-linecap='round'
                                            stroke-linejoin='round'
                                        />
                                        <path d='M19 19.5002L14.7 15.2002' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' />
                                    </svg>
                                </button>
                                <button
                                    aria-label='theme toggler'
                                    className='bg-gray-2 dark:bg-dark-bg flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-black dark:text-white md:h-14 md:w-14'>
                                    <svg width='22' height='24' viewBox='0 0 20 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                        <path
                                            d='M19.5303 13.9697L17.5 11.9395V9.25C17.4977 7.39138 16.8063 5.59964 15.5595 4.22124C14.3127 2.84284 12.5991 1.9757 10.75 1.7875V0.25H9.25V1.7875C7.40093 1.9757 5.68732 2.84284 4.44053 4.22124C3.19373 5.59964 2.50233 7.39138 2.5 9.25V11.9395L0.46975 13.9697C0.329088 14.1104 0.250042 14.3011 0.25 14.5V16.75C0.25 16.9489 0.329018 17.1397 0.46967 17.2803C0.610322 17.421 0.801088 17.5 1 17.5H6.25V18.0828C6.23369 19.0342 6.56905 19.9583 7.19184 20.6778C7.81462 21.3973 8.68102 21.8617 9.625 21.982C10.1464 22.0337 10.6728 21.9757 11.1704 21.8117C11.6681 21.6478 12.1259 21.3815 12.5144 21.03C12.9029 20.6785 13.2136 20.2495 13.4264 19.7707C13.6392 19.292 13.7494 18.7739 13.75 18.25V17.5H19C19.1989 17.5 19.3897 17.421 19.5303 17.2803C19.671 17.1397 19.75 16.9489 19.75 16.75V14.5C19.75 14.3011 19.6709 14.1104 19.5303 13.9697ZM12.25 18.25C12.25 18.8467 12.0129 19.419 11.591 19.841C11.169 20.2629 10.5967 20.5 10 20.5C9.40326 20.5 8.83097 20.2629 8.40901 19.841C7.98705 19.419 7.75 18.8467 7.75 18.25V17.5H12.25V18.25ZM18.25 16H1.75V14.8105L3.78025 12.7803C3.92091 12.6396 3.99996 12.4489 4 12.25V9.25C4 7.6587 4.63214 6.13258 5.75736 5.00736C6.88258 3.88214 8.4087 3.25 10 3.25C11.5913 3.25 13.1174 3.88214 14.2426 5.00736C15.3679 6.13258 16 7.6587 16 9.25V12.25C16 12.4489 16.0791 12.6396 16.2197 12.7803L18.25 14.8105V16Z'
                                            fill='black'
                                        />
                                    </svg>
                                </button>

                                <DropdownUser />
                                {/* DarkMode Toggle */}
                                {/* <div>
                  <ThemeToggler />
                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
