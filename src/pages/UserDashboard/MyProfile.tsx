import { useEffect, useState } from "react"
import Footer from "../../components/Footer"
import Navbar from "../../components/navbar"
// import axios from "axios"

const MyProfile = () => {

   const [user, setUser] = useState([])

   useEffect(() => {

      const storedUser = localStorage.getItem('user');
      if (storedUser) {
         setUser(JSON.parse(storedUser))
      }

   }, [])

   const logout = async () => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
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
            <div className="col w-full border-t border-b py-1">
               <h3 className="font-medium text-[24px]">My Profile</h3>
               <div className="my-3">
                  <div className="flex items-center gap-[100px] bg-yellow-light">
                     <p className="py-3 px-3 text-sm">Name</p>
                     <p className="py-3 px-3 text-sm">{user.first_name}</p>
                  </div>
                  <div className="flex items-center gap-[102px]">
                     <p className="py-3 px-3 text-sm">Email</p>
                     <p className="py-3 px-3 text-sm">{user.email}</p>
                  </div>
                  <div className="flex items-center gap-[44px] bg-yellow-light">
                     <p className="py-3 px-3 text-sm">Mobile Phone</p>
                     <p className="py-3 px-3 text-sm">{user.telp}</p>
                  </div>
               </div>
            </div>
         </div>
         <Footer />
      </>
   )
}

export default MyProfile