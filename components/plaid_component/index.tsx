import { Button } from '../ui/button';
import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { safeJSONParse } from '@/lib/utils';

const PlaidComponentPage = ({ section }: { section?: string }) => {
    const [linkToken, setLinkToken] = useState(null);
    const [publicToken, setPublicToken] = useState('');
    const [AccessToken, setAccessToken] = useState('');

    const [userIdvalue, setuserId] = useState('');
    useEffect(() => {
        const userDataDetails = localStorage.getItem('userData');
        if (userDataDetails) {
            const userData = JSON.parse(userDataDetails);
            setuserId(userData.userId);
        } else {
            console.log('Data not found in localStorage');
        }
    });

    //Link Token
    async function onClickGetLinkToken() {
        try {
            const userId = userIdvalue;
            const queryString = `UserId=${encodeURIComponent(userId)}`;

            const url = `https://orbitalwebapi-stagging.azurewebsites.net/api/Plaid/GetLinkToken?${queryString}`;

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const dataRes = await response.json();
            if (dataRes.success == true) {
                toast.success(dataRes.message);
                setLinkToken(dataRes.data.link_token);
            } else {
                toast.warning(dataRes.message);
            }
        } catch (error) {
            console.error(error);
        } finally {
            console.error('');
        }
    }

    //Plaid
    const { open, ready } = usePlaidLink({
        token: linkToken,
        onSuccess: (public_token: string, metadata) => {
            setPublicToken(public_token);
            // console.log('Public_Token', public_token);
            //Access Token
            onClickGetAccessToken(public_token);
        },
    });

    useEffect(() => {
        if (linkToken) {
            open();
        }
    }, [linkToken, open]);

    //Access Token
    async function onClickGetAccessToken(public_token: string) {
        try {
            const userId = userIdvalue;
            const queryString = `UserId=${encodeURIComponent(userId)}&publicToken=${encodeURIComponent(public_token)}`;

            const url = `https://orbitalwebapi-stagging.azurewebsites.net/api/Plaid/GetAccessToken?${queryString}`;

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const dataRes = await response.json();
            if (dataRes.success == true) {
                toast.success(dataRes.message);
                //
                const userDataDetails = localStorage.getItem('userData');
                const userDataParsed = safeJSONParse(userDataDetails);

                userDataParsed.plaidBankDetailExist = true;

                setAccessToken(dataRes.data.accessToken);

                const accessToken = dataRes.data.accessToken.replace(/"/g, '');
                localStorage.setItem('plaidAccessToken', accessToken);

                window.location.reload();
            } else {
                toast.warning(dataRes.message);
            }
        } catch (error) {
            console.error(error);
        } finally {
            console.error('');
        }
    }

    return (
        <>
            <section id='contact' className=' overflow-hidden'>
                <div className='grid grid-cols-1 gap-4 sm:gap-6'>
                    <Button
                        onClick={onClickGetLinkToken}
                        type='submit'
                        className='inline-flex w-full items-center justify-center gap-x-2 rounded-[12px] border border-transparent bg-[#01B286] py-3 text-sm font-semibold text-white hover:bg-[#01B286] disabled:pointer-events-none disabled:opacity-50
                 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>
                        {section == 'hero' ? 'Link a Savings / Current Accout' : 'Add Accounts'}{' '}
                    </Button>
                </div>
            </section>
        </>
    );
};

export default PlaidComponentPage;
