import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
 import { useSelector } from 'react-redux'
import PendingAdminDiet from './PendingAdminDiet'


 const Home = () => {
  const user  = useSelector((state) => state.auth.user)
  return (
    < > 
    <div className='bg-gray-300 min-h-screen'>
       <Navbar />
       <main className='pt-20 flex flex-col '><Hero/></main>
       
       </div>
      
    </>
  )
}

export default Home

