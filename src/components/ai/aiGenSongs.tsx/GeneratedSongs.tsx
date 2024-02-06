import SongCard from '@/components/songcard/SongCard'
import { useGetAImusicQuery } from '@/redux/api/api'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'

export default function GeneratedSongs() {
const session = useSession()
  //getting saved generated songs
  const {data:songs} = useGetAImusicQuery()
 //findinf only loggedusers created Songs
 const mySongs = songs?.filter((s)=>s?.userMail === session?.data?.user?.email )
  return (
    <div className=' flex flex-col w-full gap-5'>
<div className=' flex justify-between gap-3 my-auto'>
<p className=' font-bold text-white text-4xl mt-4'>Your {' '}
 Generated {' '}
 <span
  className='text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-600'
  >Songs</span>
 </p>



</div>
    <div className=' grid animate-[slideup_0.3s] lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6'>
    
      {(mySongs || [...Array(10)])?.map((song,idx)=>(
<SongCard song={song} idx={idx}/>
      ))}
    </div>
    </div>
  )
}
