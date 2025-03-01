import { useEffect, useState } from 'react'
import Logo from '../assets/icons/logo.png'

interface NavbarProps {
   username: string;
}

const Navbar = () => {

   const [user, setUser] = useState<NavbarProps>()

   useEffect(() => {

      const storedUser = localStorage.getItem('user');
      if (storedUser) {
         setUser(JSON.parse(storedUser))
      }

   }, [])

   return (
      <>
         <div className="bg-yellow-primer text-white">
            <div className="container mx-auto flex justify-between py-[20px]">
               <div>
                  <a href="/"><img src={Logo} className='w-[60px]' /></a>
               </div>
               <div className="flex items-center gap-[14px] text-[15px] text-black font-medium">
                  <a href="/" className="hover:underline">Home</a>
                  <a href="/classlist" className="hover:underline">Events</a>
                  <a href="/report" className="hover:underline">Publish</a>
                  <a href="/about" className="hover:underline">About</a>
                  <a href="/partners" className="hover:underline">Partner</a>
                  {user ? (
                     <a href={`/user/dashboard/${user.id}`} className="hover:underline">{user.first_name || user.name}</a>
                  ) : (
                     <a href="/login" className="hover:underline">Login</a>
                  )}
               </div>
            </div>
         </div>
      </>
   )
}

export default Navbar