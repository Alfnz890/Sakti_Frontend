import Navbar from "../../components/navbar"
import Footer from "../../components/Footer"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import EventAgenda from "../../components/EventDetail/EventAgenda"
import { ToastContainer, toast } from 'react-toastify';
import parse from 'html-react-parser'

const API_BASE_URL = import.meta.env.VITE_URL_API

const EventDetail = () => {

   const { id } = useParams();

   const [event, setEvent] = useState({ Speaker: [] });
   const [user, setUser] = useState(null);
   const [isRegister, setIsRegister] = useState(false)

   useEffect(() => {

      const getCurrentUser = async () => {
         try {
            const response = await axios.get(`${API_BASE_URL}/api/v1/currentUser`, { withCredentials: true })
            setUser(response.data)
         } catch (error) {
            console.log(error);
         }
      }

      const getThisEvent = async () => {
         const response = await axios.get(`${API_BASE_URL}/api/v1/public/events/${id}`)
         setEvent(response.data)
      }

      getThisEvent();
      getCurrentUser();

   }, [id])

   useEffect(() => {
      const checkUserRegistrationToThisEvent = async () => {

         try {
            const response = await axios.post(`${API_BASE_URL}/api/v1/events/checkRegistered/${user.id}/${id}`, {}, { withCredentials: true })

            if (response.status === 200) {
               setIsRegister(true)
            } else {
               setIsRegister(false)
            }

         } catch (error) {
            console.log(error)
         }

      }

      checkUserRegistrationToThisEvent()
   }, [user, id])

   const addUserToEvent = async () => {
      try {
         const response = await axios.post(`${API_BASE_URL}/api/v1/events/addUser/${user.id}/${id}`, {}, { withCredentials: true })

         if (response.status === 201) {

            setIsRegister(true)
            console.log(response.data?.msg)

            toast.success('Register Success!', {
               position: "top-right",
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: false,
               theme: "light",
            });

         } else {
            setIsRegister(false)

            toast.error('Something Wrong!', {
               position: "top-right",
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: false,
               theme: "light",
            });
         }
      } catch (error) {
         console.log(error)
      }
   }

   const formatDate = (dateString: string) => {
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-GB', options);
   };

   const renderButton = () => {
      if (!user) {
         return (
            <button className="text-sm mt-3 px-5 py-2 rounded-[4px] bg-yellow-primer shadow-md">Login to Register</button>
         )
      }

      if (isRegister) {
         return (
            <button className="text-sm mt-3 px-5 py-2 rounded-[4px] bg-light-grey shadow-md" disabled>Registered</button>
         )
      }

      return (
         <button className="text-sm mt-3 px-5 py-2 rounded-[4px] bg-yellow-primer shadow-md" onClick={addUserToEvent}>Register</button>
      )
   }



   return (
      <>
         <Navbar />
         {/* Judul */}
         <div className="bg-yellow-light">
            <div className="container mx-auto py-[30px]">
               <div className="flex items-center justify-between">
                  <div className="col max-w-[550px]">
                     <h3 className="text-[29px] leading-[35px] font-medium text-black">{event.eventName}</h3>
                     <div className="mt-[8px] text-light-grey text-[14px] flex flex-col gap-[4px]">
                        {/* <p>26 - 27 December 2024</p> */}
                        <p>{formatDate(event.date)}</p>
                        <p>{event.place}</p>
                     </div>
                     {renderButton()}
                     <ToastContainer />
                  </div>
                  <img src={event.url} className="w-[240px] h-[150px] object-cover" />
               </div>
            </div>
         </div>
         {/* Alasan */}
         <div className="container mx-auto flex justify-between gap-[20px] py-[30px]">
            <div className="col w-[700px]">
               <h3 className="text-black font-semibold text-[20px]">Why should you take part in this event?</h3>
               <p className="text-[14px] mt-[10px]">{parse(event.reasons || "")}</p>
            </div>
            <div className="col w-[600px]">
               <h3 className="text-black font-semibold text-[20px]">what's going on at this event?</h3>
               <p className="text-[14px] mt-[10px]">{parse(event.descriptions || "")}</p>
            </div>
         </div>
         {/* Mentor */}
         <div className="bg-yellow-light flex justify-center py-[30px] gap-[50px] items-center">
            <img src={event.Speaker[0]?.urlimage} className="w-[140px] h-[140px] object-cover rounded-full" />
            <div className="max-w-[600px] flex flex-col gap-[3px]">
               <h3 className="text-[19px] font-medium text-black">{event.Speaker[0]?.speakerName}</h3>
               <p className="text-[14px] text-light-grey" >{event.Speaker[0]?.speakerPosition}</p>
               <p className="text-[14px] w-[480px]">{parse(event.Speaker[0]?.speakerBiography || "")}</p>
            </div>
         </div>
         {/* Syllabus */}
         <div className="div  mt-[20px] py-[30px]">
            <div className="container mx-auto flex gap-[20px]">
               <div className="w-[1900px]">
                  <EventAgenda date={formatDate(event.date)} details={event.details} time={event.time} />
               </div>
               <div className="w-full flex flex-col gap-1">
                  <h1 className="text-2xl font-medium">Note's for audience</h1>
                  <p className="text-sm">{parse(event.notes || "")}</p>
               </div>
            </div>
         </div>
         <Footer />
      </>
   )
}

export default EventDetail