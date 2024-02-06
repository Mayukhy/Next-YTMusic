import { useGetplaylistSongsQuery } from '@/redux/api/api'
import { setActiveSong, setActiveSongId, setActiveSongsArray, setIsplaying, setPlaylistSongData, setShowDetails, setSongMapId, setnextSong } from '@/redux/slices/songsSlice'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

export default function PlaylistSongCard({song,id,idx,playlistId,addToplaylist,currentplaylistSongs}) {
    const [isShowen,setIsShowen] = useState(false)
    const playlistSongs = useGetplaylistSongsQuery()
    const {playlistSongData, activeSong,activeSongId} = useDispatch(state=>state.song)
    const dispatch = useDispatch()
    const session = useSession()
    var Url = song?.attributes?.artwork?.url;
    var NewUrl = Url?.replace('{w}','1000')
    var FinalUrl = NewUrl?.replace('{h}','1000')
    console.log(' active song is ',activeSong)

    const delfromPlaylist = ()=>{
        const del=async()=>{
    await axios.delete(`/api/delPlaylistSong/${song?._id}`)
    .then(({data})=>{
        toast.success('Song is successfully removed from playlist')
        playlistSongs.refetch()
    })
        }
        del()
    }

  return (
    <div
    onClick={()=>{
      dispatch(setIsplaying(true))
      dispatch(setShowDetails(true))
      dispatch(setActiveSongsArray(currentplaylistSongs))
      if (playlistId) {
        dispatch(setPlaylistSongData(
          {
           title:`${song?.title || song?.heading?.title || song?.attributes?.name}`,
           imgUrl:`${song?.images?.coverart || song?.images?.default || FinalUrl}`,
           artist:`${song?.subtitle || song?.heading?.subtitle || song?.attributes?.composerName}`,
           id:`${song?.key || song?.id}`,
           playlistId:`${playlistId}`,
           userMail:`${session?.data?.user?.email}`,
           songUrl:`${song?.hub?.actions[1]?.uri || song?.stores?.apple?.previewurl || song?.ringtone || song?.attributes?.preview || song?.attributes?.previews[0]?.url || song?.songUrl}`

          }
          ))     
      }
      dispatch(setActiveSongId(song?.key || song?.id))
      dispatch(setSongMapId(idx))
      dispatch(setActiveSong(
        {
         title:`${song?.title || song?.heading?.title || song?.attributes?.name}`,
         imgUrl:`${song?.images?.coverart || song?.images?.default || FinalUrl || song?.imgUrl}`,
         artist:`${song?.subtitle || song?.heading?.subtitle || song?.attributes?.composerName || song?.artist}`,
         id:`${song?.key || song?.id}`,
         songUrl:`${song?.hub?.actions[1]?.uri || song?.stores?.apple?.previewurl || song?.ringtone || song?.attributes?.preview || song?.attributes?.previews[0]?.url || song?.songUrl}`
    
        }
        ))
        }
      
      }
    onMouseEnter={()=>{
      setIsShowen(true)}}
    onMouseLeave={()=>setIsShowen(false)}
    className=' grid grid-cols-3 gap-3  cursor-pointer relative duration-200 transition-all my-auto border-b pb-3 border-b-zinc-500 '>
    <div className=' flex gap-2 my-auto'>
    <div className=' relative'>
   { isShowen &&  <svg
    style={{transform:'translate(-50%,-50%)'}}
    className=' duration-200 transition-all absolute top-[50%] left-[50%] text-white'
    width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.24182 2.32181C3.3919 2.23132 3.5784 2.22601 3.73338 2.30781L12.7334 7.05781C12.8974 7.14436 13 7.31457 13 7.5C13 7.68543 12.8974 7.85564 12.7334 7.94219L3.73338 12.6922C3.5784 12.774 3.3919 12.7687 3.24182 12.6782C3.09175 12.5877 3 12.4252 3 12.25V2.75C3 2.57476 3.09175 2.4123 3.24182 2.32181ZM4 3.57925V11.4207L11.4288 7.5L4 3.57925Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>}

    {/* for active song wave will be shown */}
    {/* { ((song?.key === activeSong?.id) || (song?.id === activeSong?.id)) ?
    <div 

    className='  w-full h-full left-0 top-0 backdrop-blur-md duration-200 transition-all absolute'>
    <img 
     style={{transform:'translate(-50%,-50%)'}}
    className='w-[100px] h-[100px] top-[50%] absolute left-[50%]'
    src='/wave.gif'
    />
    </div>:
    <>
    </>
} */}


    <img className={isShowen?
      'duration-200 transition-all w-[60px] h-[50px]  opacity-60':'duration-200 transition-all opacity-100 w-[60px] h-[50px]'} src={song?.images?.coverart || song?.images?.default || song?.imgUrl ||  FinalUrl} alt="" />
    </div>
    <p className='xl:w-[350px] md:w-[250px] w-[100px] truncate text-zinc-100 my-auto'>{song?.title || song?.heading?.title || song?.attributes?.name || song?.title || 'Songname'}</p>
    </div>

    <p className=' text-zinc-300 my-auto text-start xl:w-[350px] md:w-[200px] w-[100px] truncate'>{song?.subtitle || song?.heading?.subtitle || song?.attributes?.composerName || song?.artist || 'Artist name'}</p>
    <p className=' text-zinc-400 my-auto text-start'>albam</p>

{ isShowen &&

  <svg
      onClick={(e)=>{
        e.stopPropagation()
  
        if (playlistId) {
          
          dispatch(setPlaylistSongData({...playlistSongData,songUrl:`${song?.hub?.actions[1]?.uri || song?.stores?.apple?.previewurl || song?.ringtone || song?.attributes?.preview || song?.attributes?.previews[0]?.url || song?.songUrl}`}))
          delfromPlaylist()
        }
      }}
  style={{transform:'translateY(-50%)'}}
  className=' duration-200 transition-all absolute top-[50%] right-0 text-zinc-300'
  width="25" height="25" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM4.50003 7C4.22389 7 4.00003 7.22386 4.00003 7.5C4.00003 7.77614 4.22389 8 4.50003 8H10.5C10.7762 8 11 7.77614 11 7.5C11 7.22386 10.7762 7 10.5 7H4.50003Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
}


</div>
  )
}
