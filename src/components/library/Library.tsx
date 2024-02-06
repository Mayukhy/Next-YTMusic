import React from 'react'
import Librarycard from './Librarycard'
import { useGetplaylistsQuery } from '@/redux/api/api'
import { useSession } from 'next-auth/react'

export default function Library() {
  const {data:playlists} = useGetplaylistsQuery()
  const session = useSession()

  //my playlists
  const myplaylists = playlists?.filter((data)=>data?.userMail === session?.data?.user?.email)

  return (
    <div className=' flex flex-col mt-10 w-full gap-5'>

    <div className=' flex justify-between gap-3 my-auto'>
    <p className=' font-bold text-white text-4xl'>Your Library</p>
    
    <div className=' flex gap-2 my-auto'>
    
        {/* left arrow */}
        <div className=' border  hover:bg-zinc-800 transition-all duration-200 border-zinc-500 rounded-3xl p-2'>
    
        <svg className=' text-yellow-50 cursor-pointer' width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 4L9 11L4.5 7.5L9 4Z" fill="currentColor"></path></svg>
        </div>
         
         {/* right arrow */}
        <div className=' border hover:bg-zinc-800 transition-all duration-200 border-zinc-500 rounded-3xl p-2'>
    
        <svg className=' text-yellow-50 cursor-pointer' width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 11L6 4L10.5 7.5L6 11Z" fill="currentColor"></path></svg>
    </div>
    </div>
    </div>
                <div className=' flex gap-5 overflow-x-auto  scroll-smooth'>
                
                  {(myplaylists || [...Array(10)])?.map((list,idx)=>(
            <Librarycard list={list} idx={idx}/>
                  ))}
                </div>
                </div>
  )
}
