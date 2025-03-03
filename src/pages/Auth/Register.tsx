import Logo from '../../assets/icons/logo.png'
import Person from '../../assets/icons/profile.png'
import Lock from '../../assets/icons/padlock.png'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

const API_BASE_URL = import.meta.env.VITE_URL_API

const Register = () => {

   const [name, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [email, setEmail] = useState('');
   const [phone, setPhone] = useState('');
   const navigate = useNavigate();

   const onSubmit = async (e) => {
      e.preventDefault();

      try {

         try {
            const response = await axios.post(`${API_BASE_URL}/api/v1/users`, { name, password, email, phone })
            localStorage.setItem('user', JSON.stringify(response.data.data));
         } catch (error) {
            console.log(error)
         }

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
                     <input type="text" className='w-full text-[15px] outline-none' placeholder='Username' value={name} onChange={(e) => setUsername(e.target.value)} />
                  </div>
                  <div className='border flex w-[310px] gap-2 p-[7px] rounded-[5px] border-yellow'>
                     <img src={Lock} className='w-[22px]' />
                     <input type="password" className='w-full text-[15px] outline-none' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <div className='border flex w-[310px] gap-2 p-[7px] rounded-[5px] border-yellow'>
                     <img src={Lock} className='w-[22px]' />
                     <input type="email" className='w-full text-[15px] outline-none' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className='border flex w-[310px] gap-2 p-[7px] rounded-[5px] border-yellow'>
                     <img src={Lock} className='w-[22px]' />
                     <input type="text" className='w-full text-[15px] outline-none' placeholder='Phone' value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                  <button type="submit" className='bg-yellow-primer text-[14px] text-white py-[8px] rounded-[5px]'>Register</button>
               </form>
            </div>
         </div>
      </>
   )
}

export default Register