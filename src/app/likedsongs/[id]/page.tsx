'use client'
import LikedSongs from '@/components/likedSongs/LikedSongs'
import PlaylistDetails from '@/components/playlist/PlaylistDetails'
import CreatePlaylist from '@/components/playlist/createPlaylist/CreatePlaylist'
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
      dispatch(setPlaylistName('Liked'))
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
    <div
    className=' bg-black  flex flex-row w-full'>
            {/* sidebar */}
            <div className={  scrollValue>10?'w-[1px] h-screen bg-zinc-700 fixed left-[280px] top-18 md:block hidden':'w-[1px] h-screen bg-zinc-700 fixed left-[280px] md:block hidden top-0'}></div>
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

    <LikedSongs/>

      </div>


</div>
    </div>
    </div>
  )
}
