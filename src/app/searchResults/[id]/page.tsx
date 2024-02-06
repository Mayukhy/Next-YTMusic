'use client'
import LikedSongs from '@/components/likedSongs/LikedSongs'
import PlaylistDetails from '@/components/playlist/PlaylistDetails'
import CreatePlaylist from '@/components/playlist/createPlaylist/CreatePlaylist'
import SearchFeed from '@/components/searchpage/SearchFeed'
import Playlists from '@/components/sidebarcontent/Playlists'
import { useGetplaylistQuery } from '@/redux/api/api'
import { setPlaylistName, setScrollValue, setShowNavBorder } from '@/redux/slices/songsSlice'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function page({params}) {
    const {id} = params
    const scrollRef = useRef()
    const {playlistName,scrollValue,showNavborder} = useSelector(state=>state.song)
    const dispatch = useDispatch()
    useEffect(()=>{
      dispatch(setPlaylistName(''))
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
    return (
    <div className=' bg-black  flex flex-row w-full'>
            
            <div className={  scrollValue>10?'w-[1px] h-screen bg-zinc-700 fixed left-[280px] top-18':'w-[1px] h-screen bg-zinc-700 fixed left-[280px] top-0'}></div>
            {/* sidebar */}
            <div className=' px-3 my-2 w-[280px] md:flex hidden h-[calc(100vh-85px)] flex-col bg-black'>
 <CreatePlaylist/>
 <br />
 <Playlists/>

      </div>

      <div className=" bg-black w-full mx-auto md:pr-4 pr-0">
      
      <div
      ref={scrollRef}
      className='overflow-y-auto max-w-[980px] mx-auto  scroll-smooth h-[calc(100vh-66px)]'>
      <div className=' w-full xl:px-16 px-5 flex flex-col justify-center'>

    <SearchFeed/>


      </div>


</div>
    </div>
    </div>
  )
}
