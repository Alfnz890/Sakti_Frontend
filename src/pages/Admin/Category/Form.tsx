import axios from "axios";
import { useState } from "react"
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_URL_API

const Form = () => {
   const [categoryName, setCategoryName] = useState('');
   const navigate = useNavigate();

   const onSubmit = async (e) => {
      e.preventDefault();
      try {
         await axios.post(`${API_BASE_URL}/api/v1/categories`, { categoryName })
         await Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Category has been added!"
         })
         navigate('/dashboard/category')
      } catch (error) {
         console.log("error:", error);
         Swal.fire({
            icon: "error",
            title: "Failed to Add Category!",
            text: "Internal server error!"
         })
      }
   }

   return (
      <>
         <div className="container mx-auto">
            <form className="mt-5" onSubmit={onSubmit}>
               <div className="row flex items-center border p-4">
                  <div className="col max-w-[290px]">
                     <p className="text-black font-medium text-[15px]">Category Name</p>
                     <p className="text-[12px] text-light-grey mt-1">Enter the name of the category you want to add</p>
                  </div>
                  <div className="col w-full">
                     <input type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} className='w-[320px] border rounded-[3px] outline-none bg-lighter-grey text-[13px] p-2 ml-[90px]' />
                  </div>
               </div>
               <div className="mt-4 flex gap-2 items-center justify-end">
                  <a href="/dashboard/category" className="bg-yellow-primer px-5 py-[8px] rounded-[4px]">Cancel</a>
                  <button type="submit" className="bg-green-600 text-white px-7 py-2 rounded-[4px]">Save</button>
               </div>
            </form>
         </div>
      </>
   )
}

export default Form