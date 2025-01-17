import { useGetLikedSongsQuery } from '@/redux/api/api'
import { setActiveSongsArray, setIsplaying, setSongMapId, setnextSong, setnprevSong } from '@/redux/slices/songsSlice'
import { useSession } from 'next-auth/react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconButton from '@mui/material/IconButton';
export default function LeftControls() {
  const {activeSong,activeSongArr,songMapId,isPlaying} = useSelector(state=>state.song)
  const {data:likedSongs} = useGetLikedSongsQuery()
  const audioRef = useRef()
  const session = useSession()
  const dispatch = useDispatch()
  var id = 0
  if (songMapId === 0) {
    dispatch(setSongMapId(0))
  }
  // const [isPlaying,setIsplaying] = useState(true)
  const play = ()=>{
   dispatch(setIsplaying(true))
   audioRef.current.play()
  }

  const pause = ()=>{
    dispatch(setIsplaying(false))
    audioRef.current.pause()
   }


    //my liked songs
    const mysongs = likedSongs?.filter((song)=>song?.userMail === session?.data?.user?.email)
  
    // useEffect(()=>{
    // dispatch(setActiveSongsArray(mysongs))
    // },[session])

  const nextSong=()=>{
      dispatch(setnextSong(songMapId)) 
      console.log('id is =====>',id)
      dispatch(setIsplaying(true))
  }
  const prevSong=()=>{
    dispatch(setnprevSong(songMapId)) 
    console.log('id is =====>',id)
    dispatch(setIsplaying(true))
}
  console.log('liked songs array is =========>',activeSongArr)
  

  return (
    <div className=' flex mt-2 gap-4 ml-3'>
      <audio
      ref={audioRef} className=' sr-only'
      onEnded={nextSong}
      // loop
      autoPlay
       src={activeSong?.songUrl} controls></audio>

<IconButton
className=' scale-150'
onClick={prevSong}
>
<svg
className=' scale-150 text-white'
width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.94976 2.74989C1.94976 2.44613 2.196 2.19989 2.49976 2.19989C2.80351 2.19989 3.04976 2.44613 3.04976 2.74989V7.2825C3.0954 7.18802 3.17046 7.10851 3.26662 7.05776L12.2666 2.30776C12.4216 2.22596 12.6081 2.23127 12.7582 2.32176C12.9083 2.41225 13 2.57471 13 2.74995V12.25C13 12.4252 12.9083 12.5877 12.7582 12.6781C12.6081 12.7686 12.4216 12.7739 12.2666 12.6921L3.26662 7.94214C3.17046 7.89139 3.0954 7.81188 3.04976 7.7174V12.2499C3.04976 12.5536 2.80351 12.7999 2.49976 12.7999C2.196 12.7999 1.94976 12.5536 1.94976 12.2499V2.74989ZM4.57122 7.49995L12 11.4207V3.5792L4.57122 7.49995Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
</IconButton>

{ !isPlaying ?
  <IconButton
  className=' scale-150'
  onClick={play}
  >
<svg
className=' scale-150 text-white' width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.24182 2.32181C3.3919 2.23132 3.5784 2.22601 3.73338 2.30781L12.7334 7.05781C12.8974 7.14436 13 7.31457 13 7.5C13 7.68543 12.8974 7.85564 12.7334 7.94219L3.73338 12.6922C3.5784 12.774 3.3919 12.7687 3.24182 12.6782C3.09175 12.5877 3 12.4252 3 12.25V2.75C3 2.57476 3.09175 2.4123 3.24182 2.32181ZM4 3.57925V11.4207L11.4288 7.5L4 3.57925Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
</IconButton>
:
<IconButton
className=' scale-150'
onClick={pause}
>
<svg
className=' scale-150 text-white' width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.04995 2.74998C6.04995 2.44623 5.80371 2.19998 5.49995 2.19998C5.19619 2.19998 4.94995 2.44623 4.94995 2.74998V12.25C4.94995 12.5537 5.19619 12.8 5.49995 12.8C5.80371 12.8 6.04995 12.5537 6.04995 12.25V2.74998ZM10.05 2.74998C10.05 2.44623 9.80371 2.19998 9.49995 2.19998C9.19619 2.19998 8.94995 2.44623 8.94995 2.74998V12.25C8.94995 12.5537 9.19619 12.8 9.49995 12.8C9.80371 12.8 10.05 12.5537 10.05 12.25V2.74998Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
</IconButton>}

<IconButton
className=' scale-150'
onClick={nextSong}
>
<svg
className=' scale-150 text-white' width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.0502 2.74989C13.0502 2.44613 12.804 2.19989 12.5002 2.19989C12.1965 2.19989 11.9502 2.44613 11.9502 2.74989V7.2825C11.9046 7.18802 11.8295 7.10851 11.7334 7.05776L2.73338 2.30776C2.5784 2.22596 2.3919 2.23127 2.24182 2.32176C2.09175 2.41225 2 2.57471 2 2.74995V12.25C2 12.4252 2.09175 12.5877 2.24182 12.6781C2.3919 12.7686 2.5784 12.7739 2.73338 12.6921L11.7334 7.94214C11.8295 7.89139 11.9046 7.81188 11.9502 7.7174V12.2499C11.9502 12.5536 12.1965 12.7999 12.5002 12.7999C12.804 12.7999 13.0502 12.5536 13.0502 12.2499V2.74989ZM3 11.4207V3.5792L10.4288 7.49995L3 11.4207Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
</IconButton>
    </div>
  )
}
