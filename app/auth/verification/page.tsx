'use client';
import { toast } from 'react-toastify';
import { Input } from '@/components/ui/input';
import React, { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { BsArrowRepeat } from 'react-icons/bs';
import { FaCheck } from 'react-icons/fa';

export default function VerificationPage() {
    const router = useRouter();
    const [isVerified, setIsVerified] = useState(false);
    const [isMobiileVerified, setIsMobileVerified] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isMobileLoading, setIsMobileLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [userSignupData, setUserSignupData] = useState(null);

    const [userName, setuserName] = useState();
    const [phoneNo, setphoneNo] = useState();

    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [isPhoneVerified, setIsPhoneVerified] = useState(false);

    const [userID, setUserID] = useState(null);
    useEffect(() => {
        //Get Local Storage Data
        const userSignupDataDetails = localStorage.getItem('userSignupData');
        if (userSignupDataDetails) {
            setIsPasswordValid(!error);
            const userData = JSON.parse(userSignupDataDetails);
            setUserSignupData(JSON.parse(userSignupDataDetails));
            setUserID(userData.data.userId);
            //Fetch Email OTP
            fetchEmailOTP(userData.data.userId);
            //Fetch Mobile OTP
            fetchMobileOTP(userData.data.userId);
        } else {
            console.log('Data not found in localStorage');
        }
    }, []);

    useEffect(() => {
        if (isEmailVerified && isPhoneVerified) {
            router.push('/');
        }
    }, [isEmailVerified, isPhoneVerified]);

    //Fetch Email OTP
    async function fetchEmailOTP(userId: any) {
        try {
            const OTPType = 'EmailId';
            const url = `https://orbitalwebapi-stagging.azurewebsites.net/api/User/GenerateOTP?UserId=${userId}&OTPType=${OTPType}`;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const dataRes = await response.json();
            if (dataRes.success) {
            } else {
                setIsVerified(true);
                console.error(dataRes.message);
            }
        } catch (error) {
            console.error('Error while fetching OTP:', error);
        }
    }
    //Fetch Mobile OTP
    async function fetchMobileOTP(userId: any) {
        try {
            const OTPType = 'MobileNo';
            const url = `https://orbitalwebapi-stagging.azurewebsites.net/api/User/GenerateOTP?UserId=${userId}&OTPType=${OTPType}`;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const dataRes = await response.json();
            if (dataRes.success) {
            } else {
                setIsMobileVerified(true);
                toast.error(dataRes.message);
            }
        } catch (error) {
            console.error('Error while fetching OTP:', error);
        }
    }

    //Verify Email OTP
    async function onVerifyEmailOTP(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        try {
            const formData = new FormData(event.currentTarget);
            const UserId = userID;
            if (!UserId) {
                toast.error('User ID not found');
                return;
            }
            const OTPType = 'EmailId' as string;

            const OTPString = formData.get('OTP') as string;
            const OTP = parseInt(OTPString);

            const queryString = `UserId=${encodeURIComponent(UserId)}&OTPType=${encodeURIComponent(OTPType)}&OTP=${encodeURIComponent(OTP)}`;

            const url = `https://orbitalwebapi-stagging.azurewebsites.net/api/User/VerifyOTP?${queryString}`;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const dataRes = await response.json();
            if (dataRes.success == true) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                setIsLoading(true);
                setIsVerified(true);
                setIsEmailVerified(dataRes.data.emailVerified);
                localStorage.setItem('emailVerified', dataRes.data.emailVerified);

                toast.success(dataRes.message);
                setuserName(dataRes.data.emailId);
                // await router.push("/dashboard");
            } else {
                toast.warning(dataRes.message);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    //Verify Mobile OTP
    async function onVerifyMobileOTP(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsMobileLoading(true);
        try {
            const formData = new FormData(event.currentTarget);
            const UserId = userID;
            if (!UserId) {
                toast.error('User ID not found');
                return;
            }
            const OTPType = 'MobileNo' as string;

            const OTPString = formData.get('mobileOTP') as string;
            const OTP = parseInt(OTPString);

            const queryString = `UserId=${encodeURIComponent(UserId)}&OTPType=${encodeURIComponent(OTPType)}&OTP=${encodeURIComponent(OTP)}`;

            const url = `https://orbitalwebapi-stagging.azurewebsites.net/api/User/VerifyOTP?${queryString}`;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const dataRes = await response.json();
            if (dataRes.success == true) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                setIsMobileLoading(true);
                setIsMobileVerified(true);
                setIsPhoneVerified(dataRes.data.mobileVerified);
                localStorage.setItem('mobileVerified', dataRes.data.mobileVerified);

                setphoneNo(dataRes.data.mobileNo);
                toast.success(dataRes.message);
                // await router.push("/dashboard");
            } else {
                toast.warning(dataRes.message);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsMobileLoading(false);
        }
    }

    return (
        <div className='flex min-h-screen items-center justify-center bg-[#f2f8f6]'>
            <div className='mx-auto max-w-[75rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14'>
                <div className='mx-auto max-w-2xl'>
                    <div className='relative mt-5 items-center  justify-center rounded-sm border bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900 sm:mt-10 md:p-10'>
                        <div className='mb-4 flex items-center justify-center sm:mb-4'>
                            <img className='h-12 w-auto' src='/orbital_logo.png' alt='' style={{ margin: '0 auto' }} />
                        </div>
                        <div className='mb-5 text-center sm:mb-5'>
                            <h1 className='mb-2 block text-2xl font-bold text-[#000000] dark:text-white sm:mb-2'>OTP Verification</h1>
                            <label className='text-sm-[16px] block w-full max-w-md font-medium  text-[#545454] '>
                                To get started, please To get started, please Sign Up To get started, please Sign Up
                            </label>
                        </div>
                        <form onSubmit={onVerifyEmailOTP}>
                            <div className='mb-4 sm:mb-4'>
                                <div className='mb-1 flex items-center justify-between sm:mb-1'>
                                    <label htmlFor='EmailId' className='font-weight: 600; mb-1 block font-medium text-[#545454] selection:text-sm'>
                                        Email OTP
                                        {!isVerified && <span className='text-red-500'>*</span>}
                                    </label>
                                    {isVerified && <div className='text-[14px] font-bold text-[#01B286]'>Verified</div>}
                                </div>
                                <div className=''>
                                    {!isVerified && (
                                        <InputOTP autoFocus type='number' name='OTP' required maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
                                            <InputOTPGroup className='required:true flex gap-3'>
                                                <InputOTPSlot
                                                    index={0}
                                                    className='h-10 rounded-md border border-gray-300  text-center sm:w-14 md:w-14 lg:w-16'
                                                />
                                                <InputOTPSlot
                                                    index={1}
                                                    className='h-10 rounded-md border border-gray-300 text-center sm:w-14 md:w-14 lg:w-16'
                                                />
                                                <InputOTPSlot
                                                    index={2}
                                                    className='h-10 rounded-md border border-gray-300 text-center sm:w-14 md:w-14 lg:w-16'
                                                />
                                                <InputOTPSlot
                                                    index={3}
                                                    className='h-10 rounded-md border border-gray-300 text-center sm:w-14 md:w-14 lg:w-16'
                                                />
                                                <InputOTPSlot
                                                    index={4}
                                                    className='h-10 rounded-md border border-gray-300 text-center sm:w-14 md:w-14 lg:w-16'
                                                />
                                                <InputOTPSlot
                                                    index={5}
                                                    className='h-10 rounded-md border border-gray-300 text-center sm:w-14 md:w-14 lg:w-16'
                                                />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    )}
                                    {isVerified && (
                                        <div className='relative'>
                                            <Input disabled value={userName} id='password' name='password' autoComplete='off' style={{ color: 'black' }} />
                                            <Button variant='outline' className='absolute end-0 top-0 p-3.5' type='button'>
                                                {' '}
                                                <FaCheck color='green' />{' '}
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {!isVerified && (
                                <div className='grid'>
                                    <Button
                                        type='submit'
                                        disabled={!isPasswordValid || isLoading}
                                        className='inline-flex w-full items-center justify-center gap-x-2 rounded-[6px] border border-transparent bg-[#01B286] px-4 py-3 text-sm font-semibold text-white hover:bg-[#01B286] disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>
                                        {' '}
                                        {isLoading ? (
                                            <>
                                                <BsArrowRepeat className='animate-spin' />
                                                <span className='ml-2'>Verifying OTP...</span>
                                            </>
                                        ) : (
                                            'Verify'
                                        )}
                                    </Button>
                                </div>
                            )}
                        </form>

                        <form onSubmit={onVerifyMobileOTP} className='mt-4 sm:mt-4'>
                            <div className='mb-4 sm:mb-4'>
                                <div className='mb-1 flex items-center justify-between sm:mb-1'>
                                    <label htmlFor='EmailId' className='font-weight: 600; mb-1 block font-medium text-[#545454] selection:text-sm'>
                                        Phone OTP
                                        {!isMobiileVerified && <span className='text-red-500'>*</span>}
                                    </label>
                                    {isMobiileVerified && <div className='text-[14px] font-bold text-[#01B286]'>Verified</div>}
                                </div>
                                <div className=''>
                                    {!isMobiileVerified && (
                                        <InputOTP autoFocus maxLength={6} type='number' required name='mobileOTP' pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
                                            <InputOTPGroup className='flex gap-3'>
                                                <InputOTPSlot
                                                    index={0}
                                                    className='h-10 rounded-md border border-gray-300 text-center sm:w-14 md:w-14 lg:w-16'
                                                />
                                                <InputOTPSlot
                                                    index={1}
                                                    className='h-10 rounded-md border border-gray-300 text-center sm:w-14 md:w-14 lg:w-16'
                                                />
                                                <InputOTPSlot
                                                    index={2}
                                                    className='h-10 rounded-md border border-gray-300 text-center sm:w-14 md:w-14 lg:w-16'
                                                />
                                                <InputOTPSlot
                                                    index={3}
                                                    className='h-10 rounded-md border border-gray-300 text-center sm:w-14 md:w-14 lg:w-16'
                                                />
                                                <InputOTPSlot
                                                    index={4}
                                                    className='h-10 rounded-md border border-gray-300 text-center sm:w-14 md:w-14 lg:w-16'
                                                />
                                                <InputOTPSlot
                                                    index={5}
                                                    className='h-10 rounded-md border border-gray-300 text-center sm:w-14 md:w-14 lg:w-16'
                                                />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    )}

                                    {isMobiileVerified && (
                                        <div className='relative'>
                                            <Input disabled id='password' name='password' value={phoneNo} autoComplete='off' style={{ color: 'black' }} />
                                            <Button
                                                variant='outline'
                                                disabled={!isPasswordValid || isMobileLoading}
                                                className='absolute end-0 top-0 p-3.5'
                                                type='button'>
                                                {' '}
                                                <FaCheck color='green' />{' '}
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {!isMobiileVerified && (
                                <div className='mb-3 grid sm:mb-3'>
                                    <Button
                                        type='submit'
                                        disabled={!isPasswordValid || isMobileLoading}
                                        className='inline-flex w-full items-center justify-center gap-x-2 rounded-[6px] border border-transparent bg-[#01B286] px-4 py-3 text-sm font-semibold text-white hover:bg-[#01B286] disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>
                                        {' '}
                                        {isMobileLoading ? (
                                            <>
                                                <BsArrowRepeat className='animate-spin' />
                                                <span className='ml-2'>Verifying OTP...</span>
                                            </>
                                        ) : (
                                            'Verify'
                                        )}
                                    </Button>
                                </div>
                            )}
                        </form>

                        <div className='mb-5 text-left sm:mb-5'>
                            <label className='font-weight: 400; block text-xs text-[#000000]'>Don't Receive an OTP? Resend.</label>
                        </div>

                        <div className='mt-4 text-center'>
                            <Button
                                variant='secondary'
                                onClick={() => {
                                    router.push('/');
                                }}
                                className='inline-flex w-full items-center justify-center gap-x-2 rounded-[6px] border border-transparent px-4 py-3 text-sm font-bold text-[#000000] disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>
                                Skip OTP Verification
                            </Button>
                        </div>

                        <div className='mt-4 text-center'>
                            <Button
                                variant='secondary'
                                onClick={() => router.push('/')}
                                className='inline-flex w-full items-center justify-center gap-x-2 rounded-[6px] border border-transparent px-4 py-3 text-sm font-bold text-[#000000] disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>
                                Already Have an account ? Login
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
