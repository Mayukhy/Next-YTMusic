import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import { useDispatch } from 'react-redux';
import { setActiveSong } from '@/redux/slices/songsSlice';
export default function Result({song}) {
    const dispatch = useDispatch()
  return (
    <div
    onClick={()=>dispatch(setActiveSong(
        {
         title:`${song?.title || song?.heading?.title || song?.attributes?.name}`,
         imgUrl:`${song?.images?.coverart || song?.images?.default || song?.imgUrl}`,
         artist:`${song?.subtitle || song?.heading?.subtitle || song?.attributes?.composerName}`,
         id:`${song?.key}`,
         songUrl:`${song?.hub?.actions[1]?.uri || song?.stores?.apple?.previewurl || song?.ringtone || song?.attributes?.preview || song?.songUrl}`
    
        }))}
    className=' h-[60px] flex gap-2 my-auto p-2 transition-all duration-150 cursor-pointer hover:bg-zinc-900'>
{  song?   <img
     
     src={song?.images?.coverart || song?.images?.default || song?.attributes?.artwork?.url || song?.imgUrl}
       className=' object-cover w-[40px] h-full border border-zinc-600' alt="" /> : <Skeleton variant="rectangular" width={50} height={50} />}
     <div className=' flex flex-col my-auto'>
        {song?<p className=' text-zinc-400 font-semibold w-[200px] truncate'>{ song?.title || song?.heading?.title || song?.attributes?.name}</p>:
        <Skeleton variant="rectangular" width={210} height={60} />
        }
       {song? <p className=' w-[350px] truncate text-zinc-500 text-sm'>{song?.subtitle || song?.heading?.subtitle || song?.attributes?.composerName}</p>:
        <Skeleton variant="rectangular" width={210} height={60} />
        }
     </div>
    </div>
  )
}
