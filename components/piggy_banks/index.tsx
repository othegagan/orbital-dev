'use client';
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from 'react-icons/bs';
import ActiveCardsDetailsPage from '../active_cards';
import PlaidComponentPage from '../plaid_component';
import { Button } from '../ui/button';

const BanksDetailsPage = () => {
    const slideLeft = () => {
        var slider = document.getElementById('slider');
        if (slider) {
            slider.scrollLeft = slider.scrollLeft - 500;
        }
    };

    const slideRight = () => {
        var slider = document.getElementById('slider');
        if (slider) {
            slider.scrollLeft = slider.scrollLeft + 500;
        }
    };

    return (
        <>
            <section id='contact' className='mt-2 md:mt-0 lg:mt-0'>
                <div className='shadow-three dark:bg-gray-dark container rounded-sm  md:p-[24px] lg:mb-8 lg:p-[0px]  xl:p-[0px]'>
                    <div className='flex items-center justify-between pb-3 pt-3'>
                        <div>
                            <h2 className='font-weight: 700;  text-[18px] text-[#545454]'>Banks Details</h2>
                        </div>
                        <div>
                            <Button variant='outlineCustom'>See All</Button>
                        </div>
                    </div>
                    <div className='space-y-4 sm:space-y-6'>
                        <div className='grid grid-cols-1 gap-4 sm:gap-6'>
                            {/* <div className="flex flex-col border shadow-sm bg-white rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
                                <div className="p-4 md:p-5">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h2 className="text-[20px] font-semibold text-[#000000]  font-weight: 700;">
                                              Banks
                                            </h2>
                                        </div>
                                        <div>
                                            <Button variant="secondaryGreenwithIcon">
                                                <span className="mr-2" >Add Bank</span>
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">

                                    </div>
                                </div>
                            </div> */}
                            <div className='flex flex-col rounded-xl border bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-800'>
                                <div className='p-4 md:p-5'>
                                    <div className='flex items-center justify-end'>
                                        <PlaidComponentPage />
                                    </div>
                                    <div className='relative flex items-center '>
                                        <BsArrowLeftSquareFill className='cursor-pointer opacity-50 hover:opacity-100' onClick={slideLeft} size={20} />
                                        <div id='slider' className='scroll container ml-1 mr-1  mt-8 overflow-x-scroll scroll-smooth scrollbar-hide'>
                                            <ActiveCardsDetailsPage />
                                        </div>
                                        <BsArrowRightSquareFill className='cursor-pointer opacity-50 hover:opacity-100' onClick={slideRight} size={20} />
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

export default BanksDetailsPage;
