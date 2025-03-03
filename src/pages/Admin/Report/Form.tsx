import React, { useEffect, useState } from 'react';
import UploadLogo from '../../../assets/icons/cloud-computing.png'
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

const API_BASE_URL = import.meta.env.VITE_URL_API

const HistoryForm: React.FC = () => {

   const [title, setTitle] = useState('');
   const [body, setBody] = useState('');
   const [file, setFile] = useState('');
   const [preview, setPreview] = useState('');
   const [dataAdmin, setDataAdmin] = useState({ id: null, username: "", email: "" })
   const navigate = useNavigate();

   useEffect(() => {
      const storedData = localStorage.getItem('admin');
      if (storedData) {
         setDataAdmin(JSON.parse(storedData))
      }
   }, [])

   const loadImage = (e) => {
      const image = e.target.files[0]
      setFile(image)
      setPreview(URL.createObjectURL(image))
   }

   const onSubmit = async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append('title', title);
      formData.append('body', body);
      formData.append('file', file);
      formData.append('author', dataAdmin.first_name);

      try {
         await axios.post(`${API_BASE_URL}/api/v1/reports`, formData, {
            headers: {
               'Content-Type': 'multipart/form-data'
            }
         })

         await Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Your publish has been added!"
         })

         navigate('/dashboard/report')
      } catch (error) {
         console.log(error)
         Swal.fire({
            icon: "error",
            title: "Failed to Add!",
            text: "Make sure to fill in all the entries!"
         })
      }
   }

   return (
      <>
         <div className="container mx-auto mt-3 border shadow-md p-3">
            <form onSubmit={onSubmit}>
               <div className="row flex border-b items-center py-[20px]">
                  <div className="col max-w-[290px]">
                     <p className="text-black font-medium text-[15px]">Image</p>
                     <p className="text-[12px] text-light-grey mt-1">Upload relevant images for the event. Make sure the image has a high resolution and is a supported file format (JPG, PNG).</p>
                  </div>
                  <div className="col w-full">
                     <div className="h-[120px] w-[190px] border-2 border-dashed flex flex-col gap-1 justify-center items-center ml-[90px] object-cover cursor-pointer" onClick={() => document.getElementById('image-history-upload')?.click()}>

                        {preview ? (
                           <img src={preview} alt="Preview" className="h-[120px] w-[190px] object-cover" />
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
                     <p className="text-black font-medium text-[15px]">Title</p>
                     <p className="text-[12px] text-light-grey mt-1">Please enter a clear and compelling title for your blog post that accurately represents its content and captures the reader's interest.</p>
                  </div>
                  <div className="col w-full">
                     <ReactQuill theme="snow" value={title} onChange={setTitle} className="ml-[90px] h-[100px]" />
                  </div>
               </div>
               <div className="row flex items-center pt-[20px] pb-[40px]">
                  <div className="col max-w-[290px]">
                     <p className="text-black font-medium text-[15px]">Body</p>
                     <p className="text-[12px] text-light-grey mt-1">Please provide the main content of your blog post, ensuring it is well-structured, informative, and engaging for your readers.</p>
                  </div>
                  <div className="col w-full">
                     <ReactQuill theme="snow" value={body} onChange={setBody} className="ml-[90px] h-[200px]" />
                  </div>
               </div>
               <div className="mt-4 flex gap-2 items-center justify-end">
                  <a href="/dashboard" className="bg-yellow-primer px-5 py-[8px] rounded-[4px]">Cancel</a>
                  <button type="submit" className="bg-green-600 text-white px-7 py-2 rounded-[4px]">Save</button>
               </div>
            </form>
         </div>
      </>
   )
}

export default HistoryForm