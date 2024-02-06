import { setActiveSong, setActiveSongId, setIsplaying } from '@/redux/slices/songsSlice'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function Upnext() {
    const {activeSongArr,activeSong} = useSelector(state=>state.song)
    const dispatch = useDispatch()
    return (
    <div
    // style={{
    //     background:'linear-gradient(185deg, rgba(109,112,117,0.8295693277310925) 0%, rgba(0,2,5,0.9136029411764706) 99%)'
    // }}
className=' flex-col h-[calc(100vh-50px)] overflow-y-auto pb-4 pt-2'>
{activeSongArr?.map((song)=>(
  <div
  style={{
    zIndex:999
  }}
  onClick={()=>{
    dispatch(setIsplaying(true))
    dispatch(setActiveSongId(song?.key || song?.id))
    dispatch(setActiveSong(
      {
       title:`${song?.title || song?.heading?.title || song?.attributes?.name}`,
       imgUrl:`${song?.images?.coverart || song?.images?.default || song?.attributes?.artwork?.url?.replace('{w}','1000').replace('{h}','1000') || song?.imgUrl}`,
       artist:`${song?.subtitle || song?.heading?.subtitle || song?.attributes?.composerName || song?.artist}`,
       id:`${song?.key || song?.id}`,
       songUrl:`${song?.hub?.actions[1]?.uri || song?.stores?.apple?.previewurl || song?.ringtone || song?.attributes?.preview || song?.attributes?.previews[0]?.url || song?.songUrl}`
  
      }
      ))
      }
    }
  className={ (activeSong?.id === song.id || activeSong?.id === song.key)?' w-full flex gap-3   transition-all duration-150 cursor-pointer bg-zinc-800 px-5 py-4':' w-full flex gap-3   transition-all duration-150 cursor-pointer hover:bg-zinc-800 px-5 py-4'}>
  <img

      src={song?.images?.coverart || song?.images?.default || song?.attributes?.artwork?.url?.replace('{w}','1000').replace('{h}','1000') || song?.imgUrl}
      className=' object-cover w-[45px] h-[45px] border border-zinc-600' alt="" />
  <div className=' flex flex-col my-auto'>
      <p className=' text-zinc-100 w-[300px] truncate font-semibold'>{song?.title || song?.heading?.title || song?.attributes?.name|| 'song name'}</p>


      <p className=' text-zinc-200 text-sm w-[80px] truncate'>{song?.subtitle || song?.heading?.subtitle || song?.attributes?.composerName || 'artist'}</p>


  </div>
</div>

))}
</div>
  )
}
