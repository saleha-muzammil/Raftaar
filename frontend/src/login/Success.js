import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Success = ({setToken}) => {
  const navigate = useNavigate();
  
  useEffect(()=>
  {
    setToken('FETCHING...');
    navigate('/');  
  });

  return (
    <div className='min-h-screen bg-[#101010ed]'>
       
    </div>
  )
}

export default Success
