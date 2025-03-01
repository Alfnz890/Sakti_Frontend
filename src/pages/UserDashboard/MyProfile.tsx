import { useEffect, useState } from "react"
import Footer from "../../components/Footer"
import Navbar from "../../components/navbar"

const MyProfile = () => {

   const [user, setUser] = useState({})

   useEffect(() => {

      const storedUser = localStorage.getItem('user');
      console.log("Stored user:", storedUser);

      if (storedUser) {
         setUser(JSON.parse(storedUser))
      }

   }, [])

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
            <div className="col w-full border-t border-b py-2">
               <table className="w-full text-sm">
                  <tr className="bg-yellow-light">
                     <td className="w-[200px] p-[7px]">Username</td>
                     <td>: {user.first_name || user.name}</td>
                  </tr>
                  <tr>
                     <td className="p-[7px]">Email</td>
                     <td>: {user.email}</td>
                  </tr>
                  <tr className="bg-yellow-light">
                     <td className="p-[7px]">Phone</td>
                     <td>: {user.telp}</td>
                  </tr>
               </table>
            </div>
         </div>
         <Footer />
      </>
   )
}

export default MyProfile