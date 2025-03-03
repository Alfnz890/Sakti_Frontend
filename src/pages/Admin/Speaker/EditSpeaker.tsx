import { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import UploadLogo from '../../../assets/icons/cloud-computing.png'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from "sweetalert2";

const API_BASE_URL = import.meta.env.VITE_URL_API

const EditSpeaker = () => {

   const [file, setFile] = useState('')
   const [preview, setPreview] = useState('')
   const [name, setName] = useState('')
   const [position, setPosition] = useState('')
   const [biography, setBiography] = useState('')
   const [status, setStatus] = useState('Active')
   const navigate = useNavigate();
   const { id } = useParams();

   const loadImage = (e) => {
      const image = e.target.files[0]
      setFile(image)
      setPreview(URL.createObjectURL(image))
   }

   useEffect(() => {
      const getData = async () => {
         const response = await axios.get(`${API_BASE_URL}/api/v1/speaker/${id}`)
         setName(response.data.speakerName)
         setPreview(response.data.urlimage)
         setPosition(response.data.speakerPosition)
         setBiography(response.data.speakerBiography)
         setStatus(response.data.status)
      }
      getData()
      console.log({ status: status })
   }, [])

   const onSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('name', name);
      formData.append('biography', biography);
      formData.append('position', position);
      formData.append('file', file);
      formData.append('status', status);

      console.log({ name, position, biography, file })

      try {

         await axios.patch(`${API_BASE_URL}/api/v1/speaker/${id}`, formData, {
            headers: {
               'Content-Type': 'multipart/form-data'
            }
         })

         await Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Speaker has been updated"
         })

         navigate('/dashboard/speaker')
      } catch (error) {
         console.log(error)
         Swal.fire({
            icon: "error",
            title: "Failed!",
            text: "Speaker failed to update"
         })
      }
   }

   return (
      <div className="container mx-auto mt-3 border shadow-md p-3">
         <form onSubmit={onSubmit}>
            <div className="row flex border-b items-center py-[20px]">
               <div className="col max-w-[290px]">
                  <p className="text-black font-medium text-[15px]">Image</p>
                  <p className="text-[12px] text-light-grey mt-1">Upload relevant images for the event. Make sure the image has a high resolution and is a supported file format (JPG, PNG).</p>
               </div>
               <div className="col w-full">
                  <div className="h-[120px] w-[120px] border-2 border-dashed flex flex-col gap-1 justify-center items-center ml-[90px] object-cover cursor-pointer" onClick={() => document.getElementById('image-history-upload')?.click()}>

                     {preview ? (
                        <img src={preview} alt="Preview" className="h-[120px] w-[120px] object-cover" />
                     ) : (
                        <>
                           <img src={UploadLogo} className="w-[25px]" alt="Upload Icon" />
                           <p className="text-[11px]">Upload Here</p>
                        </>
                     )}
                     <input
                        id="image-history-upload"
                        type="file"
                        accept="image/*"
                        onChange={loadImage}
                        className="hidden"
                     />

                  </div>
               </div>
            </div>
            <div className="row flex items-center pt-[20px] pb-[40px]">
               <div className="col max-w-[290px]">
                  <p className="text-black font-medium text-[15px]">Name</p>
                  <p className="text-[12px] text-light-grey mt-1">Please enter the full name of the speaker as it should appear in the event details. Ensure that the name is correctly spelled and formatted.</p>
               </div>
               <div className="col w-full">
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='w-[320px] border rounded-[3px] outline-none bg-lighter-grey text-[13px] p-2 ml-[90px]' />
               </div>
            </div>
            <div className="row flex items-center pt-[20px] pb-[40px]">
               <div className="col max-w-[290px]">
                  <p className="text-black font-medium text-[15px]">Position</p>
                  <p className="text-[12px] text-light-grey mt-1">Please enter the speaker's position or title, specifying their role within the organization or event (e.g., CEO, Marketing Director, Keynote Speaker).</p>
               </div>
               <div className="col w-full">
                  <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} className='w-[320px] border rounded-[3px] outline-none bg-lighter-grey text-[13px] p-2 ml-[90px]' />
               </div>
            </div>
            <div className="row flex items-center pt-[20px] pb-[40px]">
               <div className="col max-w-[290px]">
                  <p className="text-black font-medium text-[15px]">Biography</p>
                  <p className="text-[12px] text-light-grey mt-1">Please fill in the speaker biography with complete and interesting information. Include your educational background, professional experience, achievements, and topics or areas of expertise.</p>
               </div>
               <div className="col w-full">
                  <ReactQuill theme="snow" value={biography} onChange={setBiography} className="ml-[90px] h-[200px]" />
               </div>
            </div>
            <div className="row flex items-center py-[20px]">
               <div className="col max-w-[290px]">
                  <p className="text-black font-medium text-[15px]">Status</p>
                  <p className="text-[12px] text-light-grey mt-1">Please enter the speaker's status by specifying whether they are 'Active' or 'Non-Active'. Ensure that you select the appropriate status based on the speaker's current availability and engagement in events</p>
               </div>
               <div className="col w-full">
                  <select className="w-[320px] border rounded-[3px] ml-[90px] p-2 bg-lighter-grey outline-none text-[13px]" value={status} onChange={(e) => setStatus(e.target.value)}>
                     <option value="Active">Active</option>
                     <option value="Non-Active">Non Active</option>
                  </select>
               </div>
            </div>
            <div className="mt-4 flex gap-2 items-center justify-end">
               <a href="/dashboard/speaker" className="bg-yellow-primer px-5 py-[8px] rounded-[4px]">Cancel</a>
               <button type="submit" className="bg-green-600 text-white px-7 py-2 rounded-[4px]">Save</button>
            </div>
         </form>
      </div>
   )
}

export default EditSpeaker