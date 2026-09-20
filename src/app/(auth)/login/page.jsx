"use client"
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    FaGoogle,
    FaEye,
    FaEyeSlash,
    FaBookOpen,
    FaGift,
    FaHandHoldingHeart,
    FaFireAlt,
    FaSmileBeam,
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import { recordLoginAndGetStatus } from '@/actions/userActivity';

const LogInPage = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleLoginFunc = async (data) => {
    setIsLoading(true);
    try {
        const { data: res, error } = await authClient.signIn.email({
            email: data.email,
            password: data.password,
            callbackURL: "/",
        });

        if (error) {
            setIsLoading(false);
            toast.error(error.message || "Invalid email or password");
            return;
        }

        setIsLoading(false);
        router.push("/");
        router.refresh();
    }
    catch (err) {
        setIsLoading(false);
        toast.error("Something went wrong");
    }
}

    const handleGoogleLogin = async () => {
    try {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/"
        });
    } catch (err) {
        toast.error("Google sign-in failed");
    }
}
    return (
        <div className='min-h-[85vh] flex justify-center items-center bg-gradient-to-br from-emerald-50 via-white to-amber-50 px-4 py-12'>
            <div className='w-full max-w-md'>
                <div className='bg-white p-8 rounded-3xl shadow-xl border border-emerald-100'>

                    <div className='flex flex-col items-center mb-6'>
                        <div className='w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-500 flex items-center justify-center text-white text-2xl mb-3 shadow-lg'>
                            <FaBookOpen />
                        </div>
                        <h2 className='font-bold text-2xl text-emerald-900'>Welcome back</h2>
                        <p className='text-sm text-gray-500 mt-1'>Log in to continue your reading journey</p>
                    </div>

                    <form className='space-y-4' onSubmit={handleSubmit(handleLoginFunc)}>
                        <div className='form-control w-full'>
                            <label className='label font-semibold text-sm text-slate-600'>Email</label>
                            <input
                                type="email"
                                className='input input-bordered w-full focus:outline-emerald-600 border-slate-200'
                                placeholder="you@example.com"
                                {...register("email", { required: "Email field is required" })}
                            />
                            {errors.email && <p className='text-red-500 text-xs mt-1'>{errors.email.message}</p>}
                        </div>

                        <div className='form-control w-full'>
                            <label className='label font-semibold text-sm text-slate-600'>Password</label>
                            <div className='relative'>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className='input input-bordered w-full focus:outline-emerald-600 border-slate-200 pr-10'
                                    placeholder="Enter your password"
                                    {...register("password", { required: "Password field is required" })}
                                />
                                <button
                                    type='button'
                                    onClick={() => setShowPassword((v) => !v)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600'
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {errors.password && <p className='text-red-500 text-xs mt-1'>{errors.password.message}</p>}
                        </div>

                        <button
                            type='submit'
                            disabled={isLoading}
                            className='btn w-full bg-emerald-700 hover:bg-emerald-800 text-white border-none'
                        >
                            {isLoading ? <span className='loading loading-spinner loading-sm'></span> : "Login"}
                        </button>
                    </form>

                    <div className='divider my-6 text-gray-400 text-xs uppercase'>OR</div>

                    <button
                        onClick={handleGoogleLogin}
                        className='btn btn-outline w-full border-slate-300 gap-2 hover:bg-emerald-50 hover:border-emerald-300'
                    >
                        <FaGoogle className='text-lg text-emerald-700' /> Continue with Google
                    </button>

                    <p className='text-center text-sm text-gray-500 mt-6'>
                        Do not have an account?{' '}
                        <Link href={'/registration'} className='text-emerald-700 font-semibold hover:underline'>
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LogInPage;