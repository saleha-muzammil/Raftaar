import React, { useEffect, useState } from 'react'

const Profile = ({token}) => {

  const [user, setUser] = useState({}); 
  const [rendered, setRendered] = useState(false);

  useEffect(() =>
  {
    const getUser = async() =>
    {
        let response = await fetch('http://localhost:5000/api/user', {
            method: "GET", 
            mode: "cors", 
            cache: "no-cache", 
            credentials: "include", 
            headers: {
              "Content-Type": "application/json",
              "auth-token": token
            },
            redirect: "follow", 
            referrerPolicy: "no-referrer",
        });
          
        response = await response.json();
        setUser(response);
        setRendered(true);
    }
    
    if (!rendered)
    {
        getUser();
    }
  });

  return (
    <div className='min-h-screen bg-[#222222ed] text-[#edededee] md:px-20 px-4 space-y-10'>
        <section className='flex mx-auto w-[100%] justify-center pb-5'> 
            <figure className='space-y-5 bg-[#101010aa] w-[100%] py-8 rounded-b-md'>
                <img src = {user.picture} alt = "Profile Pic" className='rounded-[50px] mx-auto' />
                <p className='text-2xl text-center font-semibold'>{user.name}</p>
            </figure>
        </section>
        <section className=''>
            <p className='text-center text-[#ededed99]'>Your personalized content will be displayed here</p>
        </section>
    </div>
  )
}

export default Profile
