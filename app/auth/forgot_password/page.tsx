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

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isMobilenoLoading, setIsMobilenoLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [errorEmail, setEmailError] = useState<string | null>(null);

    //Email Validation
    function validateEmail(inputEmailId: string): boolean {
        const specialCharacterRegex = /[@.]+/;
        const hasSpecialCharacter = specialCharacterRegex.test(inputEmailId);

        if (!hasSpecialCharacter) {
            setEmailError('Email should contain the special characters.');
            return false;
        }
        setEmailError(null);
        return true;
    }

    useEffect(() => {
        setIsPasswordValid(!error);
    }, [error]);

    //  Generate Email OTP
    async function onGenerateEmailOTP(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        try {
            const formData = new FormData(event.currentTarget);
            const email = formData.get('inputEmailId') as string;
            const OTPType = 'EmailId';
            const queryString = `EmailMobileNo=${encodeURIComponent(email)}&OTPType=${encodeURIComponent(OTPType)}`;

            const url = `https://orbitalwebapi-stagging.azurewebsites.net/api/User/GenerateOTPForForgotPassword?${queryString}`;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const dataRes = await response.json();
            if (dataRes.success == true) {
                localStorage.setItem('EmailOTP', dataRes.data.otp);
                localStorage.setItem('otpType', dataRes.data.otpType);
                localStorage.setItem('userId', dataRes.data.userId);
                //
                await new Promise(resolve => setTimeout(resolve, 1000));
                toast.success(dataRes.message);
                await router.push('/auth/forgot_password_verification');
            } else {
                toast.warning(dataRes.message);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    //  Generate Mobile OTP
    async function onGenerateMobileOTP(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsMobilenoLoading(true);
        try {
            const formData = new FormData(event.currentTarget);
            const Phoneno = formData.get('InputphoneNo') as string;
            const OTPType = 'MobileNo';
            const queryString = `EmailMobileNo=${encodeURIComponent(Phoneno)}&OTPType=${encodeURIComponent(OTPType)}`;

            const url = `https://orbitalwebapi-stagging.azurewebsites.net/api/User/GenerateOTPForForgotPassword?${queryString}`;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const dataRes = await response.json();
            if (dataRes.success == true) {
                localStorage.setItem('MobileOTP', dataRes.data.otp);
                localStorage.setItem('otpType', dataRes.data.otpType);
                localStorage.setItem('userId', dataRes.data.userId);
                //
                await new Promise(resolve => setTimeout(resolve, 1000));
                toast.success(dataRes.message);
                await router.push('/auth/forgot_password_verification');
            } else {
                toast.warning(dataRes.message);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsMobilenoLoading(false);
        }
    }

    return (
        <div className='flex min-h-screen items-center justify-center bg-[#f2f8f6]'>
            <div className='mx-auto max-w-[640px]  px-4 py-10 sm:px-6 md:min-w-[640px] lg:min-w-[640px] lg:px-8 lg:py-14'>
                <div className='mx-auto max-w-2xl'>
                    <div className='relative mt-5 items-center  justify-center rounded-xl border bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900 sm:mt-10 md:p-6'>
                        <div className='mb-4 flex items-center justify-center sm:mb-4'>
                            <img className='h-12 w-auto' src='/orbital_logo.png' alt='' style={{ margin: '0 auto' }} />
                        </div>
                        <div className='mb-6 text-center sm:mb-6'>
                            <h1 className='mb-2 block text-2xl font-bold text-[#000000] dark:text-white sm:mb-2'>Forgot Password</h1>
                        </div>

                        <form onSubmit={onGenerateEmailOTP}>
                            <div className='mb-3 text-left sm:mb-3'>
                                <label className='font-weight: 400;  text-[12px] text-[#6C6C6C] '>
                                    A six-digit one-time password (OTP) will be sent to the email address
                                </label>
                            </div>
                            <div className='mb-4 sm:mb-4'>
                                <label htmlFor='inputEmailId' className='font-weight:600; mb-1 block  text-[14px] text-[#505050]'>
                                    Enter Registered Email Address <span className='text-red-500'>*</span>
                                </label>
                                <Input
                                    id='inputEmailId'
                                    onChange={e => validateEmail(e.target.value)}
                                    name='inputEmailId'
                                    type='text'
                                    className='block w-full rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-[#01B286] focus:ring-[#01B286] disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600'
                                    placeholder='e.g user@kidvest.co'
                                    autoComplete='off'
                                    required
                                    style={{ color: 'black' }}
                                />

                                <div className='mt-1 text-start'>
                                    {errorEmail && <div className='font-weight: 400; block text-xs text-[#ff5454]'>{errorEmail}</div>}
                                </div>
                            </div>
                            <div className='mt-6 grid'>
                                <Button
                                    type='submit'
                                    disabled={!isPasswordValid || isLoading}
                                    className='inline-flex w-full items-center justify-center gap-x-2 rounded-[6px] border border-transparent bg-[#01B286] px-4 py-3 text-sm font-semibold text-white hover:bg-[#01B286] disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>
                                    {' '}
                                    {isLoading ? (
                                        <>
                                            <BsArrowRepeat className='animate-spin' />
                                            <span className='ml-2'>Sending OTP...</span>
                                        </>
                                    ) : (
                                        'Send OTP'
                                    )}
                                </Button>
                            </div>
                        </form>
                        <div className='flex items-center py-3 text-xs uppercase text-gray-400 before:me-6 before:flex-1 before:border-t before:border-gray-200 after:ms-6 after:flex-1 after:border-t after:border-gray-200 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600'>
                            Or
                        </div>
                        <form onSubmit={onGenerateMobileOTP}>
                            <div className=' mb-3 mt-3 text-left sm:mb-3'>
                                <label className='font-weight: 400;  text-[12px] text-[#6C6C6C] '>
                                    A six-digit one-time password (OTP) will be sent to the Mobile number.
                                </label>
                            </div>
                            <div className='mb-2 sm:mb-2'>
                                <label htmlFor='InputphoneNo' className='font-weight:600; mb-1  block  text-[14px] text-[#505050]'>
                                    Enter Registered Mobile No <span className='text-red-500'>*</span>
                                </label>
                                <Input
                                    id='InputphoneNo'
                                    type='number'
                                    name='InputphoneNo'
                                    className='block w-full rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-[#01B286] focus:ring-[#01B286] disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600'
                                    required
                                    style={{ color: 'black' }}
                                />
                            </div>
                            <div className='mt-6 grid'>
                                <Button
                                    type='submit'
                                    disabled={!isPasswordValid || isMobilenoLoading}
                                    className='inline-flex w-full items-center justify-center gap-x-2 rounded-[6px] border border-transparent bg-[#01B286] px-4 py-3 text-sm font-semibold text-white hover:bg-[#01B286] disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>
                                    {' '}
                                    {isMobilenoLoading ? (
                                        <>
                                            <BsArrowRepeat className='animate-spin' />
                                            <span className='ml-2'>Sending OTP...</span>
                                        </>
                                    ) : (
                                        'Send OTP'
                                    )}
                                </Button>
                            </div>
                        </form>
                        <div className='mt-4 text-center'>
                            <Button
                                variant='secondary'
                                onClick={() => router.push('/')}
                                className='inline-flex w-full items-center justify-center gap-x-2 rounded-[6px] border border-transparent px-4 py-3 text-sm font-bold text-[#000000] underline disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>
                                Already Have an account ? Login
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
