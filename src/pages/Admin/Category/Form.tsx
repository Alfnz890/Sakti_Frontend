import { useState } from "react"

const Form = () => {
   const [name, setName] = useState('');
   return (
      <>
         <div className="container mx-auto">
            <form className="mt-5">
               <div className="row flex items-center border p-4">
                  <div className="col max-w-[290px]">
                     <p className="text-black font-medium text-[15px]">Category Name</p>
                     <p className="text-[12px] text-light-grey mt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, laboriosam! Lorem ipsum dolor sit amet.</p>
                  </div>
                  <div className="col w-full">
                     <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='w-[320px] border rounded-[3px] outline-none bg-lighter-grey text-[13px] p-2 ml-[90px]' />
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