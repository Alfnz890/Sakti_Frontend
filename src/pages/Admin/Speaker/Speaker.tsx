import Searcglogo from '../../../assets/icons/search-interface-symbol.png'
import Person from '../../../assets/person.jpg'
import Logo from '../../../assets/icons/logo.png'
import Eventlogo from '../../../assets/icons/schedule.png'
import Userlogo from '../../../assets/icons/user.png'
import DashboardLogo from '../../../assets/icons/dashboard.png'
import Bloglogo from '../../../assets/icons/blogging.png'
import Exitlogo from '../../../assets/icons/exit.png'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Pagination from '../../../components/Pagination'

const API_BASE_URL = import.meta.env.VITE_URL_API

const Speaker = () => {

   const [dataAdmin, setDataAdmin] = useState({ id: null, username: "", email: "" })
   const [speaker, setSpeaker] = useState([]);
   const [page, setPage] = useState(0)
   const [pages, setPages] = useState(1)
   const [keyword, setKeyword] = useState("")
   const [query, setQuery] = useState("")
   const [filter, setFilter] = useState("")

   useEffect(() => {
      const getUser = async () => {
         const response = await axios.get(`${API_BASE_URL}/api/v1/currentUser`, { withCredentials: true })
         setDataAdmin(response.data)
      }

      getUser()
   }, [])

   useEffect(() => {
      getAllSpeakers();
   }, [page, keyword, filter])

   const getAllSpeakers = async () => {
      const response = await axios.get(`${API_BASE_URL}/api/v1/speaker?limit=10&page=${page}&search_query=${keyword}&status=${filter}`)
      setSpeaker(response.data.result)
      setPage(response.data.page)
      setPages(response.data.totalPage)
   }

   const logout = async () => {
      try {
         await axios.delete(`${API_BASE_URL}/api/v1/logout`, { withCredentials: true })
         window.location.href = ('/');
      } catch (error) {
         console.log(error);
      }
   }

   const searchData = (e) => {
      e.preventDefault();
      setPage(0);
      setKeyword(query);
   }

   return (
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
               <a href='/dashboard/event' className='flex items-center gap-2 p-2 rounded-[6px] '>
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
               <a href='/dashboard/speaker' className='flex items-center gap-2 p-2 rounded-[6px] bg-yellow-primer'>
                  <img src={Bloglogo} className='w-[22px]' />
                  <p className='text-sm'>Speaker</p>
               </a>
               <a onClick={logout} className='flex items-center gap-2 p-2 absolute bottom-5 cursor-pointer'>
                  <img src={Exitlogo} className='w-[20px]' />
                  <p className='text-sm'>Logout</p>
               </a>
            </div>
         </div>
         <div className="col w-full p-6 bg-[#f5f5f5]">
            <div className='flex items-center justify-between'>
               <form onSubmit={searchData}>
                  <div className='border flex items-center gap-2 px-4 py-2 rounded-[50px] shadow-md bg-white'>
                     <img src={Searcglogo} className='w-[17px]' />
                     <input type="text" placeholder='Search' className='w-[350px] outline-none' value={query} onChange={(e) => setQuery(e.target.value)} />
                  </div>
               </form>
               <div className='flex items-center gap-3'>
                  <img src={Person} className='w-[40px] rounded-full' />
                  <div>
                     <p className='text-[14px]'>{dataAdmin.username}</p>
                     <p className='text-[11px] text-light-grey'>019283712638123123</p>
                  </div>
               </div>
            </div>
            <div className='my-[23px] flex items-center justify-between'>
               <h3 className='text-[25px] font-semibold tracking-wider'>Speaker</h3>
               <div className='flex items-center gap-4'>
                  <div>
                     {/* Dropdown here */}
                     <select className='border text-[14px] px-4 py-2 shadown-md outline-none rounded-[5px]' value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="">All</option>
                        <option value="Active">Active</option>
                        <option value="Non-Active">Non Active</option>
                     </select>
                  </div>
                  <a href="/dashboard/speaker/form">
                     <div className='px-4 py-2 rounded-[5px] bg-yellow-primer shadow-md'>
                        <p className='text-[14px]'>+ Add New Speaker</p>
                     </div>
                  </a>
               </div>
            </div>
            <div className='border p-3 rounded-[6px] bg-white shadow-md'>
               <table className='w-full'>
                  <thead>
                     <tr className='text-left  border-b text-[14px]'>
                        <th className='pb-[7px]'>No</th>
                        <th className='pb-[7px]'>Name</th>
                        <th className='pb-[7px]'>Status</th>
                        <th className='pb-[7px]'>Action</th>
                     </tr>
                  </thead>
                  <tbody>
                     {speaker.map((item, index) => (
                        <tr className='border-b' key={item.id}>
                           <td className='py-[8px] w-[100px]'>{index + 1}</td>
                           <td className='py-[8px] text-[15px] w-[400px]'>{item.speakerName}</td>
                           <td className='py-[8px] text-[15px] w-[200px]'>{item.status}</td>
                           <td className='py-[8px] text-[15px] flex gap-1 items-center text-white'>
                              <a href="#" className='px-[10px] py-[2px] bg-red-500 rounded-[3px]'>Delete</a>
                              <a href={`/dashboard/speaker/edit/${item.id}`} className='px-[10px] py-[2px] bg-green-500 rounded-[3px]'>Update</a>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
               {/* Pagination */}
               <div className="flex justify-center">
                  <Pagination currentPage={page + 1} totalPages={pages} onPageChange={(newPage) => setPage(newPage - 1)} />
               </div>
            </div>
         </div>
      </div>
   )
}

export default Speaker