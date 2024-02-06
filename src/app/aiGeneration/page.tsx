'use client'
import Loader from '@/components/ai/Loader'
import GeneratedSongs from '@/components/ai/aiGenSongs.tsx/GeneratedSongs'
import Form from '@/components/ai/inputs/Form'
import CreatePlaylist from '@/components/playlist/createPlaylist/CreatePlaylist'
import Playlists from '@/components/sidebarcontent/Playlists'
import SongCard from '@/components/songcard/SongCard'
import { setMusic, setPlaylistName, setScrollValue, setShowNavBorder } from '@/redux/slices/songsSlice'
import { useSession } from 'next-auth/react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function page() {
  const session = useSession()
  const scrollRef = useRef()
  const dispatch = useDispatch()
    const {music,playlistName,scrollValue,showNavborder} = useSelector(state=>state.song)
    const [processing,setProcessing] = useState(false)
    useEffect(()=>{
      dispatch(setPlaylistName('AI Zone'))
    },[playlistName])

    const controlNavber = ()=>{
      if (scrollRef?.current.scrollTop > 3) {
        if (scrollRef?.current.scrollTop > scrollValue) {
         dispatch(setShowNavBorder(false))
        }
    dispatch(setScrollValue(scrollRef?.current.scrollTop))
  }
  if (scrollRef?.current.scrollTop < 3) {
      if (scrollRef?.current.scrollTop < scrollValue) {
        dispatch(setShowNavBorder(true))
      }
  dispatch(setScrollValue(scrollRef?.current.scrollTop))
}
  }

  useEffect(()=>{
    scrollRef?.current?.addEventListener('scroll',controlNavber)
    return ()=>{
      scrollRef?.current?.removeEventListener('scroll',controlNavber)
    }
    },[scrollValue,showNavborder])
  return (
    <div className=' bg-black  flex flex-row w-full'>
            {/* sidebar */}
            <div className={  scrollValue>10?'w-[1px] h-screen bg-zinc-700 fixed md:block hidden left-[280px] top-18':'w-[1px] md:block hidden h-screen bg-zinc-700 fixed left-[280px] top-0'}></div>
            <div className=' px-3 my-2 w-[280px] md:flex hidden h-[calc(100vh-85px)] flex-col bg-black'>
 <CreatePlaylist/>
 <br />
 <Playlists/>

      </div>

      <div
      className="flex bg-black xl:min-w-[1000px] 2xl:min-w-[1300px] 2xl:max-w-[1480px] md:min-w-[500px] lg:min-w-[770px] min-w-full mx-auto flex-col md:pr-4 pr-0">
      
      <div
      ref={scrollRef}
      className='overflow-y-auto  scroll-smooth h-[calc(100vh-66px)]'>
      <div className=' w-full xl:px-16 px-5 flex flex-col mx-auto'>

    <Form setProcessing={setProcessing} music={music}/>

      </div>

{ !music?.songUrl && !processing && <div className='xl:mx-16 flex flex-col px-5 my-5 justify-center items-center  h-[300px] border border-dashed border-zinc-300'>
      <p className=' font-bold text-zinc-300 animate-[slideup_0.3s] text-xl my-5'>Generated music will be shown here</p>
      </div>}
      {processing&&<Loader/>}

    {/* recent generated song */}
    { music?.title && music?.imgUrl && music?.songUrl &&
      <div className='xl:px-16 px-5 my-5 flex flex-col gap-2'>
        <p className=' font-bold text-zinc-300 animate-[slideup_0.3s] text-xl'>Generated Result:</p>
 <SongCard song={music}/>
      </div>
   
    }
    

    {/* generated ai songs */}
    <div className='xl:px-16 px-5 my-5'>
<GeneratedSongs/>
<br /><br /><br />
    </div>


</div>
    </div>
    </div>
  )
}
