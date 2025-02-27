import Logo from '../../assets/icons/logo.png'
import Person from '../../assets/icons/profile.png'
import Lock from '../../assets/icons/padlock.png'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

const API_BASE_URL = import.meta.env.VITE_URL_API

const Register = () => {

   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const navigate = useNavigate();

   const onSubmit = async (e) => {
      e.preventDefault();

      try {

         const response = await axios.post(`/api/auth`, { username, password })
         const user = response.data.data;

         const name = user.username;
         const first_name = user.first_name;
         const phone = user.telp;
         const email = user.email;

         await axios.post(`${API_BASE_URL}/api/v1/users`, { name, first_name, password, phone, email })
         console.log("User has beed added successfully!")

         await toast.promise(
            new Promise((resolve) => setTimeout(resolve, 3000)), {
            pending: "Registering...",
            success: "Register success! redirecting...",
            error: "Failed to register!"
         }
         )

         navigate('/login')
      } catch (error) {
         toast.error('Failed to register!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            theme: "light",
         });
         console.log(error)
      }

   }

   return (
      <>
         <ToastContainer />
         <div className="w-full h-[100vh] flex justify-center items-center">
            <div className='border p-[17px] flex flex-col items-center shadow-md'>
               <img src={Logo} className='w-[60px]' />
               <div className='text-center mt-[13px]'>
                  <p className='font-semibold text-[18px]'>Hello</p>
                  <p className='text-[13px] mt-[3px]'>Have an account? <a href="/login" className='font-medium'>Log In</a></p>
               </div>
               <form className='mt-[20px] flex flex-col gap-[13px]' onSubmit={onSubmit}>
                  <div className='border flex w-[310px] gap-2 p-[7px] rounded-[5px] border-yellow'>
                     <img src={Person} className='w-[25px]' />
                     <input type="text" className='w-full text-[15px] outline-none' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                  </div>
                  <div className='border flex w-[310px] gap-2 p-[7px] rounded-[5px] border-yellow'>
                     <img src={Lock} className='w-[22px]' />
                     <input type="password" className='w-full text-[15px] outline-none' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <button type="submit" className='bg-yellow-primer text-[14px] text-white py-[8px] rounded-[5px]'>Register</button>
               </form>
            </div>
         </div>
      </>
   )
}

export default Register