import { SetStateAction, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import menuData from './menuData';
import { Button } from '../ui/button';
import { usePathname } from 'next/navigation';
import { Menu } from '@/app/types/menu';
import userData from './userData';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { BsArrowRepeat, BsFillEyeFill } from 'react-icons/bs';

const DropdownUser = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const trigger = useRef<any>(null);
    const dropdown = useRef<any>(null);
    const usePathName = usePathname();

    const [userName, setuserName] = useState();
    const [lastName, setlastName] = useState('');
    const [email, setemail] = useState('');

    const [IsEmailVerifiedvalue, setIsEmailVerifiedvalued] = useState('');
    const [IsPhoneVerifiedvalue, setIsPhoneVerifiedvalued] = useState('');

    useEffect(() => {
        //Get Local Storage Data

        const userDataDetails = localStorage.getItem('userData');
        if (userDataDetails) {
            const userData = JSON.parse(userDataDetails);
            setuserName(userData.firstName);
            setlastName(userData.lastName);
            setemail(userData.emailId);
        } else {
            console.log('Data not found in localStorage');
        }
        //
        const isEmailVerified = localStorage.getItem('emailVerified');
        setIsEmailVerifiedvalued(isEmailVerified || '');

        const isPhoneVerified = localStorage.getItem('mobileVerified');
        setIsPhoneVerifiedvalued(isPhoneVerified || '');

        //
        const clickHandler = ({ target }: MouseEvent) => {
            if (!dropdown.current) return;
            if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) setDropdownOpen(false);
            return;
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
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

    //Logout
    const handleSignOut = () => {
        localStorage.clear();
        window.location.href = '/';
    };

    return (
        <div className='relative'>
            <Link ref={trigger} onClick={() => setDropdownOpen(!dropdownOpen)} className='flex items-center gap-2' href='#'>
                <span className='h-[2.5rem] w-[2.5rem] rounded-full'>
                    <img
                        src='/profileAvatar.png'
                        alt='logo'
                        // width={20}
                        // height={20}
                        className='w-full dark:hidden '
                    />
                </span>
            </Link>

            {/* <!-- Dropdown Start --> */}
            <div
                ref={dropdown}
                onFocus={() => setDropdownOpen(true)}
                onBlur={() => setDropdownOpen(false)}
                className={`border-stroke dark:border-strokedark dark:bg-boxdark absolute right-0 mt-6 flex  flex-col rounded-lg border bg-white drop-shadow-md md:right-3 md:w-[30rem] lg:w-[30rem] ${
                    dropdownOpen === true ? 'block' : 'hidden'
                }`}
                // style={{ width: "30rem" }}
            >
                <div className='relative max-h-full w-full max-w-2xl'>
                    <div className='flex  items-center justify-between rounded-t border-b dark:border-gray-600 md:p-5'>
                        <div className='flex items-center gap-2'>
                            <Image src='/profileAvatar.png' alt='logo' width={44} height={44} className='dark:hidden' />
                            <span>
                                <p className='max-width: 2; font-weight: 600; font-bold	text-[#000000] text-[18]'>
                                    {userName} {lastName}
                                </p>
                                <p className='text-sm font-medium text-gray-500'>{email}</p>
                            </span>
                        </div>
                        <button
                            type='button'
                            className='ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-[#EA4335] hover:bg-[#01B286]/5 hover:text-[#EA4335] dark:hover:bg-gray-600 dark:hover:text-white'
                            data-modal-hide='default-modal'>
                            <svg className='h-4 w-4' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 14 14'>
                                <path
                                    stroke='currentColor'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                                />
                            </svg>
                            <span className='sr-only'>Close modal</span>
                        </button>
                    </div>
                </div>

                {IsEmailVerifiedvalue === 'false' || IsPhoneVerifiedvalue === 'false' ? (
                    <div className='relative max-h-full w-full max-w-2xl'>
                        <div className='items-center rounded-t dark:border-gray-600 md:p-3'>
                            <Card className='bg-[#01B286]/10 shadow-[0]'>
                                <CardHeader>
                                    <CardTitle className='text-sm-[14px] font-bold text-[#046C4E]'>Email & Phone verification Pending</CardTitle>
                                    <CardDescription className='text-sm-[12px] text-[#046C4E]'>Please verify your email and phone number. </CardDescription>
                                </CardHeader>
                                <CardContent className='m-0 grid'>
                                    <div className='flex'>
                                        <Button variant='secondaryDarkGreen'>
                                            <BsFillEyeFill color='white' className='mr-2 h-4 w-4' />
                                            Login with Email
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                ) : null}

                <ul className='border-stroke dark:border-strokedark flex flex-col gap-1 border-b px-6 py-3'>
                    {userData.map((menuItem, index) => (
                        <li key={index} className='group'>
                            {menuItem.path ? (
                                <Link
                                        href={menuItem.path}
                                        className={`flex w-full items-center justify-between rounded-md px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-gray-400 ${
                                            usePathName === menuItem.path
                                                ? 'font-weight: 600 text-[#01B286]-foreground bg-[#01B286]/5  text-[14px] shadow-sm'
                                                : 'font-weight: 600 text-[14px] text-[#747474] hover:text-[#01B286] dark:text-white/70 dark:hover:text-white'
                                        }`}>
                                        <div className='flex items-center'>
                                            <span className='mr-2 h-5 w-5' aria-hidden='true'>
                                                {menuItem.icon && <img src={menuItem.icon} alt={menuItem.title} />}
                                            </span>
                                            <span>{menuItem.title}</span>
                                        </div>
                                        <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
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
                                </>
                            )}
                        </li>
                    ))}
                </ul>
                <div className='relative max-h-full w-full max-w-2xl p-1'>
                    <Button asChild variant='link' size='lg' onClick={handleSignOut}>
                        <Link
                            href='#'
                            className={`flex w-full items-center justify-between rounded-md px-4 py-2 text-sm text-[#EA4335] hover:bg-gray-100 hover:text-[#EA4335] focus:outline-none focus-visible:ring focus-visible:ring-gray-400 `}>
                            <div className='flex items-center gap-2 '>
                                <svg width='22' height='24' viewBox='0 0 18 19' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                    <path
                                        d='M14.4259 9.32255L14.7795 8.969L14.4259 9.32256C14.4482 9.34483 14.4667 9.37191 14.4804 9.40501C14.5053 9.4654 14.5053 9.5346 14.4804 9.59499C14.466 9.62966 14.4475 9.65616 14.4279 9.67553L14.4259 9.67745L11.4267 12.6767C11.3778 12.7256 11.3145 12.75 11.25 12.75C11.1855 12.75 11.1222 12.7256 11.0733 12.6767C10.9753 12.5787 10.9753 12.4213 11.0733 12.3233L12.7931 10.6036L13.6466 9.75H12.4395H6C5.86172 9.75 5.75 9.63818 5.75 9.5C5.75 9.36182 5.86172 9.25 6 9.25H12.4395H13.6466L12.7931 8.39645L11.0733 6.6767C10.9753 6.57871 10.9753 6.42129 11.0733 6.3233C11.1713 6.22532 11.3287 6.22532 11.4267 6.3233L14.4259 9.32255ZM5.25 14.5H7.5C7.63828 14.5 7.75 14.6118 7.75 14.75C7.75 14.8882 7.63828 15 7.5 15H5.25C4.28564 15 3.5 14.2144 3.5 13.25V5.75C3.5 4.78564 4.28564 4 5.25 4H7.5C7.63828 4 7.75 4.11182 7.75 4.25C7.75 4.38818 7.63828 4.5 7.5 4.5H5.25C4.55953 4.5 4 5.06093 4 5.75V13.25C4 13.9391 4.55953 14.5 5.25 14.5Z'
                                        fill='#374151'
                                        stroke='#F05252'
                                    />
                                </svg>
                                <span>Sign Out</span>
                            </div>
                            <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DropdownUser;
