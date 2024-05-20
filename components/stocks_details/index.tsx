'use client';

const TopStocksDetailsPage = () => {
    const stocksData = [
        {
            name: 'Vodafone Idea',
            price: '$12.06',
            change: '+$23.98 (10.08%)',
            image: '/coin.png',
        },
        {
            name: 'Apple Inc.',
            price: '$145.92',
            change: '+$2.16 (1.50%)',
            image: '/award.png',
        },
        {
            name: 'Microsoft Corporation',
            price: '$261.97',
            change: '-$1.32 (0.50%)',
            image: '/BellIcon.png',
        },
        {
            name: 'Tesla Inc.',
            price: '$720.97',
            change: '-$14.28 (1.94%)',
            image: '/phoneverify.png',
        },
        {
            name: 'Amazon.com Inc.',
            price: '$3,453.96',
            change: '+$9.83 (0.28%)',
            image: '/profile.png',
        },
        {
            name: 'Vodafone Idea',
            price: '$12.06',
            change: '+$23.98 (10.08%)',
            image: '/coin.png',
        },
        {
            name: 'Apple Inc.',
            price: '$145.92',
            change: '+$2.16 (1.50%)',
            image: '/award.png',
        },
        {
            name: 'Microsoft Corporation',
            price: '$261.97',
            change: '-$1.32 (0.50%)',
            image: '/BellIcon.png',
        },
        {
            name: 'Tesla Inc.',
            price: '$720.97',
            change: '-$14.28 (1.94%)',
            image: '/phoneverify.png',
        },
        {
            name: 'Amazon.com Inc.',
            price: '$3,453.96',
            change: '+$9.83 (0.28%)',
            image: '/profile.png',
        },
        {
            name: 'Vodafone Idea',
            price: '$12.06',
            change: '+$23.98 (10.08%)',
            image: '/coin.png',
        },
        {
            name: 'Apple Inc.',
            price: '$145.92',
            change: '+$2.16 (1.50%)',
            image: '/award.png',
        },
        {
            name: 'Microsoft Corporation',
            price: '$261.97',
            change: '-$1.32 (0.50%)',
            image: '/BellIcon.png',
        },
        {
            name: 'Tesla Inc.',
            price: '$720.97',
            change: '-$14.28 (1.94%)',
            image: '/phoneverify.png',
        },
        {
            name: 'Amazon.com Inc.',
            price: '$3,453.96',
            change: '+$9.83 (0.28%)',
            image: '/profile.png',
        },
    ];
    return (
        <>
            <section id='contact' className='mt-2 overflow-hidden md:mt-0 lg:mt-0'>
                <div className='shadow-three dark:bg-gray-dark container rounded-sm  md:p-[24px] lg:mb-8 lg:p-[0px]  xl:p-[0px]'>
                    <div className='space-y-4 sm:space-y-6'>
                        <div className='grid gap-2 sm:grid-cols-1 sm:gap-2 md:grid-cols-3 lg:grid-cols-5'>
                            {stocksData.map((stock, index) => (
                                <div key={index} className='flex flex-col rounded-xl border bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-800'>
                                    <div className='p-4 md:p-5'>
                                        <div className='mb-6 flex  lg:justify-start'>
                                            <div>
                                                <img className='h-16 w-auto' src={stock.image} alt='' style={{ margin: '0 auto' }} />
                                            </div>
                                        </div>
                                        <div className='flex  lg:justify-start'>
                                            <div>
                                                <h2 className='font-weight: 600; text-[16px]  font-bold text-[#000000]'>{stock.name}</h2>
                                            </div>
                                        </div>
                                        <div className='flex lg:justify-start'>
                                            <div>
                                                <h2 className='font-weight: 400; text-[16px]  font-semibold text-[#000000]'>{stock.price}</h2>
                                            </div>
                                        </div>
                                        <div className='mt-3 flex lg:justify-start'>
                                            <div>
                                                <h2 className='font-weight: 600; text-[14px]  font-bold text-[#01B286]'>{stock.change}</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default TopStocksDetailsPage;
