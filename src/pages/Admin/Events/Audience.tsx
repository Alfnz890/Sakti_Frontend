import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Papa from 'papaparse'

const API_BASE_URL = import.meta.env.VITE_URL_API

const Audience = () => {

   const { id } = useParams()
   const [data, setData] = useState(null)

   useEffect(() => {
      const getData = async () => {
         const response = await axios.get(`${API_BASE_URL}/api/v1/events/${id}`)
         setData(response.data)
      }
      getData();
   }, [id])

   const formatDate = (dateString: string) => {
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-GB', options);
   };

   const exportToCsv = () => {
      if (!data?.EventUser || data.EventUser?.length === 0) {
         alert("No audience data available!")
         return;
      }

      const csvData = []

      csvData.push(["Event Name", data.eventName])
      csvData.push(["Event Place", data.place])
      csvData.push(["Event Link", data.link])
      csvData.push(["Event Status", data.status])
      csvData.push(["Event Time", data.time])
      csvData.push(["Event Date", data.date])
      csvData.push(["Event Speaker", data.Speaker.speakerName])
      csvData.push(["Event Position", data.Speaker.speakerPosition])
      csvData.push([]);

      csvData.push(["No", "Username", "Email", "Phone"]);
      data.EventUser?.forEach((item, index) => {
         csvData.push([index + 1, item.User.first_name, item.User.email, item.User.phone || "N/A"]);
      });

      const csv = Papa.unparse(csvData);

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `event_audience_${data.eventName}.csv`;
      link.click();
   }

   return (
      <>
         <div className="container mx-auto">
            <div className="p-[1px] border mt-5 border-t-yellow-primer border-t-2">
               <div className="overflow-x-auto p-2 rounded-[3px]">
                  <table className="w-full text-sm">
                     <tr className="border">
                        <td className="w-[200px] p-[6px]">Event Name</td>
                        <td>: {data?.eventName}</td>
                     </tr>
                     <tr className="border">
                        <td className="w-[200px] p-[6px]">Place</td>
                        <td>: {data?.place}</td>
                     </tr>
                     <tr className="border">
                        <td className="w-[200px] p-[6px]">Link</td>
                        <td>: <a href={data?.link} className="underline" target="_blank">{data?.link}</a></td>
                     </tr>
                     <tr className="border">
                        <td className="w-[200px] p-[6px]">Status</td>
                        <td>: {data?.status}</td>
                     </tr>
                     <tr className="border">
                        <td className="w-[200px] p-[6px]">Time</td>
                        <td>: {data?.time}</td>
                     </tr>
                     <tr className="border">
                        <td className="w-[200px] p-[6px]">Date</td>
                        <td>: {formatDate(data?.date)}</td>
                     </tr>
                     <tr className="border">
                        <td className="w-[200px] p-[6px]">Speaker</td>
                        <td>: {data?.Speaker?.speakerName}</td>
                     </tr>
                     <tr className="border">
                        <td className="w-[200px] p-[6px]">Speaker Position</td>
                        <td>: {data?.Speaker?.speakerPosition}</td>
                     </tr>
                     <tr className="border">
                        <td className="w-[200px] p-[6px]">Total Participants</td>
                        <td>: {data?.participantCount}</td>
                     </tr>
                  </table>
               </div>
            </div>
            <div className="my-4">
               <button className="text-sm px-3 py-[7px] bg-yellow-primer rounded-[2px]" onClick={exportToCsv}>🖨️ Print Data</button>
            </div>
            <div className="border p-2 border-t-yellow-primer border-t-2">
               <div>
                  <table className="w-full text-sm">
                     <thead>
                        <tr className="border text-left">
                           <th className="p-[6px]">No</th>
                           <th>Username</th>
                           <th>Email</th>
                           <th className="text-left">Phone</th>
                        </tr>
                     </thead>
                     <tbody>
                        {data?.EventUser?.map((item, index) => (
                           <tr key={item.id} className="text-left border">
                              <th className="p-[6px]">{index + 1}</th>
                              <td>{item.User.first_name || item.User.name}</td>
                              <td>{item.User.email}</td>
                              <td>{item.User.phone}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </>
   )
}

export default Audience