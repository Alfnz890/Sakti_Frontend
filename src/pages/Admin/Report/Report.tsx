import Searcglogo from '../../../assets/icons/search-interface-symbol.png'
import Person from '../../../assets/person.jpg'
import Logo from '../../../assets/icons/logo.png'
import Eventlogo from '../../../assets/icons/schedule.png'
import Userlogo from '../../../assets/icons/user.png'
import DashboardLogo from '../../../assets/icons/dashboard.png'
import Bloglogo from '../../../assets/icons/blogging.png'
import Exitlogo from '../../../assets/icons/exit.png'
import Categorylogo from '../../../assets/icons/category.png'
import { useEffect, useState } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'
import Pagination from '../../../components/Pagination'
import Swal from "sweetalert2";
import parse from 'html-react-parser'

interface ReportDataType {
   title: string
   createdAt: string
   author: string
   id: number
}

const API_BASE_URL = import.meta.env.VITE_URL_API

const Report = () => {

   const [reports, setReports] = useState<ReportDataType[]>([]);
   const [dataAdmin, setDataAdmin] = useState({ id: null, username: "", email: "" })
   const [page, setPage] = useState(0)
   const [pages, setPages] = useState(1)
   const [keyword, setKeyword] = useState("")
   const [query, setQuery] = useState("")

   useEffect(() => {
      const storedData = localStorage.getItem('admin');
      if (storedData) {
         setDataAdmin(JSON.parse(storedData))
      }
   }, [])

   useEffect(() => {
      fetchReports(page);
   }, [page, keyword])

   const fetchReports = async (page: number) => {
      try {
         const response = await axios.get(`${API_BASE_URL}/api/v1/reports?page=${page}&limit=5&search_query=${keyword}`)
         const formattedReports = response.data.result.map((report) => ({
            ...report,
            createdAt: dayjs(report.createdAt).format('DD-MM-YYYY')
         }))
         setReports(formattedReports)
         setPage(response.data.page)
         setPages(response.data.totalPage)
      } catch (error) {
         console.log(error)
      }
   }

   const logout = async () => {
      localStorage.removeItem('admin');
      window.location.href = ('/');
   }

   const deleteReport = async (id) => {
      Swal.fire({
         title: "Are You Sure?",
         text: "You won't be able to revert this!",
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#d33",
         cancelButtonColor: "#3085d6",
         confirmButtonText: "Delete"
      }).then(async (result) => {
         if (result.isConfirmed) {
            try {
               await axios.delete(`${API_BASE_URL}/api/v1/reports/${id}`)
               await Swal.fire("Deleted!", "Your event has been deleted.", "success")
               window.location.reload()
            } catch (error) {
               Swal.fire("Error", "Failed to delete event", "error")
            }
         }
      })
   }

   const searchData = (e) => {
      e.preventDefault();
      setPage(0);
      setKeyword(query);
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
                  <a href='/dashboard/event' className='flex items-center gap-2 p-2 rounded-[6px] '>
                     <img src={Eventlogo} className='w-[25px]' />
                     <p className='text-sm'>Events</p>
                  </a>
                  <a href='/dashboard/users' className='flex items-center gap-2 p-2 rounded-[6px]'>
                     <img src={Userlogo} className='w-[22px]' />
                     <p className='text-sm'>Users</p>
                  </a>
                  <a href='/dashboard/report' className='flex items-center gap-2 p-2 rounded-[6px] bg-yellow-primer'>
                     <img src={Bloglogo} className='w-[22px]' />
                     <p className='text-sm'>Publish</p>
                  </a>
                  <a href='/dashboard/speaker' className='flex items-center gap-2 p-2 rounded-[6px]'>
                     <img src={Userlogo} className='w-[22px]' />
                     <p className='text-sm'>Speakers</p>
                  </a>
                  <a href='/dashboard/category' className='flex items-center gap-2 p-2 rounded-[6px]'>
                     <img src={Categorylogo} className='w-[22px]' />
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
                  <form onSubmit={searchData}>
                     <div className='border flex items-center gap-2 px-4 py-2 rounded-[50px] shadow-md bg-white'>
                        <img src={Searcglogo} className='w-[17px]' />
                        <input type="text" placeholder='Search' className='w-[350px] outline-none' value={query} onChange={(e) => setQuery(e.target.value)} />
                     </div>
                  </form>
                  <div className='flex items-center gap-3'>
                     <img src={Person} className='w-[40px] rounded-full' />
                     <div>
                        <p className='text-[14px]'>{dataAdmin.first_name}</p>
                        <p className='text-[11px] text-light-grey'>019283712638123123</p>
                     </div>
                  </div>
               </div>
               <div className='my-[23px] flex items-center justify-between'>
                  <h3 className='text-[25px] font-semibold tracking-wider'>Publish</h3>
                  <a href="/dashboard/history/form">
                     <div className='px-4 py-2 rounded-[5px] bg-yellow-primer shadow-md'>
                        <p className='text-[14px]'>+ Add New Publish</p>
                     </div>
                  </a>
               </div>
               {/* table */}
               <div className='border p-3 rounded-[6px] bg-white shadow-md'>
                  <table className='w-full'>
                     <thead>
                        <tr className='text-left  border-b text-[14px]'>
                           <th className='pb-[7px]'>No</th>
                           <th className='pb-[7px] w-[340px]'>Title</th>
                           <th className='pb-[7px] px-[13px]'>Date</th>
                           <th className='pb-[7px]'>Author</th>
                           <th className='pb-[7px]'>Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        {reports.length > 0 ? (
                           reports.map((item, index) => (
                              <tr className='border-b' key={item.id}>
                                 <td className='py-[8px]'>{index + 1}</td>
                                 <td className='py-[8px] text-[15px] line-clamp-2 overflow-hidden'>{parse(item.title || "")}</td>
                                 <td className='py-[8px] text-[15px] px-[13px]'>{item.createdAt}</td>
                                 <td className='py-[8px] text-[15px]'>{item.author || dataAdmin.first_name}</td>
                                 <td className='py-[8px] text-[15px] flex gap-1 items-center text-white'>
                                    <a href={`/dashboard/report/update/${item.id}`} className='px-[15px] py-[2px] bg-green-500 rounded-[3px]'>Edit</a>
                                    <button className='px-[10px] py-[2px] bg-red-500 rounded-[3px]' onClick={() => deleteReport(item.id)}>Delete</button>
                                 </td>
                              </tr>
                           ))
                        ) : (
                           <p className='text-sm'>No Publish Found!</p>
                        )}
                     </tbody>
                  </table>
                  {/* Pagination */}
                  <div className='flex items-center justify-center mt-[30px] text-[14px]'>
                     <Pagination currentPage={page + 1} totalPages={pages} onPageChange={(newPage) => setPage(newPage - 1)} />
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default Report