"use client"
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';

const LogInPage = () => {
    const{  register,
    handleSubmit,formState:{errors}}= useForm()
    const handleLoginFunc=(data)=>{
        
    }
    return (
        <div className='container mx-auto min-h-[80vh] flex justify-center items-center bg-slate-100'>
            <div className='p-4 rounded-xl bg-white'>
<h2 className='font-bold text-2xl mb-4'>Login your account</h2>
<form  className='space-y-4' onSubmit={handleSubmit(handleLoginFunc)}><fieldset className="fieldset">
  <legend className="fieldset-legend">Email</legend>
  <input type="email" className="input" 
  name='email'
  placeholder="Type here email"
  {...register("email",{required:"email field is required"})} />
 
 {errors.email &&<p className='text-red-500'>{errors.email.message}</p>}
</fieldset>

<fieldset className="fieldset">
  <legend className="fieldset-legend">Password</legend>
  <input type="password" className="input"
  name='password' 
  placeholder="Type here password"
   {...register("password",{required:"password field is required"})} />
   {errors.password &&<p className='text-red-500'>{errors.password.message}</p>}

</fieldset>
<button className="btn w-full bg-slate-800 text-white">Login</button>
</form>
<p>
    Do not have an account? <Link href={'/registration'} className='text-blue-500'>Register</Link></p>
            </div>
        </div>
    );
};

export default LogInPage;