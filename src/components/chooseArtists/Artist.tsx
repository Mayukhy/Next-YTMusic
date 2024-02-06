
import React, { useEffect, useState } from 'react'
import * as Avatar from '@radix-ui/react-avatar';
import { useDispatch, useSelector } from 'react-redux';
import { setUpdatedArtistArr } from '@/redux/slices/songsSlice';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGetUsersQuery } from '@/redux/api/api';

export default function Artist({artist,id}) {
  const {data:users} = useGetUsersQuery()
  const Users = useGetUsersQuery()
  const {isloading,artists} = useSelector(state=>state.song)
  const dispatch=useDispatch()
  const session = useSession()

        //getting those user who is logged in
        const loggedUser = users?.find((user,id)=>user?.email === session?.data?.user?.email)


        //checking that artist is already present or not inside of users fev list
        const alreadyAdded = loggedUser?.fevArtists?.find((a)=>a === artist?._id) 
        
        // Adding artists to fevorites
        const addToFevArtists=(artistId)=>{
          const addArtists=async()=>{
            await axios.put(`/api/users/${loggedUser?._id}`,{artistId})
            .then(()=>
{           Users.refetch()            
            toast.success('Artist is added to fevorite !',
            {
              position:"top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              }
            )}
            
            )
            .catch(()=>toast.error('something went wrong'))
          }
          addArtists()
        }


        //removing user from fevorites
        const removeFevArtists=(artistId)=>{
          const remArtists=async()=>{
            await axios.put(`/api/users/update/${loggedUser?._id}`,{artistId})
            .then(()=>
           {
            Users.refetch()
            toast.success('Artist is removed fevorite',
            {
              position:"top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              }
            )}
            )
            .catch(()=>toast.error('something went wrong'))
          }
          remArtists()
        }


    const [isShowen,setIsShowen] = useState(false)
    const changeState=(a,idx)=>{
    dispatch(setUpdatedArtistArr(artist))
  
    }


  return (
    <div
    
    onClick={()=>{
        addToFevArtists(artist?._id)
        changeState(artist,id)
        setIsShowen(!isShowen)}}
    className={alreadyAdded ?
    ' flex flex-col p-5 cursor-pointer 2xl:hover:bg-zinc-900 relative justify-center opacity-60 items-center transition-all duration-200':
    ' flex flex-col opacity-100 p-5 cursor-pointer 2xl:hover:bg-zinc-900 rounded-lg relative justify-center hover:p-5  transition-all duration-200 items-center'}>
          <Avatar.Root className="bg-blackA1 hover:scale-105 relative transition-all duration-200 hover:opacity-60 inline-flex h-[250px] w-[250px] select-none items-center justify-center overflow-hidden rounded-full align-middle">

          { alreadyAdded &&
           <div
           onClick={(e)=>{
            e.stopPropagation() 
              removeFevArtists(artist?._id)
            }}
           style={{background:'linear-gradient(270deg, rgba(1,21,33,0.5158438375350141) 0%, rgba(9,6,37,0.48783263305322133) 100%)'}}
           className='top-0 left-0 w-full h-full backdrop-blur-sm rounded-full absolute z-[50]'>
        
           </div>}
{alreadyAdded && 
           <div
           onClick={(e)=>{
            e.stopPropagation() 
            setIsShowen(false)
              removeFevArtists(artist?._id)
          }}
           style={{transform:'translate(-50%,-50%)'}}
           className=' left-[50%] top-[50%] absolute z-[60]'>
           <svg className=' text-white' width="55" height="55" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
           </div>}
      <Avatar.Image
        className="h-full w-full rounded-[inherit] object-cover"
        src={artist?.image}
        alt="Colm Tuite"
      />
      <Avatar.Fallback
        className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
        delayMs={600}
      >
        {artist?.name}
      </Avatar.Fallback>
    </Avatar.Root>
    <p className=' text-base font-medium mt-2 text-zinc-300'>{artist?.name}</p>
    </div>
  )
}
