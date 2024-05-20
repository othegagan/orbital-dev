'use client';
import SectionTitle from '../Common/SectionTitle';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import PlaidComponentPage from '../plaid_component';
import { safeJSONParse } from '@/lib/utils';

const Hero = () => {
    const [userData, setUserData] = useState({ firstName: '', lastName: '', show: false });
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        try {
            // Get Local Storage Data
            const userDataDetails = localStorage.getItem('userData');

            if (userDataDetails) {
                const userDataParsed = safeJSONParse(userDataDetails);
                if (userDataParsed) {
                    const { firstName, lastName, plaidBankDetailExist } = userDataParsed;
                    setUserData({
                        firstName,
                        lastName,
                        show: plaidBankDetailExist,
                    });
                }
            } else {
                console.log('Data not found in localStorage');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, []);

    const { firstName, lastName, show } = userData;

    return (
        <>
            {!show && !loading && (
                <section id='contact' className='mt-16 overflow-hidden md:mt-20 lg:mt-28'>
                    <div className='shadow-three dark:bg-gray-dark container mb-12 rounded-sm bg-white px-8 py-11 sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]'>
                        <div className='-mx-4 flex flex-wrap'>
                            <div className='w-full px-4 lg:w-7/12 xl:w-8/12'>
                                <SectionTitle
                                    title={`Welcome, ${firstName + ' ' + lastName} 🎉`}
                                    paragraph='Congratulations on taking the first step towards mastering your financial future! '
                                    mb='44px'
                                />
                                <div className='mb-12 max-w-[570px] lg:mb-0' data-wow-delay='.15s'>
                                    <PlaidComponentPage section={'hero'} />
                                </div>
                            </div>
                            <div className='w-full px-4 lg:w-5/12 xl:w-4/12'>
                                <div className='relative mx-auto aspect-[38/30]  lg:mr-0'>
                                    <Image
                                        src='/WelcomeImg.png'
                                        alt='about-image'
                                        fill
                                        className='drop-shadow-three mx-auto max-w-full dark:hidden dark:drop-shadow-none lg:mr-0'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default Hero;
