'use client';
import { toast } from 'react-toastify';
import { Input } from '@/components/ui/input';
import React, { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { BsArrowRepeat } from 'react-icons/bs';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Link from 'next/link';
import axios from 'axios';

export default function Login() {
    const router = useRouter();
    const [errorEmail, setEmailError] = useState<string | null>(null);
    const [isPasswordValid, setIsPasswordValid] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    //Email Validation
    function validateEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError('Invalid email');
            return false;
        }
        setEmailError(null);
        return true;
    }

    const [sp, ssp] = useState(true);

    function handleShwoPassword() {
        ssp(!sp);
    }

    //Submit
    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const formData = new FormData(event.currentTarget);
            const email = formData.get('EmailId') as string;
            const password = formData.get('password') as string;

            if (!validateEmail(email)) {
                setIsLoading(false);
                return;
            }

            if (!password) {
                setIsPasswordValid('Password is required.');
                setIsLoading(false);
                return;
            }

            const url = `https://orbitalwebapi-stagging.azurewebsites.net/api/User/UserLogin`;

            const response = await axios.get(url, {
                params: {
                    EmailId: email,
                    Password: password,
                },
            });

            const res = response.data;

            if (res.success) {
                localStorage.setItem('userData', JSON.stringify(res.data));
                router.push('/dashboard-layout');
            } else {
                toast.warning(res.message);
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='flex min-h-screen items-center justify-center bg-[#f2f8f6]'>
            <div className='mx-auto max-w-[545px]  px-4 py-10 sm:px-6 md:min-w-[545px] lg:min-w-[545px] lg:px-8 lg:py-14'>
                <div className='mx-auto max-w-2xl'>
                    <div className='relative mt-5 items-center  justify-center rounded-xl border bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900 sm:mt-10 md:p-6'>
                        <div className='mb-4 flex items-center justify-center sm:mb-4'>
                            <img className='h-12 w-auto' src='/orbital_logo.png' alt='' style={{ margin: '0 auto' }} />
                        </div>
                        <div className='mb-5 text-center sm:mb-5'>
                            <h1 className='mb-2 block text-2xl font-bold text-[#000000] dark:text-white sm:mb-2'>Login</h1>
                            <label className='text-sm-[16px] block font-medium  text-[#545454] '>To get started, please Login</label>
                        </div>

                        <form onSubmit={onSubmit}>
                            <div className='mb-4 sm:mb-4'>
                                <label htmlFor='EmailId' className='text-sm-[14px] font-weight: 600; mb-0.5 block font-medium 	text-[#545454] selection:text-sm'>
                                    Email
                                </label>
                                <Input
                                    id='EmailId'
                                    name='EmailId'
                                    type='text'
                                    placeholder='e.g user@gmail.com'
                                    autoComplete='off'
                                    required
                                    style={{ color: 'black' }}
                                />
                                <div className='mt-1 text-start'>
                                    {errorEmail && <div className='font-weight: 400; block text-xs text-[#ff5454]'>{errorEmail}</div>}
                                </div>
                            </div>
                            <div className='mb-2 sm:mb-2'>
                                <label htmlFor='password' className='font-weight: 600; mb-0.5 block text-sm 	font-medium text-[#545454]'>
                                    Password
                                </label>
                                <div className='relative'>
                                    <Input
                                        id='password'
                                        name='password'
                                        placeholder='********'
                                        type={sp == true ? 'password' : 'text'}
                                        required
                                        autoComplete='off'
                                        style={{ color: 'black' }}
                                    />
                                    <Button variant='outline' onClick={handleShwoPassword} className='absolute end-0 top-0 rounded-e-md p-3.5' type='button'>
                                        {sp == true ? <FaEye /> : <FaEyeSlash />}
                                    </Button>
                                </div>
                                <div className='mt-1 text-start'>
                                    {errorEmail && <div className='font-weight: 400; block text-xs text-[#ff5454]'>{errorEmail}</div>}
                                </div>
                            </div>
                            <div className=' mb-3 flex items-center justify-end sm:mb-3'>
                                <Link className='text-sm-[12px] text-sm font-medium  text-[#01B286] decoration-2' href='/auth/forgot_password'>
                                    Forgot password?
                                </Link>
                            </div>
                            <div className='mt-6 grid'>
                                <Button
                                    type='submit'
                                    disabled={isLoading}
                                    className='inline-flex w-full items-center justify-center gap-x-2 rounded-[12px] border border-transparent bg-[#01B286] px-4 py-3 text-sm font-semibold text-white hover:bg-[#01B286] disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>
                                    {isLoading ? <BsArrowRepeat className='animate-spin' /> : 'Login'}
                                </Button>
                            </div>
                        </form>
                        <div className='mt-4 text-center'>
                            <Button
                                variant='secondaryGreen'
                                onClick={() => router.push('auth/registration')}
                                className='inline-flex w-full items-center justify-center gap-x-2 rounded-[12px] border border-transparent px-4 py-3 text-sm font-semibold text-[#01B286] disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>
                                Don’t have an account ? Sign up
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
