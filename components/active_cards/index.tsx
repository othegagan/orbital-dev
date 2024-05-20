import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { toast } from 'react-toastify';
import axios from 'axios';

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
                setAccounts(dataRes.data);
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
            <div className=' flex items-center gap-2'>
                {accounts?.map((bank, bankIndex) => (
                    <div key={bankIndex}>
                        {bank.bankAccounts.map((account: any, accountIndex: any) => (
                            <div
                                key={accountIndex}
                                className='flex flex-col rounded-[12px] border bg-[#fafafa] shadow-sm dark:border-neutral-700 dark:bg-neutral-800'>
                                <div className='p-4 md:p-4'>
                                    <div className='flex items-center justify-between'>
                                        <div>
                                            <h2 className='font-weight: 700; text-[18px]  font-semibold text-[#707070]'>
                                                **** **** **** {account.accountNoMask}
                                            </h2>
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
                                        <h2 className='font-weight: 700; text-[16px]  font-semibold text-[#000000]'>{account.accountName}</h2>
                                    </div>
                                    <div className='grid gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-2 lg:grid-cols-4'>
                                        <div className='pt-2 md:pt-3'>
                                            <div className='flex  lg:justify-start'>
                                                <div>
                                                    <h2 className='font-weight: 700;  text-[16px] text-[#747474]'>Current Balance</h2>
                                                    <p className='font-weight: 600; text-[14px]  font-semibold text-[#000000]'>{account.currentBalance}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='pt-2 md:pt-3'>
                                            <div className='flex lg:justify-center'>
                                                <div>
                                                    <h2 className='font-weight: 700;  text-[16px] text-[#747474]'>Available Balance</h2>
                                                    <p className='font-weight: 600; text-[14px]  font-semibold text-[#000000]'>{account.availableBalance}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='pt-2 md:pt-3'>
                                            <div className='flex  lg:justify-center'>
                                                <div>
                                                    <h2 className='font-weight: 700;  text-[16px] text-[#747474]'>Account Type</h2>
                                                    <p className='font-weight: 600; text-[14px]  font-semibold text-[#000000]'>{account.accountType}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='pt-2 md:pt-3'>
                                            <div className='flex lg:justify-end'>
                                                <div>
                                                    <h2 className='font-weight: 700;  text-[16px] text-[#747474]'>Currency Type</h2>
                                                    <p className='font-weight: 600; text-[14px]  font-semibold text-[#000000]'>{account.currencyCode}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='pt-2 md:pt-2'>
                                        <div className='flex justify-start'>
                                            <div>
                                                <Button variant='outlineCustom'>See Details</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
};

export default ActiveCardsDetailsPage;
