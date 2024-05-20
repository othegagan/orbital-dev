'use client';

import { Input } from '@/components/ui/input';
import React, { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { BsArrowRepeat } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function RegistrationPage() {
    const router = useRouter();

    const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [errorConfirmPassword, seterrorConfirmPassword] = useState<string | null>(null);
    const [errorEmail, setEmailError] = useState<string | null>(null);

    useEffect(() => {
        setIsPasswordValid(!error);
    }, [error]);

    //Email Validation
    function validateEmail(email: string): boolean {
        const specialCharacterRegex = /[@.]+/;
        const hasSpecialCharacter = specialCharacterRegex.test(email);

        if (!hasSpecialCharacter) {
            setEmailError('Email should contain the special characters.');
            return false;
        }
        setEmailError(null);
        return true;
    }

    const [sp, ssp] = useState(true);
    const [cp, ccp] = useState(true);

    function handleShwoPassword() {
        ssp(!sp);
    }
    function handleShwoPassword2() {
        ccp(!cp);
    }
    //Password Validation
    function validatePassword(Password: string): boolean {
        const minLength = 8;
        const uppercaseRegex = /[A-Z]/;
        const specialCharacterRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        const numericRegex = /[0-9]/;

        const isValidLength = Password.length >= minLength;
        const hasUppercase = uppercaseRegex.test(Password);
        const hasSpecialCharacter = specialCharacterRegex.test(Password);
        const hasNumeric = numericRegex.test(Password);

        if (!isValidLength) {
            setError('Password should be at least 8 characters long.');
            return false;
        } else if (!hasUppercase) {
            setError('Password should contain at least one uppercase letter.');
            return false;
        } else if (!hasSpecialCharacter) {
            setError('Password should contain at least one special character.');
            return false;
        } else if (!hasNumeric) {
            setError('Password should contain at least one numeric value.');
            return false;
        }

        setError(null);
        return true;
    }

    //Password Confirm Validation
    function validateConfirmPassword(confirmPassword: string, Password: string): boolean {
        const minLength = 8;
        const uppercaseRegex = /[A-Z]/;
        const specialCharacterRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        const numericRegex = /[0-9]/;

        const isValidLength = confirmPassword.length >= minLength;
        const hasUppercase = uppercaseRegex.test(confirmPassword);
        const hasSpecialCharacter = specialCharacterRegex.test(confirmPassword);
        const hasNumeric = numericRegex.test(confirmPassword);

        const isValidPassword = confirmPassword === Password;

        if (!isValidLength) {
            seterrorConfirmPassword('Password should be at least 8 characters long.');
            return false;
        } else if (!hasUppercase) {
            seterrorConfirmPassword('Password should contain at least one uppercase letter.');
            return false;
        } else if (!hasSpecialCharacter) {
            seterrorConfirmPassword('Password should contain at least one special character.');
            return false;
        } else if (!hasNumeric) {
            seterrorConfirmPassword('Password should contain at least one numeric value.');
            return false;
        } else if (!isValidPassword) {
            seterrorConfirmPassword("Password Doesn't Match");
            return false;
        }

        seterrorConfirmPassword(null);
        return true;
    }

    //Submit Signup
    async function onSubmitClick(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        try {
            const formData = new FormData(event.currentTarget);
            const userData = {
                firstname: formData.get('firstname') as string,
                middlename: formData.get('Middlename') as string,
                lastname: formData.get('lastname') as string,
                emailId: formData.get('emailId') as string,
                mobileNo: formData.get('phoneNo') as string,
                password: formData.get('password') as string,
            };

            // password and confirm password
            const confirmPassword = formData.get('confirmPassword') as string;
            if (userData.password !== confirmPassword) {
                toast.error('Password and Confirm Password do not match', {
                    autoClose: 3000,
                });
                setIsLoading(false);
                return;
            }

            const jsonData = JSON.stringify(userData);

            const response = await fetch('https://orbitalwebapi-stagging.azurewebsites.net/api/User/UserSignUp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: jsonData,
            });

            const data = await response.json();

            if (data.success == true) {
                localStorage.setItem('userSignupData', JSON.stringify(data));
                toast.success(data.message);
                //
                await new Promise(resolve => setTimeout(resolve, 1000));
                await router.push('/auth/verification');
            } else {
                toast.warning(data.message);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div className='flex min-h-screen items-center justify-center bg-[#f2f8f6]'>
            <div className='mx-auto max-w-[670px] px-4 py-10 sm:px-6 md:min-w-[670px] lg:min-w-[670px] lg:px-8 lg:py-14'>
                <div className='mx-auto max-w-2xl'>
                    <div className='relative mt-5 items-center  justify-center rounded-sm border bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900 sm:mt-10 md:p-10'>
                        <div className='mb-4 flex items-center justify-center sm:mb-4'>
                            <img className='h-12 w-auto' src='/orbital_logo.png' alt='' style={{ margin: '0 auto' }} />
                        </div>
                        <div className='mb-5 text-center sm:mb-5'>
                            <h1 className='mb-2 block text-2xl font-bold text-[#000000] dark:text-white sm:mb-2'>Sign Up</h1>
                            <label className='text-sm-[16px] block font-medium  text-[#545454] '>To get started, please Sign Up</label>
                        </div>
                        <form onSubmit={onSubmitClick}>
                            <div className='mb-3 sm:mb-3'>
                                <label htmlFor='firstname' className='font-weight: 600; mb-1 block text-sm 	font-medium text-[#545454]'>
                                    First Name <span className='text-red-500'>*</span>
                                </label>
                                <Input
                                    required
                                    id='firstname'
                                    name='firstname'
                                    className='block w-full rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-[#01B286] focus:ring-[#01B286] disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600'
                                    style={{ color: 'black' }}
                                />
                            </div>
                            <div className='mb-3 sm:mb-3'>
                                <label htmlFor='Middlename' className='font-weight:  600; mb-1 block text-sm 	font-medium text-[#545454]'>
                                    Middle Name (Optional)
                                </label>
                                <Input
                                    id='Middlename'
                                    name='Middlename'
                                    className='block w-full rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-[#01B286] focus:ring-[#01B286] disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600'
                                    style={{ color: 'black' }}
                                />
                            </div>
                            <div className='mb-3 sm:mb-3'>
                                <label htmlFor='lastname' className='font-weight: 600; mb-1 block text-sm 	font-medium text-[#545454]'>
                                    Last Name <span className='text-red-500'>*</span>
                                </label>
                                <Input
                                    required
                                    id='lastname'
                                    name='lastname'
                                    className='block w-full rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-[#01B286] focus:ring-[#01B286] disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600'
                                    style={{ color: 'black' }}
                                />
                            </div>
                            <div className='mb-3 sm:mb-3'>
                                <label htmlFor='emailId' className='font-weight: 600; mb-1 block text-sm 	font-medium text-[#545454]'>
                                    Email address <span className='text-red-500'>*</span>
                                </label>
                                <Input
                                    id='emailId'
                                    name='emailId'
                                    className='block w-full rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-[#01B286] focus:ring-[#01B286] disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600'
                                    onChange={e => validateEmail(e.target.value)}
                                    type='text'
                                    placeholder='e.g user@kidvest.co'
                                    autoComplete='off'
                                    required
                                    style={{ color: 'black' }}
                                />
                                <div className='mt-1 text-start'>
                                    {errorEmail && <div className='font-weight: 400; block text-xs text-[#ff5454]'>{errorEmail}</div>}
                                </div>
                            </div>
                            <div className='mb-3 sm:mb-3'>
                                <label htmlFor='InputphoneNo' className='font-weight:  600; mb-1 block text-sm 	font-medium text-[#545454]'>
                                    Phone Number <span className='text-red-500'>*</span>
                                </label>
                                <Input
                                    id='InputphoneNo'
                                    type='number'
                                    name='phoneNo'
                                    className='block w-full rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-[#01B286] focus:ring-[#01B286] disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600'
                                    required
                                    style={{ color: 'black' }}
                                />
                            </div>
                            <div className='mb-3 sm:mb-3'>
                                <label htmlFor='password' className='font-weight: 600; mb-1 block text-sm 	font-medium text-[#545454]'>
                                    Password <span className='text-red-500'>*</span>
                                </label>
                                <div className='relative'>
                                    <Input
                                        onChange={e => validatePassword(e.target.value)}
                                        id='password'
                                        name='password'
                                        className='block w-full rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-[#01B286] focus:ring-[#01B286] disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600'
                                        type={sp == true ? 'password' : 'text'}
                                        required
                                        autoComplete='off'
                                        style={{ color: 'black' }}
                                    />
                                    <Button variant='outline' onClick={handleShwoPassword} className='absolute end-0 top-0 rounded-e-md p-3.5' type='button'>
                                        {sp == true ? <FaEye /> : <FaEyeSlash />}
                                    </Button>
                                </div>
                                <div className='mt-1 text-start'>{error && <div className='font-weight: 400; block text-xs text-[#ff5454]'>{error}</div>}</div>
                            </div>
                            <div className='mb-3 sm:mb-3'>
                                <label htmlFor='confirmPassword' className='font-weight: 600; mb-1 block text-sm 	font-medium text-[#545454]'>
                                    Confirm Password <span className='text-red-500'>*</span>
                                </label>
                                <div className='relative'>
                                    <Input
                                        onChange={e => {
                                            const confirmPasswordValue = e.target.value;
                                            const passwordInput = document.getElementById('password') as HTMLInputElement | null;
                                            const passwordValue = passwordInput ? passwordInput.value : '';
                                            validateConfirmPassword(confirmPasswordValue, passwordValue);
                                        }}
                                        id='confirmPassword'
                                        name='confirmPassword'
                                        className='block w-full rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-[#01B286] focus:ring-[#01B286] disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600'
                                        type={cp == true ? 'password' : 'text'}
                                        required
                                        autoComplete='off'
                                        style={{ color: 'black' }}
                                    />
                                    <Button variant='outline' onClick={handleShwoPassword2} className='absolute end-0 top-0 rounded-e-md p-3.5' type='button'>
                                        {cp == true ? <FaEye /> : <FaEyeSlash />}
                                    </Button>
                                </div>
                                <div className='mt-1 text-start'>
                                    {errorConfirmPassword && <div className='font-weight: 400; block text-xs text-[#ff5454]'>{errorConfirmPassword}</div>}
                                </div>
                            </div>

                            <div className='mb-6 flex text-left sm:mb-6'>
                                <div className='items-center justify-center'>
                                    <input
                                        id='remember-me'
                                        name='remember-me'
                                        type='checkbox'
                                        className='h-4 w-4 rounded border-gray-200 dark:border-[#01B286] dark:bg-neutral-800 dark:checked:border-[#01B286] dark:checked:bg-[#01B286] dark:focus:ring-offset-gray-800'
                                    />
                                    <label htmlFor='' className='ml-2 text-sm font-medium text-[#545454] '>
                                        By signing up, I agree to the Orbital Terms of Service and acknowledge that the Privacy Statement applies.
                                    </label>
                                </div>
                            </div>

                            <div className='grid'>
                                <Button
                                    type='submit'
                                    disabled={!isPasswordValid || isLoading}
                                    className='inline-flex w-full items-center justify-center gap-x-2 rounded-[12px] border border-transparent bg-[#01B286] px-4 py-3 text-sm font-semibold text-white hover:bg-[#01B286] disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>
                                    {' '}
                                    {isLoading ? <BsArrowRepeat className='animate-spin' /> : 'Sign Up'}
                                </Button>
                            </div>
                        </form>
                        <div className='mt-4 text-center'>
                            <Button
                                variant='secondary'
                                onClick={() => router.push('/')}
                                className='inline-flex w-full items-center justify-center gap-x-2 rounded-[12px] border border-transparent px-4 py-3 text-sm font-bold text-[#000000] underline disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>
                                Already Have an account ? Login
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
