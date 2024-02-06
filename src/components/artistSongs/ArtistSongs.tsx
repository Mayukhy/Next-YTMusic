import React, { useEffect, useState } from 'react'
import SongCard from './SongCard'
import instance from '@/swazamapi/instance'

export default function ArtistSongs({artistData}) {
  const [songs,setSongs] = useState([])
  //get artist's songs
  useEffect(()=>{
  const getSongs=async()=>{
  await instance.get(`/artist/get-top-songs?id=${artistData?.adam_id}&offset=0`)
  .then(({data})=>{
    setSongs(data?.data)
  })  
}
getSongs()
  },[artistData])
  return (
    <div className=' container xl:px-16 px-5 mt-16 flex flex-col mx-auto'>
      <div className=' flex flex-col w-full gap-2 mb-10 px-2'>
        <p className=' font-semibold text-xl text-white z-[20] mb-3'>Songs</p>

{songs?.map((song,id)=>(
    <SongCard song={song} id={id}/>
))}

        </div>  
      
    </div>
  )
}
