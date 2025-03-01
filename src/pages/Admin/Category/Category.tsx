import Person from '../../../assets/person.jpg'
import DashboardLogo from '../../../assets/icons/dashboard.png'
import Logo from '../../../assets/icons/logo.png'
import Eventlogo from '../../../assets/icons/schedule.png'
import Userlogo from '../../../assets/icons/user.png'
import Bloglogo from '../../../assets/icons/blogging.png'
import Exitlogo from '../../../assets/icons/exit.png'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Pagination from '../../../components/Pagination'
import Swal from "sweetalert2";

const API_BASE_URL = import.meta.env.VITE_URL_API

const Category = () => {

   const [dataAdmin, setDataAdmin] = useState('')
   const [category, setCategory] = useState([]);

   useEffect(() => {
      const storedData = localStorage.getItem('admin');
      if (storedData) {
         setDataAdmin(JSON.parse(storedData))
      }
   })

   useEffect(() => {
      const getAllCategory = async () => {
         const response = await axios.get(`${API_BASE_URL}/api/v1/categories`)
         setCategory(response.data.data);
      }
      getAllCategory();
   }, [])

   const logout = async () => {
      localStorage.removeItem('admin');
      window.location.href = ('/');
   }

   return (
      <>
         <div className='flex h-[100vh]'>
            <div className="col w-[280px] p-4 border border-l">
               <div className='flex items-center gap-2'>
                  <img src={Logo} className='w-[45px]' />
                  <h3>SAKTIEvent</h3>
               </div>
               <div className="menu mt-[30px] flex flex-col gap-3">
                  <a href='/dashboard' className='flex items-center gap-2 p-2 rounded-[6px]'>
                     <img src={DashboardLogo} className='w-[23px]' />
                     <p className='text-sm'>Dashboard</p>
                  </a>
                  <a href='/dashboard/event' className='flex items-center gap-2 p-2 rounded-[6px]'>
                     <img src={Eventlogo} className='w-[25px]' />
                     <p className='text-sm'>Events</p>
                  </a>
                  <a href='/dashboard/users' className='flex items-center gap-2 p-2 rounded-[6px]'>
                     <img src={Userlogo} className='w-[22px]' />
                     <p className='text-sm'>Users</p>
                  </a>
                  <a href='/dashboard/report' className='flex items-center gap-2 p-2 rounded-[6px]'>
                     <img src={Bloglogo} className='w-[22px]' />
                     <p className='text-sm'>Publish</p>
                  </a>
                  <a href='/dashboard/speaker' className='flex items-center gap-2 p-2 rounded-[6px]'>
                     <img src={Bloglogo} className='w-[22px]' />
                     <p className='text-sm'>Speakers</p>
                  </a>
                  <a href='/dashboard/category' className='flex items-center gap-2 p-2 rounded-[6px] bg-yellow-primer'>
                     <img src={Bloglogo} className='w-[22px]' />
                     <p className='text-sm'>Category</p>
                  </a>
                  <a onClick={logout} className='flex items-center gap-2 p-2 absolute bottom-5 cursor-pointer'>
                     <img src={Exitlogo} className='w-[20px]' />
                     <p className='text-sm'>Logout</p>
                  </a>
               </div>
            </div>
            <div className="col w-full p-6 bg-[#f5f5f5]">
               <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                     <img src={Person} className='w-[40px] rounded-full' />
                     <div>
                        <p className='text-[14px]'>{dataAdmin.first_name}</p>
                        <p className='text-[11px] text-light-grey'>019283712638123123</p>
                     </div>
                  </div>
               </div>

               {/* Right */}
               <div className='my-[23px] flex items-center justify-between'>
                  <h3 className='text-[25px] font-semibold tracking-wider'>Category</h3>
                  <div className='flex items-center gap-4'>
                     {/* <a href="/dashboard/category/form">
                        <div className='px-4 py-2 rounded-[5px] bg-yellow-primer shadow-md'>
                           <p className='text-[14px]'>+ Add New Category</p>
                        </div>
                     </a> */}
                     <button className='px-4 py-2 rounded-[5px] bg-yellow-primer shadow-md text-[14px]'>+ Add Category</button>
                  </div>
               </div>
               <div className='mt-5'>
                  <div className='border p-3 rounded-[6px] bg-white shadow-md'>
                     <table className='w-full'>
                        <thead>
                           <tr className='text-left  border-b text-[14px]'>
                              <th className='pb-[7px] pl-[20px]'>No</th>
                              <th className='pb-[7px] pl-[20px]'>Name</th>
                              <th className='pb-[7px] pl-[20px]'>Action</th>
                           </tr>
                        </thead>
                        <tbody>
                           {category.map((item, index) => (
                              <tr className='border-b' key={item.id}>
                                 <td className='py-[8px] w-[100px] pl-[20px]'>{index + 1}</td>
                                 <td className='py-[8px] text-[15px] w-[400px] pl-[20px]'>{item.name}</td>
                                 <td className='py-[8px] text-[15px] flex gap-1 items-center text-white pl-[20px]'>
                                    <button className='px-[10px] py-[2px] bg-red-500 rounded-[3px]'>Delete</button>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default Category