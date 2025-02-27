// import Searcglogo from '../../../assets/icons/search-interface-symbol.png'
import DashboardLogo from '../../../assets/icons/dashboard.png'
import Person from '../../../assets/person.jpg'
import Logo from '../../../assets/icons/logo.png'
import Eventlogo from '../../../assets/icons/schedule.png'
import Userlogo from '../../../assets/icons/user.png'
import Bloglogo from '../../../assets/icons/blogging.png'
import Exitlogo from '../../../assets/icons/exit.png'
import axios from "axios"
import { useEffect, useState } from "react"

const API_BASE_URL = import.meta.env.VITE_URL_API

interface DashboardAdminProps {
   url: string;
   eventName: string;
   date: string;
   name: string;
   email: string;
}

const DashboardAdmin = () => {

   const [dataAdmin, setDataAdmin] = useState({ id: null, username: "", email: "" })
   const [activeEvents, setActiveEvents] = useState(0);
   const [completedEvents, setCompletedEvents] = useState(0);
   const [pendingEvents, setPendingEvents] = useState(0);
   const [cancelledEvents, setCancelledEvents] = useState(0);
   const [totalParticipants, setTotalParticipants] = useState(0);
   const [recentlyEvent, setRecentlyEvent] = useState<DashboardAdminProps[]>([]);
   const [recentlyUser, setRecentlyUser] = useState<DashboardAdminProps[]>([]);

   useEffect(() => {

      const getUser = async () => {
         const response = await axios.get(`${API_BASE_URL}/api/v1/currentUser`, { withCredentials: true })
         setDataAdmin(response.data)
      }
      getUser()
   }, [])

   useEffect(() => {

      const getActiveEvents = async () => {
         const response = await axios.get(`${API_BASE_URL}/api/v1/events?status=Active`, { withCredentials: true })
         setActiveEvents(response.data.totalRows)
      }

      const getCompletedEvents = async () => {
         const response = await axios.get(`${API_BASE_URL}/api/v1/events?status=Completed`, { withCredentials: true })
         setCompletedEvents(response.data.totalRows)
      }

      const getPendingEvents = async () => {
         const response = await axios.get(`${API_BASE_URL}/api/v1/events?status=Pending`, { withCredentials: true })
         setPendingEvents(response.data.totalRows)
      }

      const getCancelledEvents = async () => {
         const response = await axios.get(`${API_BASE_URL}/api/v1/events?status=Cancelled`, { withCredentials: true })
         setCancelledEvents(response.data.totalRows)
      }

      const getTotalParticipants = async () => {
         const response = await axios.get(`${API_BASE_URL}/api/v1/getAllParticipants`, { withCredentials: true })
         setTotalParticipants(response.data)
      }

      getTotalParticipants()
      getCancelledEvents()
      getCompletedEvents();
      getPendingEvents();
      getActiveEvents()

   }, [])

   useEffect(() => {

      const getRecentlyEvent = async () => {
         const response = await axios.get(`${API_BASE_URL}/api/v1/events?limit=1`, { withCredentials: true })
         setRecentlyEvent(response.data.result[0])
      }

      const getRecentlyUser = async () => {
         const response = await axios.get(`${API_BASE_URL}/api/v1/users?limit=1`, { withCredentials: true })
         setRecentlyUser(response.data.result[0])
      }

      getRecentlyUser();
      getRecentlyEvent();
   }, [])

   const logout = async () => {
      try {
         await axios.delete(`${API_BASE_URL}/api/v1/logout`, { withCredentials: true })
         window.location.href = ('/');
      } catch (error) {
         console.log(error);
      }
   }

   const formatDate = (dateString: string) => {
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-GB', options);
   };

   return (
      <div className='flex h-[100vh]'>
         <div className="col w-[280px] p-4 border border-l">
            <div className='flex items-center gap-2'>
               <img src={Logo} className='w-[45px]' />
               <h3>SAKTIEvent</h3>
            </div>
            <div className="menu mt-[30px] flex flex-col gap-3">
               <a href='/dashboard' className='flex items-center gap-2 p-2 rounded-[6px] bg-yellow-primer'>
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
               <a onClick={logout} className='flex items-center gap-2 p-2 absolute bottom-5 cursor-pointer'>
                  <img src={Exitlogo} className='w-[20px]' />
                  <p className='text-sm'>Logout</p>
               </a>
            </div>
         </div>
         <div className="col w-full p-6 bg-[#f5f5f5]">
            <div className='flex items-center justify-end'>
               <div className='flex items-center gap-3'>
                  <img src={Person} className='w-[40px] rounded-full' />
                  <div>
                     <p className='text-[14px]'>{dataAdmin.username}</p>
                     <p className='text-[11px] text-light-grey'>019283712638123123</p>
                  </div>
               </div>
            </div>

            {/* Right */}
            <div className='mt-9 flex items-center gap-3'>
               <div className='border border-light-grey bg-white w-[160px] h-[120px] p-3 flex flex-col justify-between rounded-[5px] shadow-md'>
                  <p className='text-[15px]'>✅ Active Events</p>
                  <h1 className='text-3xl'>{activeEvents}</h1>
               </div>
               <div className='border border-light-grey bg-white w-[160px] h-[120px] p-3 flex flex-col justify-between rounded-[5px] shadow-md'>
                  <p className='text-[15px]'>⌛ Pending Events</p>
                  <h1 className='text-3xl'>{pendingEvents}</h1>
               </div>
               <div className='border border-light-grey bg-white w-[160px] h-[120px] p-3 flex flex-col justify-between rounded-[5px] shadow-md'>
                  <p className='text-[15px]'>🎉 Completed Events</p>
                  <h1 className='text-3xl'>{completedEvents}</h1>
               </div>
               <div className='border border-light-grey bg-white w-[160px] h-[120px] p-3 flex flex-col justify-between rounded-[5px] shadow-md'>
                  <p className='text-[15px]'>❌ Cancelled Events</p>
                  <h1 className='text-3xl'>{cancelledEvents}</h1>
               </div>
               <div className='border border-light-grey bg-white w-[160px] h-[120px] p-3 flex flex-col justify-between rounded-[5px] shadow-md'>
                  <p className='text-[15px]'>📌 Registered Participants</p>
                  <h1 className='text-3xl'>{totalParticipants}</h1>
               </div>
            </div>

            <div className='flex mt-[30px] gap-6'>
               <div className='w-[300px]'>
                  <h2 className='font-medium'>Recently Event</h2>
                  <div className='border p-3 flex items-center gap-3 mt-2 shadow-md rounded-[5px] bg-white'>
                     <img src={recentlyEvent.url} className='w-[30px] h-[30px] object-cover rounded' />
                     <div className='text-[12px]'>
                        <p className='line-clamp-1'>{recentlyEvent.eventName}</p>
                        <p className='text-light-grey'>{formatDate(recentlyEvent.date)}</p>
                     </div>
                  </div>
               </div>
               <div className='w-[300px]'>
                  <h2 className='font-medium'>Recently User</h2>
                  <div className='border p-3 flex items-center gap-3 mt-2 shadow-md rounded-[5px] bg-white'>
                     <img src={Logo} className='w-[30px]' />
                     <div className='text-[12px]'>
                        <p className='line-clamp-1'>{recentlyUser.name}</p>
                        <p className='text-light-grey'>{recentlyUser.email}</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default DashboardAdmin