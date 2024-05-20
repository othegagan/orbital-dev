'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BsPatchPlus } from 'react-icons/bs';
import { Button } from '../ui/button';

const FinancialSummaryPage = () => {
    const [summaryData, setSummaryData] = useState({
        totalCurrentBalance: 0,
        totalAvailableBalance: 0,
        invested: 0,
        profit: 0,
        goalsBalance: 0,
    });

    useEffect(() => {
        const fetchSummaryData = async () => {
            try {
                const userDataDetails = localStorage.getItem('userData');
                if (userDataDetails) {
                    const userData = JSON.parse(userDataDetails);
                    const url = `https://orbitalwebapi-stagging.azurewebsites.net/api/Dashboard/GetFinancialSummary?UserId=${userData.userId}`;
                    const response = await axios.post(url);
                    if (response.data.success) {
                        setSummaryData(response.data.data.financialSummary);
                    }
                }
            } catch (error) {
                console.error('Error fetching summary data:', error);
            }
        };

        fetchSummaryData();
    }, []);

    return (
        <>
            <section id='contact' className='mt-20 overflow-hidden md:mt-20 lg:mt-24'>
                <div className='shadow-three dark:bg-gray-dark container rounded-sm py-10 md:p-[24px] lg:mb-8 lg:p-[5px]  xl:p-[5px]'>
                    <div className='flex items-center justify-between pb-3 pt-3'>
                        <div>
                            <h2 className='font-weight: 700;  text-[18px] text-[#545454]'>Finance Summary</h2>
                        </div>
                        <div>
                            <Button variant='secondaryGreenwithIcon'>
                                <span className='mr-2'>Add Money</span>
                                <BsPatchPlus className='mr-2 h-5 w-5' />
                            </Button>
                        </div>
                    </div>
                    <div className='space-y-4 sm:space-y-6'>
                        <div className='grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4'>
                            <div className='flex flex-col rounded-xl border bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-800'>
                                <div className='p-4 md:p-5'>
                                    <div className='flex items-center justify-between'>
                                        <div>
                                            <h2 className='font-weight: 700; text-[20px]  font-semibold text-[#434343]'>Total Available Balance</h2>
                                            <p className='font-weight: 600; text-[22px]  font-semibold text-[#000000]'>
                                                $ {summaryData?.totalAvailableBalance || 0}
                                            </p>
                                        </div>
                                        <div>
                                            <img className='h-16 w-auto' src='/coin.png' alt='' style={{ margin: '0 auto' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col rounded-xl border bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-800'>
                                <div className='p-4 md:p-5'>
                                    <div className='flex items-center justify-between'>
                                        <div>
                                            <h2 className='font-weight: 700; text-[20px]  font-semibold text-[#434343]'>Invested</h2>
                                            <p className='font-weight: 600; text-[22px]  font-semibold text-[#000000]'>$ {summaryData?.invested || 0}</p>
                                        </div>
                                        <div>
                                            <img className='h-16 w-auto' src='/financialProfit.png' alt='' style={{ margin: '0 auto' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col rounded-xl border bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-800'>
                                <div className='p-4 md:p-5'>
                                    <div className='flex items-center justify-between'>
                                        <div>
                                            <h2 className='font-weight: 700; text-[20px]  font-semibold text-[#434343]'>Profilt</h2>
                                            <p className='font-weight: 600; text-[22px]  font-semibold text-[#000000]'>$ {summaryData?.profit || 0}</p>
                                        </div>
                                        <div>
                                            <span className='inline-flex items-center gap-x-1 rounded-md bg-teal-100 px-4 py-[12px] text-xs font-medium text-teal-800 dark:bg-teal-500/10 dark:text-teal-500'>
                                                +12.09%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col rounded-xl border bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-800'>
                                <div className='p-4 md:p-5'>
                                    <div className='flex items-center justify-between'>
                                        <div>
                                            <h2 className='font-weight: 700; text-[20px]  font-semibold text-[#434343]'>Goals Balance</h2>
                                            <p className='font-weight: 600; text-[22px]  font-semibold text-[#000000]'>$ {summaryData?.goalsBalance || 0}</p>
                                        </div>
                                        <div>
                                            <img className='h-16 w-auto' src='/award.png' alt='' style={{ margin: '0 auto' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default FinancialSummaryPage;
