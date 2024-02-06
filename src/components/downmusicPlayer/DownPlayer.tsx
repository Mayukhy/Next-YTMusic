'use client'
import React, { useState } from 'react'
import LeftControls from './controls/LeftControls'
import RightControls from './controls/RightControls'
import { useSelector } from 'react-redux'
import SongMenues from '../popUpmenus/SongMenues'

export default function DownPlayer() {
  const {activeSong} = useSelector(state=>state.song) 
  console.log('ACTIVRSONG',activeSong)
  const [showDetail,setShowDetail] = useState(false)
  return (
    <>
{  activeSong?.songUrl !=='' &&  <div className=' w-screen h-[70px] bottom-0 left-0 bg-zinc-800 fixed '>
    <div className=' flex justify-between my-auto'>
        <LeftControls/>
        <div className=' flex gap-2 my-auto pt-2.5'>
            <img src={activeSong?.imgUrl} alt="img" className=' w-[50px] my-auto h-[50px] rounded-md border border-zinc-500' />
            <div className=' flex flex-col my-auto'>
                <p className=' text-base font-medium text-zinc-200'>{ activeSong?.title || 'Song Title'}</p>
                <p className=' text-base font-medium text-zinc-400'>{ activeSong?.artist ||"AI Song"}</p>

            </div>
        {activeSong?.id !=='undefined' && <SongMenues activeSong={activeSong}/>}
            
        </div>

        <RightControls showDetail={showDetail} setShowDetail={setShowDetail}/>


    </div>
    </div>}
    </>
  )
}
