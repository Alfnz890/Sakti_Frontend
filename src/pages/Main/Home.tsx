import Navbar from '../../components/navbar'
import Footer from '../../components/Footer'
import Card from '../../components/Home/Card'
import { useEffect, useState } from 'react'
import Sponsors from '../../components/Home/Sponsors'
import { Typewriter } from 'react-simple-typewriter'
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_URL_API

interface HomeProps {
   eventName: string;
   id: number;
   url: string;
   descriptions: string;
}

const Home = () => {

   const [events, setEvents] = useState<HomeProps[]>([]);

   useEffect(() => {
      const getAllEvents = async () => {
         const response = await axios.get(`${API_BASE_URL}/api/v1/public/events?limit=8&status=Active`);
         setEvents(response.data.result)
      }
      getAllEvents()
   }, []);

   const formatDate = (dateString: string) => {
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-GB', options);
   };

   return (
      <>
         <Navbar />
         <div className='hero'>
            <div className='heroContent flex flex-col p-[15px] gap-[13px]'>
               <h1 className='text-[46px] font-semibold text-white tracking-[1px]'>
                  <Typewriter
                     words={['Welcome to SAKTIEvent!']}
                     cursor
                  />
               </h1>
               <div className='py-[3px] px-[10px] bg-yellow-primer'>
                  <p className='font-semibold text-black tracking-[2px]'>Knowledge and Skills Increase, Career and Business Soar</p>
               </div>
            </div>
         </div>
         <div className='flex justify-center items-center bg-yellow-light gap-[40px] py-[50px]'>
            <div className='flex flex-col items-center text-center'>
               <h3 className='text-3xl font-semibold text-black'>350+</h3>
               <p className='font-semibold text-black'>Event Participants</p>
            </div>
            <div className='flex flex-col items-center text-center'>
               <h3 className='text-3xl font-semibold text-black'>50+</h3>
               <p className='font-semibold text-black'>Lecturers</p>
            </div>
            <div className='flex flex-col items-center text-center'>
               <h3 className='text-3xl font-semibold text-black'>10+</h3>
               <p className='font-semibold text-black'>Event are held</p>
            </div>
         </div>
         <div className='py-[30px] bg-white'>
            <h2 className='text-center font-semibold text-black text-3xl'>Events</h2>
            <div className='flex justify-center mt-[20px]'>
               <div className='h-[2px] bg-black w-[600px]'></div>
            </div>
            <div className='container mx-auto mt-[30px] flex flex-wrap gap-[13px] justify-center'>
               {events.map((item) => (
                  <Card key={item.id} title={item.eventName} image={item.url} description={item.descriptions} id={item.id} date={formatDate(item.date)} />
               ))}
            </div>
            <div className='flex justify-center mt-[40px]'>
               <a href="/allEvents" className='text-[14px] px-[30px] py-[10px] rounded-full bg-yellow-primer text-black tracking-wide font-medium'>See All Events</a>
            </div>
         </div>
         <Sponsors />
         <Footer />
      </>
   )
}

export default Home