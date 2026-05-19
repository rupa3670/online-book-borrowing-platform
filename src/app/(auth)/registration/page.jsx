"use client"
import { authClient } from '@/lib/auth-client';
import { createEmailVerificationToken } from 'better-auth/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaGoogle } from 'react-icons/fa';

const RegistrationPage = () => {
const router=useRouter();
const [isLoading,setIsLoading]
=useState(false);
    const{  register,
        handleSubmit,formState:{errors}}= useForm();
        const handleRegisterFunc=async(data)=>{
            console.log(data,"data");
      const {email,name,photo,password} =data;  
      console.log(name,photo);

        const {data: res,error} = await authClient.signUp.email(
            {
     name: name, // required
    email: email, // required
    password: password, // required
    image: photo,

            });
            console.log(res,error)
            if(error){
                alert(error.message)
            }
            if(res){
                await authClient.signOut();
                alert("signup successful")
                router.push("/login")
            }
        };

       const handleGoogleLogin = async()=>{
           const data= await authClient.signIn.social({
                provider:"google",
                 callbackURL:"/login"
            });
            console.log(data)
        } 
        
    return (
         <div className='container mx-auto min-h-[80vh] flex justify-center items-center bg-slate-100'>
            <div className='p-4 rounded-xl bg-white'>
<h2 className='font-bold text-2xl mb-4'>Register your account</h2>
<form  className='space-y-4' onSubmit={handleSubmit(handleRegisterFunc)}><fieldset className="fieldset">
  <legend className="fieldset-legend">Name</legend>
  <input type="text" className="input" 
  name='name'
  placeholder="Type here name"
  {...register("name",{required:"name field is required"})} />
 
 {errors.name &&<p className='text-red-500'>{errors.name.message}</p>}
</fieldset>
<fieldset className="fieldset">
  <legend className="fieldset-legend">Email</legend>
  <input type="email" className="input"
  name='email' 
  placeholder="Type here email"
   {...register("email",{required:"Email field is required"})} />
   {errors.email &&<p className='text-red-500'>{errors.email.message}</p>}

</fieldset>
<fieldset className="fieldset">
  <legend className="fieldset-legend">Photo URL</legend>
  <input type="text" className="input"
  name='photo' 
  placeholder="Type here photo url"
   {...register("photo",{required:"photo url field is required"})} />
   {errors.photo&&<p className='text-red-500'>{errors.photo.message}</p>}

</fieldset>

<fieldset className="fieldset">
  <legend className="fieldset-legend">Password</legend>
  <input type="password" className="input"
  name='password' 
  placeholder="Type here password"
   {...register("password",{required:"password field is required"})} />
   {errors.password &&<p className='text-red-500'>{errors.password.message}</p>}

</fieldset>

<button className="btn w-full bg-slate-800 text-white">Register</button>
</form>
<div
className='divider my-6 text-gray-400 text-xs uppercase'>
OR
</div>
<button  onClick={handleGoogleLogin} className='btn btn-outline w-full border-slate-300 mb-3 '>
   <FaGoogle className='text-2xl'/> Continue with Google
</button>

            </div>
        </div>
    );
};

export default RegistrationPage;