import React, { useEffect, useState } from "react"
import UploadLogo from '../../../assets/icons/cloud-computing.png'
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_URL_API

const Form: React.FC = () => {

   const [name, setName] = useState('');
   const [place, setPlace] = useState('Online Meet');
   const [link, setLink] = useState('');
   const [status, setStatus] = useState('Active');
   const [description, setDescription] = useState('');
   const [reasons, setReasons] = useState('');
   const [notes, setNotes] = useState('');
   const [date, setDate] = useState('');
   const [time, setTime] = useState('')
   const [details, setAgendaDetail] = useState('')
   const [file, setFile] = useState('')
   const [previewImage, setPreviewImage] = useState('');
   const [speaker, setSpeaker] = useState([]);
   const [selectedSpeaker, setSelectedSpeaker] = useState("");

   const navigate = useNavigate();

   const handelEventImage = (e) => {
      const image = e.target.files[0]
      setFile(image)
      setPreviewImage(URL.createObjectURL(image))
   }

   const onSubmit = async (e) => {
      e.preventDefault();

      const formData = new FormData();

      formData.append('name', name);
      formData.append('place', place);
      formData.append('link', link);
      formData.append('descriptions', description);
      formData.append('reasons', reasons);
      formData.append('notes', notes);
      formData.append('time', time);
      formData.append('status', status);
      formData.append('file', file);
      formData.append('date', date);
      formData.append('details', details);
      formData.append('speakerId', selectedSpeaker);

      try {
         await axios.post(`${API_BASE_URL}/api/v1/events`, formData, { withCredentials: true })
         navigate('/dashboard')
      } catch (error) {
         console.log(error)
      }

   }

   useEffect(() => {
      const getSpeaker = async () => {
         const response = await axios.get(`${API_BASE_URL}/api/v1/speaker`)
         console.log(response.data)
         setSpeaker(response.data)
      }
      getSpeaker();
   }, [])

   const handleSpeakerChange = (e) => {
      setSelectedSpeaker(e.target.value);
   };

   return (
      <>
         <div className="container mx-auto mt-[30px]">
            <form onSubmit={onSubmit}>
               {/* EVENT INFORMATION */}
               <div className="border p-3 mb-3 shadow-md font-medium text-[17px] text-black">
                  <h3>Event Information</h3>
               </div>
               <div className="border shadow-md p-3">
                  <div className="row flex items-center border-b pb-[20px]">
                     <div className="col max-w-[290px]">
                        <p className="text-black font-medium text-[15px]">Event Name</p>
                        <p className="text-[12px] text-light-grey mt-1">Please fill in the description section under Event Name with brief information about your event.</p>
                     </div>
                     <div className="col w-full">
                        <input type="text" className="w-[320px] border rounded-[3px] outline-none bg-lighter-grey text-[13px] p-2 ml-[90px]" value={name} onChange={(e) => setName(e.target.value)} />
                     </div>
                  </div>
                  <div className="row flex items-center border-b py-[20px]">
                     <div className="col max-w-[290px]">
                        <p className="text-black font-medium text-[15px]">Event Place</p>
                        <p className="text-[12px] text-light-grey mt-1">Select Event Place: 'Offline' for a physical location, or 'YouTube/Zoom' for an online event.</p>
                     </div>
                     <div className="col w-full">
                        <div className="ml-[90px]">
                           <select className="w-[320px] border rounded-[3px]  p-2 bg-lighter-grey outline-none text-[13px]" onChange={(e) => setPlace(e.target.value)}>
                              <option value="Online Meet">Online Meet</option>
                              <option value="Offline">Offline</option>
                           </select>
                           <input type="text" className="w-[320px] border rounded-[3px] outline-none bg-lighter-grey text-[13px] p-2 mt-2" placeholder="Detail" value={link} onChange={(e) => setLink(e.target.value)} />
                        </div>
                     </div>
                  </div>
                  <div className="row flex items-center border-b pb-[65px] pt-[25px]">
                     <div className="col max-w-[290px]">
                        <p className="text-black font-medium text-[15px]">Why should you take part in this event?  </p>
                        <p className="text-[12px] text-light-grey mt-1">Explain the main reasons why participants need to take part in this event. Emphasize the benefit, goal, or valuable experience they will gain.</p>
                     </div>
                     <div className="col w-full">
                        <ReactQuill theme="snow" className="ml-[90px] h-[100px]" value={reasons} onChange={setReasons} />
                     </div>
                  </div>
                  <div className="row flex items-center border-b pb-[65px] pt-[25px]">
                     <div className="col max-w-[290px]">
                        <p className="text-black font-medium text-[15px]">What's going on at this event??</p>
                        <p className="text-[12px] text-light-grey mt-1">Explain briefly and clearly what will happen during this event, including the main activities or agenda that will interest participants.</p>
                     </div>
                     <div className="col w-full">
                        <ReactQuill theme="snow" className="ml-[90px] h-[100px]" value={description} onChange={setDescription} />
                     </div>
                  </div>
                  <div className="row flex border-b items-center py-[20px]">
                     <div className="col max-w-[290px]">
                        <p className="text-black font-medium text-[15px]">Event Image</p>
                        <p className="text-[12px] text-light-grey mt-1">Upload relevant images for the event. Make sure the image has a high resolution and is a supported file format (JPG, PNG).</p>
                     </div>
                     <div className="col w-full">
                        <div className="h-[120px] w-[190px] border-2 border-dashed flex flex-col gap-1 justify-center items-center ml-[90px] object-cover cursor-pointer" onClick={() => document.getElementById("image-upload-input")?.click()}>

                           {previewImage ? (
                              <img src={previewImage} alt="Preview" className="h-[120px] w-[190px] object-cover" />
                           ) : (
                              <>
                                 <img src={UploadLogo} className="w-[25px]" alt="Upload Icon" />
                                 <p className="text-[11px]">Upload Here</p>
                              </>
                           )}
                           <input
                              id="image-upload-input"
                              type="file"
                              accept="image/*"
                              onChange={handelEventImage}
                              className="hidden"
                           />

                        </div>
                     </div>
                  </div>
                  <div className="row flex items-center border-b py-[20px]">
                     <div className="col max-w-[290px]">
                        <p className="text-black font-medium text-[15px]">Event Status</p>
                        <p className="text-[12px] text-light-grey mt-1">Determine Event Status: Select 'Active' if the event is in progress or 'Completed' if it finished.</p>
                     </div>
                     <div className="col w-full">
                        <select className="w-[320px] border rounded-[3px] ml-[90px] p-2 bg-lighter-grey outline-none text-[13px]" onChange={(e) => setStatus(e.target.value)}>
                           <option value="Active">Active</option>
                           <option value="Pending">Pending</option>
                           <option value="Completed">Completed</option>
                           <option value="Cancelled">Cancelled</option>
                        </select>
                     </div>
                  </div>
               </div>

               {/* SPEAKER */}
               <div className="border p-3 my-3 shadow-md font-medium text-[17px] text-black">
                  <h3>Speaker</h3>
               </div>
               <div className="row flex items-center border-b pb-[65px] pt-[25px] border shadow-md p-3">
                  <div className="col max-w-[290px]">
                     <p className="text-black font-medium text-[15px]">Choose Speaker</p>
                     <p className="text-[12px] text-light-grey mt-1">Provide clear and concise details about the task, including specific steps, deadlines, and any resources required.</p>
                  </div>
                  <div className="col w-full">
                     <select className="w-[320px] border rounded-[3px] ml-[90px] p-2 bg-lighter-grey outline-none text-[13px]" value={selectedSpeaker} onChange={handleSpeakerChange}>
                        <option value="" disabled>Select</option>
                        {speaker.map((speaker) => (
                           <option value={speaker.id} key={speaker.id}>{speaker.speakerName}</option>
                        ))}
                     </select>
                  </div>
               </div>

               {/* AGENDA */}
               <div className="border p-3 my-3 shadow-md font-medium text-[17px] text-black">
                  <h3>Agenda</h3>
               </div>
               <div className="border shadow-md p-3">
                  <div className="flex flex-col gap-2">
                     <div className="row flex items-center border-b py-[20px]">
                        <div className="col max-w-[290px]">
                           <p className="text-black font-medium text-[15px]">Event Date Start</p>
                           <p className="text-[12px] text-light-grey mt-1">Enter the starting date of the event in the provided field. Ensure the format is correct (e.g., MM/DD/YYYY).</p>
                        </div>
                        <div className="col w-full">
                           <input type="date" className="w-[320px] border rounded-[3px] outline-none bg-lighter-grey text-[13px] p-2 ml-[90px]" value={date} onChange={(e) => setDate(e.target.value)} />
                        </div>
                     </div>
                     <div className="row flex items-center border-b pb-[20px] pt-[20px]">
                        <div className="col max-w-[290px]">
                           <p className="text-black font-medium text-[15px]">Time</p>
                           <p className="text-[12px] text-light-grey mt-1">Enter the event time in the format HH:MM, and ensure it's accurate for participants.</p>
                        </div>
                        <div className="col w-full">
                           <input type="text" value={time} onChange={(e) => setTime(e.target.value)} className="w-[320px] border rounded-[3px] outline-none bg-lighter-grey text-[13px] p-2 ml-[90px]" />
                        </div>
                     </div>
                     <div className="row flex items-center border-b pb-[65px] pt-[25px]">
                        <div className="col max-w-[290px]">
                           <p className="text-black font-medium text-[15px]">Details</p>
                           <p className="text-[12px] text-light-grey mt-1">Provide specific details about the event, such as agenda, key activities, or any important information attendees need to know.</p>
                        </div>
                        <div className="col w-full">
                           <ReactQuill theme="snow" className="ml-[90px] h-[100px]" value={details} onChange={setAgendaDetail} />
                        </div>
                     </div>
                  </div>
               </div>

               {/* NOTES */}
               <div className="border p-3 my-3 shadow-md font-medium text-[17px] text-black">
                  <h3>Note's</h3>
               </div>
               <div className="row flex items-center border-b pb-[65px] pt-[25px] border shadow-md p-3">
                  <div className="col max-w-[290px]">
                     <p className="text-black font-medium text-[15px]">Note's for audience</p>
                     <p className="text-[12px] text-light-grey mt-1">Provide clear and concise details about the task, including specific steps, deadlines, and any resources required.</p>
                  </div>
                  <div className="col w-full">
                     <ReactQuill theme="snow" className="ml-[90px] h-[100px]" value={notes} onChange={setNotes} />
                  </div>
               </div>

               <div className="my-3 flex gap-2 items-center justify-end">
                  <a href="/dashboard" className="bg-yellow-primer px-5 py-[8px] rounded-[4px]">Cancel</a>
                  <button type="submit" className="bg-green-600 text-white px-7 py-2 rounded-[4px]">Save</button>
               </div>
            </form>
         </div>
      </>
   )
}

{/*  */ }

export default Form