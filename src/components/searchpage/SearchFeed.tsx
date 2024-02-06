import React, { useEffect, useState } from 'react'
import Topresult from './comps/Topresult'
import SongCard from '../artistSongs/SongCard'
import { Button } from '@radix-ui/themes'
import FeedArtistCard from './comps/FeedArtistCard'
import { useDispatch, useSelector } from 'react-redux'
import { endLoading, startLoading } from '@/redux/slices/songsSlice'
import instance from '@/swazamapi/instance'

export default function SearchFeed() {
const dispatch = useDispatch()
const {keysearchTerm} = useSelector(state=>state.song)
const [songs,setSongs] = useState([])
const [tabValue,setTabValue] = useState('MTmusic')
const tabs = [
    "MTmusic",
    "Liked",
    "Library"
]

  // getting searched songs
  useEffect(()=>{
    dispatch(startLoading())
    const getSongs = async()=>{
        await instance.get(`/search?term=${keysearchTerm}&limit=10`)
        .then(({data})=>{
        setSongs(data)
        dispatch(endLoading())
        })
    }
    getSongs()
  },[keysearchTerm])
  return (
    <div className=' w-full mt-5 min-h-[400px]'>
      {/* tabs */}
      <div className=' flex gap-5 my-auto border-b  border-zinc-600'>
    {tabs?.map((tab)=>(
        <p
        onClick={()=>setTabValue(tab)}
        className={ tabValue ===tab?' pb-1 text-lg border-b text-zinc-300 cursor-pointer border-b-white transition-all duration-200':' pb-1 transition-all duration-200 cursor-pointer text-lg border-b text-zinc-300 border-b-transparent'}>
            {tab}
        </p>
    ))}
      </div>
<br />
      {/* searchfeeds */}

      {tabValue ==='MTmusic'&&
      <div>
        <p className=' text-xl font-bold text-white'>Top Results</p>
      
    <br />

    {/* top sesults for the search */}
    <Topresult songs={songs}/>
    <br />

    {/* songs releted to the search */}
    <div className=' flex flex-col gap-2 mb-10 px-2'>
        <p className=' font-semibold text-xl text-white z-[20] mb-3'>Songs</p>

{(songs?.tracks?.hits || [...Array(5)])?.map((song,id)=>(
    <SongCard suggestions={songs} song={song} id={id}/>
))}
<button
className=' max-w-[100px] text-sm my-2 outline-none border text-stone-200 hover:bg-zinc-700 bg-transparent border-zinc-500 px-4 py-2 rounded-3xl'
>
  See More
</button>

        </div>  
    {/* Artists releted to the search */}
        <div className=' flex flex-col gap-2 mb-10 px-2'>
        <p className=' font-semibold text-xl text-white z-[20] mb-3'>Artists</p>

{(songs?.artist?.hits || [...Array(4)])?.map((art,id)=>(
    <FeedArtistCard songs={songs} art={art} id={id}/>
))}
<button
className=' max-w-[100px] text-sm my-2 outline-none border text-stone-200 hover:bg-zinc-700 bg-transparent border-zinc-500 px-4 py-2 rounded-3xl'
>
  See More
</button>

        </div>  
      </div>
      }
    </div>
  )
}
