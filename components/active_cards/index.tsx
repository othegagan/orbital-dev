import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@radix-ui/react-label';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const ActiveCardsDetailsPage = () => {
    const [loading, setLoading] = useState(false);
    const [accounts, setAccounts] = useState<any[]>([]);
    const [IsPlaidAccessToken, setIsPlaidAccessToken] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const userDataDetails = localStorage.getItem('userData');
        const isPlaidTokenValue = localStorage.getItem('plaidAccessToken');
        setIsPlaidAccessToken(isPlaidTokenValue || '');
        if (userDataDetails) {
            const userData = JSON.parse(userDataDetails);
            setUserId(userData.userId);
        } else {
            console.log('Data not found in localStorage');
        }
    }, []);

    useEffect(() => {
        if (userId) {
            GetCardDetails(userId);
        }
    }, [userId]);

    async function GetCardDetails(userIdValue: string | number | boolean) {
        try {
            setLoading(true);
            const queryString = `UserId=${encodeURIComponent(userIdValue)}`;
            const url = `https://orbitalwebapi-stagging.azurewebsites.net/api/Plaid/GetUserAccountsv2?${queryString}`;

            const response = await axios.post(url, null, {});

            const dataRes = response.data;

            if (dataRes.success) {
                // Merge bankAccounts into one array
                const mergedBankAccounts = dataRes.data.reduce((acc: string | any[], curr: { bankAccounts: any }) => {
                    return acc.concat(curr.bankAccounts);
                }, []);
                setAccounts(mergedBankAccounts);

                // toast.success(dataRes.message);
            } else {
                toast.warning(dataRes.message);
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while fetching card details. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className='flex h-20 items-center justify-center'>
                <p> Loading cards ....</p>
            </div>
        );
    }

    return (
        <>
            {/* <Carousel
                opts={{
                    align: 'start',
                }}
                className=" ">
                <CarouselContent>
                    {accounts.map((account: any, accountIndex: any) => (
                        <CarouselItem
                            key={accountIndex}
                            className=' md:basis-1/2 lg:basis-1/2 flex flex-col rounded-[12px] border bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-800'>
                            <div className='p-4 '>
                                <div className='flex items-center justify-between'>
                                    <div>
                                        <h2 className=' text-[18px]  font-semibold text-[#707070]'>**** **** **** {account.accountNoMask}</h2>
                                    </div>
                                    {account.isActive ? (
                                        <div>
                                            <span className='inline-flex items-center gap-x-1 rounded-[20px] bg-teal-100 px-4 py-[4px] text-xs font-medium text-teal-800 dark:bg-teal-500/10 dark:text-teal-500'>
                                                Active
                                            </span>
                                        </div>
                                    ) : (
                                        <div>
                                            <span className='inline-flex items-center gap-x-1 rounded-[20px] bg-red-100 px-4 py-[4px] text-xs font-medium text-red-800 dark:bg-red-500/10 dark:text-red-500'>
                                                In Active
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h2 className=' text-[16px]  font-semibold text-[#000000]'>{account.accountName}</h2>
                                </div>

                                <div>
                                    <h2 className='  text-[16px] text-[#747474]'>
                                        Balance : <span className=' text-[14px]  font-semibold text-[#000000]'>{account.availableBalance}</span>
                                    </h2>
                                </div>

                                <div className='pt-2 md:pt-2'>
                                    <div className='flex justify-start'>
                                        <Popover>
                                            <PopoverTrigger>
                                                <Button size='sm' variant='link' className='underline underline-offset-2'>
                                                    See Details
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent align='end'>
                                                <div className='grid gap-4'>
                                                    <div className='space-y-2'>
                                                        <h4 className='font-medium leading-none'>{account.accountName}</h4>
                                                    </div>
                                                    <div className='grid gap-2  text-sm'>
                                                        <div className='grid grid-cols-2 items-center gap-4'>
                                                            <Label className='font-semibold'>Type : </Label>
                                                            <p>{account.accountType}</p>
                                                        </div>
                                                        <div className='grid grid-cols-2 items-center gap-4'>
                                                            <Label className='font-semibold'>Sub Type : </Label>
                                                            <p>{account.accountSubType}</p>
                                                        </div>
                                                        <div className='grid grid-cols-2 items-center gap-4'>
                                                            <Label className='whitespace-nowrap font-semibold'>Available Balance : </Label>
                                                            <p>{account.availableBalance}</p>
                                                        </div>
                                                        <div className='grid grid-cols-2 items-center gap-4'>
                                                            <Label className='font-semibold'>Current Balance : </Label>
                                                            <p>{account.currentBalance}</p>
                                                        </div>
                                                        <div className='grid grid-cols-2 items-center gap-4'>
                                                            <Label className='font-semibold'>Currency Code : </Label>
                                                            <p>{account.currencyCode}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel> */}

            <Carousel
                opts={{
                    align: 'start',
                }}
                className=''>
                <CarouselContent>
                {accounts.map((account: any, accountIndex: any) => (
                        <CarouselItem key={accountIndex} className='md:basis-1/2 lg:basis-1/3'>
                            <div className='p-1'>
                                <Card>
                                    <CardContent className='flex h-48 flex-col justify-between p-6'>
                                        <div className='flex items-center justify-between pt-1'>
                                            <p className='font-semibold tracking-wider'>**** **** **** {account.accountNoMask}</p>
                                            {account.isActive ? (
                                        <div>
                                            <span className='inline-flex items-center gap-x-1 rounded-[20px] bg-teal-100 px-4 py-[4px] text-xs font-medium text-teal-800 dark:bg-teal-500/10 dark:text-teal-500'>
                                                Active
                                            </span>
                                        </div>
                                    ) : (
                                        <div>
                                            <span className='inline-flex items-center gap-x-1 rounded-[20px] bg-red-100 px-4 py-[4px] text-xs font-medium text-red-800 dark:bg-red-500/10 dark:text-red-500'>
                                                In Active
                                            </span>
                                        </div>
                                    )}
                                        </div>
                                        <h2>{account.accountName}</h2>
                                        <div className='pt-4 sm:pt-6'>
                                            <div className='flex justify-between items-end'>
                                                <div className=''>
                                                    <p className='text-sm'>Balance</p>
                                                    <p className='text-base font-bold tracking-widest'>{account.availableBalance}</p>
                                                </div>
                                                <div className=''>
                                                    <p className='text-sm'>Currency Code</p>
                                                    <p className='text-base font-bold tracking-widest'>{account.currencyCode}</p>
                                                </div>

                                                <Popover>
                                            <PopoverTrigger>
                                            <Button size="sm" variant="link">See Details</Button>
                                            </PopoverTrigger>
                                            <PopoverContent align='end'>
                                                <div className='grid gap-4'>
                                                    <div className='space-y-2'>
                                                        <h4 className='font-medium leading-none'>{account.accountName}</h4>
                                                    </div>
                                                    <div className='grid gap-2  text-sm capitalize'>
                                                        <div className='grid grid-cols-2 items-center gap-4'>
                                                            <Label className='font-semibold'>Type : </Label>
                                                            <p>{account.accountType}</p>
                                                        </div>
                                                        <div className='grid grid-cols-2 items-center gap-4'>
                                                            <Label className='font-semibold'>Sub Type : </Label>
                                                            <p>{account.accountSubType}</p>
                                                        </div>
                                                        <div className='grid grid-cols-2 items-center gap-4'>
                                                            <Label className='whitespace-nowrap font-semibold'>Available Balance : </Label>
                                                            <p>{account.availableBalance}</p>
                                                        </div>
                                                        <div className='grid grid-cols-2 items-center gap-4'>
                                                            <Label className='font-semibold'>Current Balance : </Label>
                                                            <p>{account.currentBalance}</p>
                                                        </div>
                                                        <div className='grid grid-cols-2 items-center gap-4'>
                                                            <Label className='font-semibold'>Currency Code : </Label>
                                                            <p>{account.currencyCode}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </PopoverContent>
                                        </Popover>

                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </>
    );
};

export default ActiveCardsDetailsPage;
