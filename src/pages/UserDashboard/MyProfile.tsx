import { useEffect, useState } from "react"
import Footer from "../../components/Footer"
import Navbar from "../../components/navbar"
import axios from "axios"
import Swal from "sweetalert2"

const API_BASE_URL = import.meta.env.VITE_URL_API

const MyProfile = () => {

   const [user, setUser] = useState({})
   const [email, setEmail] = useState("")
   const [phone, setPhone] = useState("")
   const [id, setId] = useState(0)
   const [isOpen, setIsOpen] = useState(false)

   useEffect(() => {

      const storedUser = localStorage.getItem('user');
      console.log("Stored user:", storedUser);

      if (storedUser) {
         const parsedUser = JSON.parse(storedUser)
         setUser(parsedUser);
         setEmail(parsedUser.email || "");
         setPhone(parsedUser.phone || "");
         setId(parsedUser.id || 0);
      }

   }, [])

   const onSubmit = async (e) => {
      e.preventDefault();
      try {
         await axios.patch(`${API_BASE_URL}/api/v1/users/${id}`, { email, phone });

         const updateUser = { ...user, email, phone }
         setUser(updateUser)
         localStorage.setItem("user", JSON.stringify(updateUser));

         await Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Update Successfully"
         })
         window.location.reload();
      } catch (error) {
         console.log(error);
         await Swal.fire({
            icon: "error",
            title: "Failed to update",
            text: "Internal Server Error"
         })
      }
   }

   const logout = async () => {
      localStorage.removeItem('user');
      window.location.href = ('/');
   }

   return (
      <>
         <Navbar />
         <div className="bg-yellow-light py-[25px]">
            <div className="container mx-auto text-[27px] font-medium">
               <h2>Dashboard</h2>
            </div>
         </div>
         <div className="container mx-auto my-9 flex gap-3">
            <div className="col w-[240px] border-t border-b py-5">
               <div className="flex flex-col gap-2">
                  <a href={`/user/dashboard/${user.id}`} className="p-2 rounded-[5px] text-sm">My Events</a>
                  <a href={`/user/myprofile/${user.id}`} className="p-2 bg-yellow-primer rounded-[5px] text-sm">My Profile</a>
                  <button onClick={logout} className="p-2 rounded-[5px] text-start text-sm">Log Out</button>
               </div>
            </div>
            <div className="col w-full border-t border-b pt-3">
               <table className="w-full text-sm">
                  <tr className="bg-yellow-light">
                     <td className="py-[9px] pl-[10px] w-[200px]">Username</td>
                     <td className="py-[9px]">: {user.first_name || user.name}</td>
                  </tr>
                  <tr className="">
                     <td className="py-[9px] pl-[10px]">Email</td>
                     <td className="py-[9px]">: {user.email}</td>
                  </tr>
                  <tr className="bg-yellow-light">
                     <td className="py-[9px] pl-[10px]">Phone</td>
                     <td className="py-[9px]">: {user.phone}</td>
                  </tr>
               </table>
               <div className="flex justify-end py-3">
                  <button className="bg-yellow-primer text-sm px-[15px] py-[4px] rounded-[4px]" onClick={() => setIsOpen(true)}>Edit</button>
               </div>
               {isOpen && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                     <div className="bg-white p-5 rounded-md w-96">
                        <form onSubmit={onSubmit}>
                           <h2 className="text-sm mb-3">Edit Profile</h2>

                           <input type="text" className="border 2 w-full mb-2 text-sm p-2" value={email} onChange={(e) => setEmail(e.target.value)} />
                           <input type="text" className="border 2 w-full mb-5 text-sm p-2" value={phone} onChange={(e) => setPhone(e.target.value)} />

                           <div className="flex justify-end space-x-2">
                              <button
                                 className="bg-gray-400 px-4 py-2 rounded"
                                 onClick={() => setIsOpen(false)}
                              >
                                 Cancel
                              </button>
                              <button className="bg-yellow-primer px-4 py-2 rounded">Save</button>
                           </div>
                        </form>
                     </div>
                  </div>
               )}
            </div>
         </div>
         <Footer />
      </>
   )
}

export default MyProfile