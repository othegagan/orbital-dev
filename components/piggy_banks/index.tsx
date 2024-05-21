'use client';
import ActiveCardsDetailsPage from '../active_cards';
import PlaidComponentPage from '../plaid_component';
import { Button } from '../ui/button';

const BanksDetailsPage = () => {
    return (
        <>
            <section id='contact' className='mt-2 md:mt-0 lg:mt-0'>
                <div className='shadow-three dark:bg-gray-dark container rounded-sm  md:p-[24px] lg:mb-8 lg:p-[0px]  xl:p-[0px]'>
                    <div className='flex items-center justify-between pb-3 pt-3'>
                        <div>
                            <h2 className='font-weight: 700;  text-[18px] text-[#545454]'>Banks Details</h2>
                        </div>
                        <div className='flex items-center gap-4 flex-wrap'>
                            <Button variant='outlineCustom'>See All</Button>
                            <PlaidComponentPage />
                        </div>
                    </div>

                    <div className='mx-auto px-4'>
                        <ActiveCardsDetailsPage />
                    </div>
                </div>
            </section>
        </>
    );
};

export default BanksDetailsPage;
