'use client'

import TopSongs from '@/components/topSongs/TopSongs'
import Tabs from '@/components/categoryTab/Tabs'
import RecomendedSongs from '@/components/recomendedSongs/RecomendedSongs'
import { Button } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import FevArtists from '../components/fevArtists/FevArtists'
import CreatePlaylist from '@/components/playlist/createPlaylist/CreatePlaylist'
import Playlists from '@/components/sidebarcontent/Playlists'
import AiMusic from '@/components/ai/AiMusic'
import { useEffect, useRef } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import Library from '@/components/library/Library'
import { useSession } from 'next-auth/react'
import {useGetUserBymailQuery, useGetplaylistsQuery } from '@/redux/api/api'
import { useDispatch, useSelector } from 'react-redux'
import { setPlaylistName, setScrollValue, setShowNavBorder } from '@/redux/slices/songsSlice'
import Container from '@/components/downmusicPlayer/detailPlayer/Container'

export default function Home() {
  const router = useRouter()
  const scrollRef = useRef()
  const {playlistName,scrollValue,showNavborder,isPlaying} = useSelector(state=>state.song)
  const dispatch = useDispatch()
    const {data:playlists} = useGetplaylistsQuery()
    const session = useSession()
    const {data:singleUser} = useGetUserBymailQuery(session?.data?.user?.email)
    console.log('single user',singleUser)
    console.log('Scrolled value',scrollValue)

    useEffect(()=>{
      dispatch(setPlaylistName('Home'))
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
  
      // useEffect(()=>{
      //  window.scrollTo(0,0)
      // },[])
  
    //my playlists
    const myplaylists = playlists?.filter((data)=>data?.userMail === session?.data?.user?.email)
  return (
    <div
    className=' flex flex-row bg-black w-screen'
    >
       <div className={  scrollValue>10?'w-[1px] h-screen bg-zinc-700 fixed md:block hidden left-[280px] top-18':'w-[1px] md:block hidden h-screen bg-zinc-700 fixed left-[280px] top-0'}></div>
      {/* sidebar */}
      <div
      
      className=' w-[280px] px-3 my-2 md:flex hidden h-[calc(100vh-85px)] flex-col bg-black '>
 <CreatePlaylist/>
 <br />
 <Playlists/>

      </div>

    <div className="flex  relative xl:min-w-[1000px] md:min-w-[500px] lg:min-w-[770px] min-w-full mx-auto flex-col md:pr-4 pr-0">
      <div
      ref={scrollRef}
      className='overflow-y-auto  scroll-smooth h-[calc(100vh-66px)]'>
      <div className=' max-w-[1200px] xl:px-16 px-5 flex flex-col mx-auto'>

       {/* dynamic tabs */}
       <div className=' my-10'>
       <Tabs/>
       </div>
      
        {/* top songs */}
        <TopSongs/>

        {/* recomended songs */}
        <RecomendedSongs/>

        {/* fev artists */}
        <FevArtists/>

              {/* library */}
      { myplaylists?.length >0 && <Library/>}

        {/* aimusic */}

        <AiMusic/>
      



      </div>
<br /><br /><br /><br />
      </div>
    </div>

    </div>
  )
}
