import { useGetAImusicQuery } from '@/redux/api/api'
import { setActiveSong, setShowDetails } from '@/redux/slices/songsSlice'
import { Button } from '@radix-ui/themes'
import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export default function SongCard({song}) {

  const {music,showDetails} = useSelector(state=>state.song)
  const aisongs = useGetAImusicQuery()
  const {data:aigensongs} = useGetAImusicQuery()

  //finding if music is already saved or not
  const alreadySaved = aigensongs?.find((s)=>s?.songUrl === song?.songUrl)

  //adding aisong to database
  const postAIsong=()=>{
      const addSong=async()=>{
        await axios.post('/api/aiMusic',song)
        .then(({data})=>{
            toast.success('🤖 Music is saved successfully !')
            aisongs.refetch()
        })
        .catch((error)=>{
            console.log(error)
            toast.error(error)})
      }
      addSong()   
    


  }
    const [isHover,setIsHover] = useState(false)
    const dispatch = useDispatch()
  return (
    <div className=' relative'>
{ !song?.key && !alreadySaved &&  <Button
      className=' bottom-0 right-0 mt-[-10px] absolute w-[100px] z-[100] animate-[slideright_0.5s]'
      style={{padding:'0px 6px',borderRadius:'40px',marginTop:'5px'}}
       variant='surface'
       color='gray'
       onClick={postAIsong}
     >
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.50005 1.04999C7.74858 1.04999 7.95005 1.25146 7.95005 1.49999V8.41359L10.1819 6.18179C10.3576 6.00605 10.6425 6.00605 10.8182 6.18179C10.994 6.35753 10.994 6.64245 10.8182 6.81819L7.81825 9.81819C7.64251 9.99392 7.35759 9.99392 7.18185 9.81819L4.18185 6.81819C4.00611 6.64245 4.00611 6.35753 4.18185 6.18179C4.35759 6.00605 4.64251 6.00605 4.81825 6.18179L7.05005 8.41359V1.49999C7.05005 1.25146 7.25152 1.04999 7.50005 1.04999ZM2.5 10C2.77614 10 3 10.2239 3 10.5V12C3 12.5539 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2239 12.2239 10 12.5 10C12.7761 10 13 10.2239 13 10.5V12C13 13.1041 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2239 2.22386 10 2.5 10Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
       Save
     </Button>}
     
    <div
    onClick={()=>{
      dispatch(setShowDetails(true))
      dispatch(setActiveSong(
    {
     title:`${song?.title || song?.heading?.title || song?.attributes?.name}`,
     imgUrl:`${song?.images?.coverart || song?.images?.default || song?.imgUrl}`,
     artist:`${song?.subtitle || song?.heading?.subtitle || song?.attributes?.composerName}`,
     id:`${song?.key}`,
     songUrl:`${song?.hub?.actions[1]?.uri || song?.stores?.apple?.previewurl || song?.ringtone || song?.attributes?.preview || song?.songUrl}`

    }
    

    ))}}
    onMouseEnter={()=>setIsHover(true)}
    onMouseLeave={()=>setIsHover(false)}
    className=' hover:opacity-70 transition-all cursor-pointer duration-200 relative flex flex-col w-[190px] h-[250px]'>
     
     {/* play icon */}
{ isHover &&  <div className=' animate-[slideup_0.5s] p-2 bg-transparent backdrop-blur-lg rounded-full absolute bottom-0 right-0 mb-20 mr-5'>
     <svg
     className=' text-yellow-50'
     width="35" height="35" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.24182 2.32181C3.3919 2.23132 3.5784 2.22601 3.73338 2.30781L12.7334 7.05781C12.8974 7.14436 13 7.31457 13 7.5C13 7.68543 12.8974 7.85564 12.7334 7.94219L3.73338 12.6922C3.5784 12.774 3.3919 12.7687 3.24182 12.6782C3.09175 12.5877 3 12.4252 3 12.25V2.75C3 2.57476 3.09175 2.4123 3.24182 2.32181ZM4 3.57925V11.4207L11.4288 7.5L4 3.57925Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
     </div>}
     <img src={song?.images?.coverart || song?.images?.default || song?.attributes?.artwork?.url || song?.imgUrl}  alt="img" className=' object-cover w-full h-[250px] border border-zinc-400' />
    <p className=' text-xl font-semibold mt-2 w-[240px] truncate text-slate-100'>
        { song?.title || song?.heading?.title || song?.attributes?.name || 'Song title'}
        </p>
    <p className=' text-lg font-medium w-[240px] truncate text-zinc-300'>{song?.subtitle || song?.heading?.subtitle || song?.attributes?.composerName || 'Replicate'}</p>

    </div>
    </div>
  )
}
