"use client"
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaGoogle } from 'react-icons/fa';
import { toast } from 'react-toastify';

const LogInPage = () => {
    const router= useRouter();

    const[isLoading, setIsLoading]=useState(false);

    const{  register,
    handleSubmit,formState:{errors}}= useForm()

 const handleLoginFunc =async (data) =>{
    setIsLoading(true);
    try{

        const{data:res,error}=await authClient.signIn.email({
            email:data.email,
            password:data.password,
            callbackURL:"/",
        });

        console.log("Res:",res);
        console.log("error",error);
        if(error){
            // setIsLoading(false);
            // if(error.code==="INVALID_EMAIL_OR_PASSWORD")
            // {
 toast.error(error.message || "Invalid email or password");
            // }
            // else{
            //     toast.error(error.message || "Something went wrong")
            // }
            // console.log(error);
           
            return;
        }
        
        setIsLoading(false);
        toast.success("Welcome back!");
        router.push("/");
        router.refresh();
    }
        catch(err){
            setIsLoading(false);
            console.log(err);
            toast.error("Something went wrong");
        }
    
 }


const handleGoogleLogin = async()=>{
   const data= await authClient.signIn.social({
        provider:"google",
        // callbackURL:"/"
    });
    console.log(data)
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
<div
className='divider my-6 text-gray-400 text-xs uppercase'>
OR
</div>
<button  onClick={handleGoogleLogin} className='btn btn-outline w-full border-slate-300 mb-3 '>
   <FaGoogle className='text-2xl'/> Continue with Google
</button>
<p>
    Do not have an account? <Link href={'/registration'} className='text-blue-500'>Register</Link></p>
            </div>
        </div>
    );
};

export default LogInPage;