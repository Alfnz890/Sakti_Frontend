import Navbar from "../../components/navbar"
import facebook from '../../assets/icons/facebook.png'
import instagram from '../../assets/icons/instagram.png'
import youtube from '../../assets/icons/youtube.png'
import tiktok from '../../assets/icons/tiktok.png'
import Footer from "../../components/Footer"
import { useEffect, useState } from "react"
import axios from "axios"
import Card from "../../components/Home/Card"

const API_BASE_URL = import.meta.env.VITE_URL_API

const ClassList = () => {

   const [data, setData] = useState([]);

   useEffect(() => {
      const getAllEvents = async () => {
         const response = await axios.get(`${API_BASE_URL}/api/v1/categories`)
         console.log(response.data.data)
         setData(response.data.data)
      }
      getAllEvents();
   }, [])

   const formatDate = (dateString: string) => {
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-GB', options);
   };

   return (
      <>
         <Navbar />
         <div className="bg-white h-[225px] flex justify-center items-center">
            <h1 className="text-[70px] font-semibold text-yellow-primer">Events</h1>
         </div>
         <div className="container mx-auto py-[35px] flex items-center justify-between gap-[20px]">
            <p className="w-[600px] text-[15px]">In a rapidly evolving digital world, continuous learning is paramount. At TechSpark, we curate a diverse range of cutting-edge technology events designed to empower you with the skills and knowledge needed to thrive. Join our community of innovators, invest in your future, and together, let's navigate the exciting landscape of tomorrow's technology.</p>
            <div className='flex gap-[15px]'>
               <div className='bg-white p-[6px] rounded-full'>
                  <a href="#"><img src={facebook} className='w-[33px]' /></a>
               </div>
               <div className='bg-white p-[6px] rounded-full'>
                  <a href="#"><img src={instagram} className='w-[33px]' /></a>
               </div>
               <div className='bg-white p-[6px] rounded-full'>
                  <a href="#"><img src={youtube} className='w-[33px]' /></a>
               </div>
               <div className='bg-white p-[6px] rounded-full'>
                  <a href="#"><img src={tiktok} className='w-[33px]' /></a>
               </div>
            </div>
         </div>
         {/* Get All Events by Category */}
         {data?.filter(item => item.Event.length > 0).map((item) => (
            <div className="mb-5">
               <div className="bg-yellow-primer" key={item.id}>
                  <div className="container mx-auto text-white text-[28px] font-semibold py-[13px]">
                     <h3 key={item.id}>{item.name}</h3>
                  </div>
               </div>
               <div className="container mx-auto my-5 flex flex-wrap">
                  <Card key={item.Event[0].id} title={item.Event[0].eventName} image={item.Event[0].url} description={item.Event[0].descriptions} id={item.Event[0].id} date={formatDate(item.Event[0].date)} />
               </div>
            </div>
         ))}

         <Footer />
      </>
   )
}

export default ClassList