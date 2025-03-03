import Navbar from "../../components/navbar"
import Footer from "../../components/Footer"
import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import CardReport from "../../components/Report/CardReport"
import Pagination from "../../components/Pagination"

interface ReportProps {
   author: string,
   createdAt: string,
   title: string,
   body: string,
   url: string,
   id: number
}

const API_BASE_URL = import.meta.env.VITE_URL_API

const History = () => {

   const [reports, setReports] = useState<ReportProps[]>([])
   const [page, setPage] = useState(0)
   const [pages, setPages] = useState(1)

   const getReports = useCallback(async () => {
      const response = await axios.get(`${API_BASE_URL}/api/v1/public/reports?limit=6&page=${page}`)
      setReports(response.data.result)
      setPage(response.data.page);
      setPages(response.data.totalPage)
   }, [page])

   useEffect(() => {
      getReports();
   }, [getReports])

   return (
      <>
         <Navbar />
         <div className="flex justify-center items-center text-[50px] font-semibold text-yellow-primer h-[230px]">
            <h1>Publish</h1>
         </div>
         <div className="container mx-auto py-[20px] flex gap-5 justify-center flex-wrap">
            {reports.map((item) => (
               <CardReport author={item.author} body={item.body} url={item.url} title={item.title} key={item.id} id={item.id} />
            ))}
         </div>
         <div className='flex items-center my-[30px] text-[14px] justify-center'>
            <Pagination currentPage={page + 1} totalPages={pages} onPageChange={(newPage) => setPage(newPage - 1)} />
         </div>
         <Footer />
      </>
   )
}

export default History