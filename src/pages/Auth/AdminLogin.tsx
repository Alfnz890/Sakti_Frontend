import Logo from '../../assets/icons/logo.png'
import Person from '../../assets/icons/profile.png'
import Lock from '../../assets/icons/padlock.png'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const API_BASE_URL = import.meta.env.VITE_URL_API

const AdminLogin = () => {

   const [username, setName] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState("");
   const navigate = useNavigate();

   const onSubmit = async (e) => {
      e.preventDefault();
      try {

         const response = await axios.post(`/api/auth`, { username, password })
         localStorage.setItem('admin', JSON.stringify(response.data.data))
         navigate('/dashboard')

      } catch (err: any) {
         setError(err.response?.data?.msg || "Login failed");
      }
   }

   return (
      <>
         <div className="w-full h-[100vh] flex justify-center items-center">
            <div className='border p-[17px] flex flex-col items-center shadow-md'>
               <img src={Logo} className='w-[60px]' />
               <div className='text-center mt-[13px]'>
                  <p className='font-semibold text-[18px]'>Hello Admin</p>
               </div>
               <form onSubmit={onSubmit} className='mt-[20px] flex flex-col gap-[13px]'>
                  <div className='border flex w-[310px] gap-2 p-[7px] rounded-[5px] border-yellow'>
                     <img src={Person} className='w-[25px]' />
                     <input type="text" className='w-full text-[15px] outline-none' placeholder='Username' value={username} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className='border flex w-[310px] gap-2 p-[7px] rounded-[5px] border-yellow'>
                     <img src={Lock} className='w-[22px]' />
                     <input type="password" className='w-full text-[15px] outline-none' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <button type="submit" className='bg-yellow-primer text-[14px] text-white py-[8px] rounded-[5px]'>LogIn</button>
               </form>
            </div>
         </div>
      </>
   )
}

export default AdminLogin