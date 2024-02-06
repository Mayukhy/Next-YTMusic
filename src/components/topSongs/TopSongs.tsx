import { endLoading, startLoading } from '@/redux/slices/songsSlice'
import instance from '@/swazamapi/instance'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SongCard from '../songcard/SongCard'

export default function TopSongs() {
  const {isloading,searchTerm} = useSelector(state=>state.song)
  const [topSongs,setTopSongs] = useState([])
  const dispatch  = useDispatch()

  // getting top songs
  // useEffect(()=>{
  //   dispatch(startLoading())
  //   const getSongs = async()=>{
  //       await instance.get(`/search?term=${searchTerm}&limit=10`)
  //       .then(({data})=>{
  //       setTopSongs(data)
  //       dispatch(endLoading())
  //       })
  //   }
  //   getSongs()
  // },[searchTerm])

  return (
    <div className=' flex flex-col w-full gap-5'>
<div className=' flex justify-between gap-3 my-auto'>
<p className=' font-bold text-white text-4xl'>New Releases</p>

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
    
      {(topSongs?.tracks?.hits || [...Array(10)])?.map((song,idx)=>(
<SongCard song={song} idx={idx}/>
      ))}
    </div>
    </div>
  )
}
