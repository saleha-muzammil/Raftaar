import React from 'react'
import googleIcon from './assets/icons/google-color-svgrepo-com.svg';

const LoginPage = ({loginWithGoogle}) => {
  return (
    <div className="grid min-h-screen text-[#101010ee]">
      <section className='flex flex-col space-y-5 justify-center bg-[#101010ee] px-10 z-10'>
        <p className='flex justify-center text-4xl text-[#edededee] py-5'>رفتار</p>
        <button className = "flex w-[100%] sm:w-[80%] md:w-[50%] lg:w-[30%] mx-auto space-x-5 justify-center bg-[#ededed] hover:bg-[#edededee] transition-all py-4 rounded-md shadow-md shadow-slate-600" onClick={loginWithGoogle}>
          <img src ={googleIcon} width="23rem" alt = "Google Icon"/>
          <p>Sign In With Google</p>
        </button>
        <p className='text-[#edededaa] text-sm md:w-[50%] xl:w-[30%] mx-auto'>* Only emails with .edu.pk are allowed.</p>
      </section>
    </div>
  )
}

export default LoginPage;
