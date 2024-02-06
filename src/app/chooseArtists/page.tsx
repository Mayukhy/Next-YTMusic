'use client'
import Artists from '@/components/chooseArtists/Artists'
import { setPlaylistName } from '@/redux/slices/songsSlice'
import { BookmarkIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {toast} from 'react-toastify'
export default function page() {
    const router = useRouter()
    const {playlistName} = useSelector(state=>state.song)
    const [allUsers,setAllUsers] = useState([])
    const session = useSession()
    const dispatch = useDispatch()

    useEffect(()=>{
      dispatch(setPlaylistName('fev Artists'))
    },[playlistName])
     //getting those user who is logged in
     const loggedUser = allUsers?.find((user,id)=>user?.email === session?.data?.user?.email)


    const {isloading,artists} = useSelector(state=>state.song)
      //for those artists who are checked by the user
      const updatedArtistCheckedArr = artists?.filter((a,id)=>a?.checked)
      useEffect(()=>{
      const getusers=async()=>{
        await axios.get('/api/users')
        .then(({data})=>setAllUsers(data))
      }
      getusers()
      })


console.log('Updated artists',artists)
console.log('Updated artists which user can access',{updatedArtistCheckedArr})

  return (
    <div className=' bg-black min-h-screen flex flex-col '>

      <div className=' flex flex-col justify-center container mx-auto py-20'>
        <div className=' flex flex-col justify-center gap-2 mb-10'>
        <p  className=' font-bold text-white text-4xl text-center'>Pick 5 artists you like</p>
      <p  className=' font-semibold text-zinc-400 text-lg text-center'>Pick 5 artists you like</p>

        </div>
      
      <Artists artists={artists}/>
      </div>
<div className=' flex justify-center items-center'>
<Button
      className=' max-w-[500px] hover:scale-105 transition-all duration-200'
      onClick={()=>{
        if (loggedUser?.fevArtists?.length >=5) {
          toast.success("Data is saved successfully",{
          
              position:"top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            
          })
          router.push('/')
        }
        else{
          toast.error("Choose atleast 5 artists",{
          
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          
        })
        }
        }} variant='soft' color='crimson' size='4'>
    <BookmarkIcon width="26" height="26" /> Save Changes
  </Button>
</div>


    </div>
  )
}
