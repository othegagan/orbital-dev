'use client';

import { Button } from '../ui/button';

const FinancialGoalsPage = () => {
    return (
        <>
            <section id='contact' className='mt-2 overflow-hidden md:mt-0 lg:mt-0'>
                <div className='shadow-three dark:bg-gray-dark container rounded-sm  md:p-[24px] lg:mb-8 lg:p-[0px]  xl:p-[0px]'>
                    <div className='flex items-center justify-between pb-3 pt-3'>
                        <div>
                            <h2 className='font-weight: 700;  text-[18px] text-[#545454]'>Goals</h2>
                        </div>
                        <div>
                            <Button variant='outlineCustom'>See All</Button>
                        </div>
                    </div>
                    <div className='space-y-4 sm:space-y-6'>
                        <div className='grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-2'>
                            <div className='flex flex-col rounded-xl border bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-800'>
                                <div className='p-4 md:p-5'>
                                    <div className='flex items-center justify-between'>
                                        <div>
                                            <h2 className='font-weight: 700; text-[20px]  font-semibold text-[#000000]'>Personal House</h2>
                                        </div>
                                        <div>
                                            <span className='inline-flex items-center gap-x-1 rounded-[20px] bg-teal-100 px-4 py-[4px] text-xs font-medium text-teal-800 dark:bg-teal-500/10 dark:text-teal-500'>
                                                Active
                                            </span>
                                        </div>
                                    </div>
                                    <div className='mb-1 mt-1 grid gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-2 lg:grid-cols-4'>
                                        <div className='pt-2 md:pt-3'>
                                            <div className='flex  lg:justify-start'>
                                                <div>
                                                    <h2 className='font-weight: 700;  text-[16px] text-[#747474]'>Current</h2>
                                                    <p className='font-weight: 600; text-[14px]  font-semibold text-[#000000]'>1000.00</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='pt-2 md:pt-3'>
                                            <div className='flex lg:justify-center'>
                                                <div>
                                                    <h2 className='font-weight: 700;  text-[16px] text-[#747474]'>Target Value</h2>
                                                    <p className='font-weight: 600; text-[14px]  font-semibold text-[#000000]'>1000.00</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='pt-2 md:pt-3'>
                                            <div className='flex  lg:justify-center'>
                                                <div>
                                                    <h2 className='font-weight: 700;  text-[16px] text-[#747474]'>Remaining</h2>
                                                    <p className='font-weight: 600; text-[14px]  font-semibold text-[#000000]'>1000.00</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='pt-2 md:pt-3'>
                                            <div className='flex lg:justify-end'>
                                                <div>
                                                    <h2 className='font-weight: 700;  text-[16px] text-[#747474]'>Status</h2>
                                                    <span className='inline-flex items-center gap-x-1 rounded-[12px] bg-[#01B286] px-4 py-[2px] text-xs font-medium text-white'>
                                                        Completed
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <h2 className='font-weight: 600; mb-2  mt-2 text-[12px] font-semibold text-[#3F3F3F]'>Last transaction 3 days ago</h2>
                                    <h2 className='font-weight: 600; text-[12px]  font-semibold text-[#B1B1B1]'>Created at 10.05.2024</h2>
                                </div>
                            </div>
                            <div className='flex flex-col rounded-xl border bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-800'>
                                <div className='p-4 md:p-5'>
                                    <div className='flex items-center justify-between'>
                                        <div>
                                            <h2 className='font-weight: 700; text-[20px]  font-semibold text-[#000000]'>Getting a Personal car</h2>
                                        </div>
                                        <div>
                                            <span className='inline-flex items-center gap-x-1 rounded-[20px] bg-teal-100 px-4 py-[4px] text-xs font-medium text-teal-800 dark:bg-teal-500/10 dark:text-teal-500'>
                                                Active
                                            </span>
                                        </div>
                                    </div>
                                    <div className='mb-1 mt-1 grid gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-2 lg:grid-cols-4'>
                                        <div className='pt-2 md:pt-3'>
                                            <div className='flex  lg:justify-start'>
                                                <div>
                                                    <h2 className='font-weight: 700;  text-[16px] text-[#747474]'>Current</h2>
                                                    <p className='font-weight: 600; text-[14px]  font-semibold text-[#000000]'>1000.00</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='pt-2 md:pt-3'>
                                            <div className='flex lg:justify-center'>
                                                <div>
                                                    <h2 className='font-weight: 700;  text-[16px] text-[#747474]'>Target Value</h2>
                                                    <p className='font-weight: 600; text-[14px]  font-semibold text-[#000000]'>1000.00</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='pt-2 md:pt-3'>
                                            <div className='flex  lg:justify-center'>
                                                <div>
                                                    <h2 className='font-weight: 700;  text-[16px] text-[#747474]'>Remaining</h2>
                                                    <p className='font-weight: 600; text-[14px]  font-semibold text-[#000000]'>1000.00</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='pt-2 md:pt-3'>
                                            <div className='flex lg:justify-end'>
                                                <div>
                                                    <h2 className='font-weight: 700;  text-[16px] text-[#747474]'>Status</h2>
                                                    <span className='inline-flex items-center gap-x-1 rounded-[12px] bg-[#FF5E00] px-4 py-[2px] text-xs font-medium text-white'>
                                                        Pending
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <h2 className='font-weight: 600; mb-2  mt-2 text-[12px] font-semibold text-[#3F3F3F]'>Last transaction 3 days ago</h2>
                                    <h2 className='font-weight: 600; text-[12px]  font-semibold text-[#B1B1B1]'>Created at 10.05.2024</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default FinancialGoalsPage;
