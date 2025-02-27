import Navbar from "../../components/navbar"
import CardSimpleHistory from "../../components/Report/CardSimpleHistory"
import Footer from "../../components/Footer"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import parse from 'html-react-parser'

const API_BASE_URL = import.meta.env.VITE_URL_API

const HistoryDetail = () => {

   const [reportDetail, setReportDetail] = useState([]);
   const { id } = useParams();

   useEffect(() => {
      const getReport = async () => {
         const response = await axios.get(`${API_BASE_URL}/api/v1/reports/${id}`)
         setReportDetail(response.data)
      }
      getReport();
   }, [])

   return (
      <>
         <Navbar />
         <div className="container mx-auto py-[30px]">
            <div className="flex justify-center items-center">
               <h3 className="text-[24px] font-medium w-[600px] text-center">{parse(reportDetail.title || "")}</h3>
            </div>
            <p className="text-center text-[12px] mt-[10px]">{reportDetail.author}</p>
            <img src={reportDetail.url} className="my-[30px] h-[500px] w-full object-cover rounded-[10px]" />
            <div className="history-body flex justify-between gap-[15px]">
               <div className="col">
                  <p className="text-[15px] mb-[10px]">{parse(reportDetail.body || "")}</p>
               </div>
               <div className="col w-[2500px]">
                  <div className="p-[10px]" id="history-more">
                     <h3 className="text-[20px] font-medium">More</h3>
                     <div className="mt-[20px] flex flex-col gap-[15px]">
                        <CardSimpleHistory />
                        <CardSimpleHistory />
                        <CardSimpleHistory />
                        <CardSimpleHistory />
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <Footer />
      </>
   )
}

export default HistoryDetail