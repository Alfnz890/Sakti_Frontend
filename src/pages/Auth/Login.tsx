import Logo from '../../assets/icons/logo.png'
import Person from '../../assets/icons/profile.png'
import Lock from '../../assets/icons/padlock.png'
import InformationBtn from '../../assets/icons/information-button.png'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

const API_BASE_URL = import.meta.env.VITE_URL_API

const Login = () => {

   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')

   const navigate = useNavigate()

   const login = async (e) => {
      e.preventDefault();

      try {

         const response = await axios.post(`${API_BASE_URL}/api/v1/login`, { username, password })
         localStorage.setItem('user', JSON.stringify(response.data.data));

         await toast.promise(
            new Promise((resolve) => setTimeout(resolve, 3000)), {
            pending: "Login In...",
            success: "Login success! redirecting...",
            error: "Failed to Login!"
         }
         )

         navigate('/');

      } catch (error) {
         console.log(error)
         toast.error('Username or Password is invalid!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            theme: "light",
         });
      }

   }

   return (
      <>
         <ToastContainer />
         <div className="w-full h-[100vh] flex justify-center items-center">
            <div className='border p-[17px] flex flex-col items-center shadow-md'>
               <img src={Logo} className='w-[60px]' />
               <div className='text-center mt-[13px]'>
                  <p className='font-semibold text-[18px]'>Welcome Back</p>
                  <p className='text-[13px] mt-[3px]'>Dont have an account? <a href="/register" className='font-medium'>Sign Up</a></p>
               </div>
               <form onSubmit={login} className='mt-[20px] flex flex-col gap-[13px]'>
                  <div className='border flex w-[310px] gap-2 p-[7px] rounded-[5px] border-yellow items-center'>
                     <img src={Person} className='w-[25px]' />
                     <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className='w-full text-[15px] outline-none' placeholder='Username' />
                  </div>
                  <div className='border flex w-[310px] gap-2 p-[7px] rounded-[5px] border-yellow'>
                     <img src={Lock} className='w-[22px]' />
                     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='w-full text-[15px] outline-none' placeholder='Password' />
                  </div>
                  <button type="submit" className='bg-yellow-primer text-[14px] text-white py-[8px] rounded-[5px]'>Login</button>
               </form>
               <div className='mt-[15px] flex flex-col gap-2'>
                  <div className='flex items-center gap-[10px]'>
                     <img src={InformationBtn} className='w-[16px]' />
                     <p className='text-[13px]'>Login with SALAM account</p>
                  </div>
                  <div className='flex items-center gap-[10px]'>
                     <img src={InformationBtn} className='w-[16px]' />
                     <p className='text-[13px]'>Admin login <a href="/admin-login" className='underline'>here</a></p>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default Login