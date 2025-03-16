import axios from "axios"
import Footer from "../../components/Footer"
import Navbar from "../../components/navbar"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Pagination from "../../components/Pagination"
import CertificateImage from '../../assets/Cream Bordered Appreciation Certificate.png'
import html2canvas from 'html2canvas'
import jsPDF from "jspdf"

interface UserDashboardProps {
   id: number;
}

const API_BASE_URL = import.meta.env.VITE_URL_API

const UserDashboard = () => {

   const { id } = useParams();
   const [user, setUser] = useState<UserDashboardProps[]>([])
   const [history, setHistory] = useState([])
   const [page, setPage] = useState(0)
   const [pages, setPages] = useState(1)

   const logout = async () => {
      localStorage.removeItem('user');
      window.location.href = ('/');
   }

   useEffect(() => {

      const storedUser = localStorage.getItem('user');

      if (storedUser) {
         setUser(JSON.parse(storedUser))
      }

   }, [])

   useEffect(() => {
      getHistoryUser(page);
   }, [page])

   const getHistoryUser = async (page: number) => {
      const response = await axios.get(`${API_BASE_URL}/api/v1/history/user/${id}?limit=5&page=${page}`)
      setHistory(response.data.result)
      setPage(response.data.page)
      setPages(response.data.totalPage)
   }

   const handleDownload = async () => {
      const pdf = new jsPDF({
         orientation: "landscape",
         unit: "mm",
         format: "a4"
      })
      const img = new Image();
      img.src = CertificateImage;
      img.onload = () => {
         pdf.addImage(img, "PNG", 0, 0, 297, 210);
         pdf.save("Certificate.pdf")
      }
   }

   return (
      <>
         <Navbar />
         <div className="bg-yellow-light py-[25px]">
            <div className="container mx-auto text-[27px] font-medium">
               <h2>My Events</h2>
            </div>
         </div>
         <div className="container mx-auto flex justify-end items-center">
            <Pagination currentPage={page + 1} totalPages={pages} onPageChange={(newPage) => setPage(newPage - 1)} />
         </div>
         <div className="container mx-auto mt-4 mb-6 flex gap-4">
            <div className="col w-[240px] border-t border-b py-5">
               <div className="flex flex-col gap-2">
                  <a href={`/user/dashboard/${user.id}`} className="bg-yellow-primer p-2 rounded-[5px] text-sm">My Events</a>
                  <a href={`/user/myprofile/${user.id}`} className="p-2 rounded-[5px] text-sm">My Profile</a>
                  <button onClick={logout} className="p-2 rounded-[5px] text-start text-sm">Log Out</button>
               </div>
            </div>
            <div className="col w-full border-t border-b py-1">
               <table className="w-full">
                  <thead>
                     <tr>
                        <th className="text-sm text-left py-2 px-3">No</th>
                        <th className="text-sm text-left py-2 px-3 w-[350px]">Event</th>
                        <th className="text-sm text-left py-2 px-3">Time</th>
                        <th className="text-sm text-left py-2 px-3">Link</th>
                        <th className="text-sm text-left py-2 px-3">Status</th>
                        <th className="text-sm text-left py-2 px-3">Certificate</th>
                     </tr>
                  </thead>
                  <tbody>
                     {history.length > 0 ? (
                        history.map((item, index) => (
                           <tr>
                              <td className="text-sm text-left py-2 px-3">{index + 1}</td>
                              <td className="text-sm text-left py-2 px-3">{item.event.eventName}</td>
                              <td className="text-sm text-left py-2 px-3">09.30</td>
                              <td className="text-sm text-left py-2 px-3"><a href={item.event.link} className="underline" target="_blank">{item.event.link}</a></td>
                              <td className="text-sm text-left py-2 px-3">{item.event.status}</td>
                              <td className="text-sm text-left py-2 px-3">
                                 <button className="bg-green-500 text-sm text-white px-2 py-[2px] rounded-[3px]" onClick={handleDownload}>Certificate</button>
                              </td>
                           </tr>
                        ))
                     ) : (
                        <p className="text-sm text-light-grey italic">No Events Found!</p>
                     )}
                  </tbody>
               </table>
            </div>
         </div>
         <Footer />
      </>
   )
}

export default UserDashboard