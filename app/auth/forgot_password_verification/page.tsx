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

export default function ForgotVerificationPage() {
    const router = useRouter();
    const [isResetBtnVerified, setisResetBtnVerified] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [isMobiileVerified, setIsMobileVerified] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [userSignupData, setUserSignupData] = useState(null);

    const [EmailOTP, setEmailOTP] = useState('');
    const [MobileOTP, setMobileOTP] = useState('');
    const [userName, setuserName] = useState();
    const [phoneNo, setphoneNo] = useState();
    const [userID, setUserID] = useState('');
    const [isEmailForm, setIsEmailForm] = useState(true);
    const [isMobileNoForm, setisMobileNoForm] = useState(true);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [isPhoneVerified, setIsPhoneVerified] = useState(false);

    useEffect(() => {
        // Get Local Storage Data
        const isUserIdValue = localStorage.getItem('userId');
        const isQueryParam = localStorage.getItem('otpType');
        const storedOTP = localStorage.getItem('EmailOTP');
        const storedMobileOTP = localStorage.getItem('MobileOTP');
        //
        if (storedMobileOTP) {
            setMobileOTP(storedMobileOTP);
        } else {
            console.log('Data not found in localStorage');
        }
        if (storedOTP) {
            setEmailOTP(storedOTP);
        } else {
            console.log('Data not found in localStorage');
        }
        if (isUserIdValue) {
            setUserID(isUserIdValue);
        } else {
            console.log('Data not found in localStorage');
        }
        setIsEmailForm(isQueryParam === 'EmailId');
        setisMobileNoForm(isQueryParam === 'MobileNo');
        //
        setIsPasswordValid(!error);
    }, [error]);

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

            const url = `https://orbitalwebapi-stagging.azurewebsites.net/api/User/VerifyOTPForForgotPassword?${queryString}`;

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
                setisResetBtnVerified(true);
                //
                setIsEmailVerified(dataRes.data.emailVerified);
                localStorage.setItem('emailVerified', dataRes.data.emailVerified);
                localStorage.setItem('userId', dataRes.data.userId);
                localStorage.setItem('Username', dataRes.data.emailId);

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
        setIsLoading(true);
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
                setIsLoading(true);
                setIsMobileVerified(true);
                setisResetBtnVerified(true);
                //
                setIsPhoneVerified(dataRes.data.mobileVerified);
                localStorage.setItem('mobileVerified', dataRes.data.mobileVerified);
                localStorage.setItem('userId', dataRes.data.userId);
                localStorage.setItem('phoneNo', dataRes.data.mobileNo);
                setphoneNo(dataRes.data.mobileNo);
                toast.success(dataRes.message);
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

    return (
        <div className='flex min-h-screen items-center justify-center bg-[#f2f8f6]'>
            <div className='mx-auto max-w-[75rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14'>
                <div className='mx-auto max-w-2xl'>
                    <div className='relative mt-5 items-center  justify-center rounded-sm border bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900 sm:mt-10 md:p-10'>
                        <div className='mb-4 flex items-center justify-center sm:mb-4'>
                            <img className='h-12 w-auto' src='/orbital_logo.png' alt='' style={{ margin: '0 auto' }} />
                        </div>
                        <div className='mb-5 text-center sm:mb-5'>
                            <h1 className='mb-2 block text-2xl font-bold text-[#000000] dark:text-white sm:mb-2'>Forgot Password</h1>
                        </div>
                        {isEmailForm && (
                            <form onSubmit={onVerifyEmailOTP}>
                                <div className='mb-5 text-left sm:mb-5'>
                                    <label className='block w-full max-w-md text-[12px]  text-[#6C6C6C] '>
                                        An OTP is sent to the registered email address user@gmail.com Please enter the 6 digit OTP and continue to verify.
                                    </label>
                                </div>
                                <div className='mb-4 sm:mb-4'>
                                    <div className='mb-1 flex items-center justify-between sm:mb-1'>
                                        <label htmlFor='EmailId' className='font-weight: 600; mb-1 block font-medium text-[#545454] selection:text-sm'>
                                            Enter Registered Email Address
                                            {!isVerified && <span className='text-red-500'>*</span>}
                                        </label>
                                        {isVerified && <div className='text-green-600'>Verified</div>}
                                    </div>
                                    <div className=''>
                                        {!isVerified && (
                                            <InputOTP
                                                autoFocus
                                                type='number'
                                                name='OTP'
                                                value={EmailOTP}
                                                required
                                                maxLength={6}
                                                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
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
                                                <Input
                                                    className='font-weight: 900; font-bold'
                                                    disabled
                                                    value={userName}
                                                    id='password'
                                                    name='password'
                                                    autoComplete='off'
                                                    style={{ color: 'black' }}
                                                />
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
                        )}

                        {isMobileNoForm && (
                            <form onSubmit={onVerifyMobileOTP} className='mt-4 sm:mt-4'>
                                <div className='mb-5 text-left sm:mb-5'>
                                    <label className='block w-full max-w-md text-[12px]  text-[#6C6C6C] '>
                                        An OTP is sent to the registered Mobile No 9999999999 Please enter the 6 digit OTP and continue to verify.
                                    </label>
                                </div>
                                <div className='mb-4 sm:mb-4'>
                                    <div className='mb-1 flex items-center justify-between sm:mb-1'>
                                        <label htmlFor='EmailId' className='font-weight: 600; mb-1 block font-medium text-[#545454] selection:text-sm'>
                                            Enter Registered Mobile No
                                            {!isMobiileVerified && <span className='text-red-500'>*</span>}
                                        </label>
                                        {isMobiileVerified && <div className='text-green-600'>Verified</div>}
                                    </div>
                                    <div className=''>
                                        {!isMobiileVerified && (
                                            <InputOTP
                                                autoFocus
                                                maxLength={6}
                                                type='number'
                                                value={MobileOTP}
                                                required
                                                name='mobileOTP'
                                                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
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
                                                <Input
                                                    className='font-weight: 900; font-bold'
                                                    disabled
                                                    id='password'
                                                    name='password'
                                                    value={phoneNo}
                                                    autoComplete='off'
                                                    style={{ color: 'black' }}
                                                />
                                                <Button
                                                    variant='outline'
                                                    disabled={!isPasswordValid || isLoading}
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
                        )}

                        <div className='mb-5 mt-4 text-left sm:mb-5'>
                            <label className='font-weight: 400; block text-xs text-[#000000]'>Don't Receive an OTP? Resend.</label>
                        </div>

                        {isResetBtnVerified && (
                            <div className='mb-3 grid sm:mb-3'>
                                <Button
                                    onClick={() => router.push('/auth/reset_password')}
                                    type='submit'
                                    disabled={!isPasswordValid || isLoading}
                                    className='inline-flex w-full items-center justify-center gap-x-2 rounded-[6px] border border-transparent bg-[#01B286] px-4 py-3 text-sm font-semibold text-white hover:bg-[#01B286] disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>
                                    {' '}
                                    {isLoading ? <BsArrowRepeat className='animate-spin' /> : 'Reset Password'}
                                </Button>
                            </div>
                        )}

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
