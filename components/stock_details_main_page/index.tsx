import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TopStocksDetailsPage from '../stocks_details';

export function StockDetailsMainPage() {
    return (
        <>
            <section id='contact' className='mt-2 overflow-hidden md:mt-0 lg:mt-0'>
                <div className='shadow-three dark:bg-gray-dark container rounded-sm  md:p-[24px] lg:mb-8 lg:p-[0px]  xl:p-[0px]'>
                    <div className='flex items-center justify-between pb-3 pt-3'>
                        <div>
                            <h2 className='font-weight: 700; text-[20px]  font-semibold text-[#000000]'>Top Stocks</h2>
                        </div>
                        <div>
                            <Button variant='outlineCustom'>See All</Button>
                        </div>
                    </div>
                    <Tabs defaultValue='today'>
                        <TabsList className='mb-20 grid   w-full grid-cols-2 gap-2 bg-[#f2f8f6] md:grid-cols-4 lg:mb-10 lg:grid-cols-9'>
                            <TabsTrigger
                                value='today'
                                className='h-9 rounded-[32px] border bg-[#ffffff] text-[#000000]   shadow-sm data-[state=active]:bg-[#01B286] data-[state=active]:text-[#f2f8f6]'>
                                Today
                            </TabsTrigger>
                            <TabsTrigger
                                value='thisWeek'
                                className='h-9 rounded-[32px] border bg-[#ffffff] text-[#000000] shadow-sm data-[state=active]:bg-[#01B286] data-[state=active]:text-[#f2f8f6]'>
                                This Month
                            </TabsTrigger>
                            <TabsTrigger
                                value='thisMonth'
                                className='h-9 rounded-[32px] border bg-[#ffffff] text-[#000000] shadow-sm  data-[state=active]:bg-[#01B286] data-[state=active]:text-[#f2f8f6]'>
                                This Week
                            </TabsTrigger>
                            <TabsTrigger
                                value='thisYear'
                                className='h-9 rounded-[32px] border bg-[#ffffff] text-[#000000] shadow-sm data-[state=active]:bg-[#01B286] data-[state=active]:text-[#f2f8f6]'>
                                This Year
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value='today'>
                            <div className='scroll container max-h-[450px] overflow-y-auto scroll-smooth scrollbar-hide'>
                                <TopStocksDetailsPage />
                            </div>
                        </TabsContent>
                        <TabsContent value='thisWeek'>
                            <div className='scroll container max-h-[450px] overflow-y-auto scroll-smooth scrollbar-hide'>
                                <TopStocksDetailsPage />
                            </div>
                        </TabsContent>
                        <TabsContent value='thisMonth'>
                            <div className='scroll container max-h-[450px] overflow-y-auto scroll-smooth scrollbar-hide'>
                                <TopStocksDetailsPage />
                            </div>
                        </TabsContent>
                        <TabsContent value='thisYear'>
                            <div className='scroll container max-h-[450px] overflow-y-auto scroll-smooth scrollbar-hide'>
                                <TopStocksDetailsPage />
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>
        </>
    );
}
