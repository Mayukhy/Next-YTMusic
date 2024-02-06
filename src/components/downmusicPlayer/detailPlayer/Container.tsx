'use client'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Upnext from './Upnext'

export default function Container() {
  const {activeSong,scrollValue,showNavborder,isPlaying,showDetails} = useSelector((state)=>state.song)
  const [tabValue,setTabValue] = useState('Up Next')
const tabs = [
    "Up Next",
    "Liked",
    "Releted"
]
  return (
    <>
{
showDetails  &&
<div
    className=' bg-black w-[calc(100%-270px)] flex lg:flex-row flex-col gap-2 right-0 animate-[slideup_0.5s] h-[calc(100vh-50px)] absolute top-0'>
      {/* cover image */}
      <div className=' flex justify-center w-full md:p-0 p-2 items-center'>
      <img className=' rounded-xl lg:mt-[-40px] lg:w-[600px] md:w-auto p-10' src={activeSong?.imgUrl} alt="" />
      </div>

      {/* tabs */}
            {/* tabs */}

            <div className=' flex flex-col  lg:w-1/2 w-full gap'>
            <div className=' h-[33px] w-full flex gap-5 lg:mt-8 mt-[-10px] border-b z-40  border-zinc-600'>
    {tabs?.map((tab)=>(
        <p
        onClick={()=>setTabValue(tab)}
        className={ tabValue ===tab?' pb-1 text-lg border-b text-zinc-300 cursor-pointer border-b-white transition-all duration-200':' pb-1 transition-all duration-200 cursor-pointer text-lg border-b text-zinc-300 border-b-transparent'}>
            {tab}
        </p>
    ))}
      </div>

      {
        tabValue ==='Up Next' &&

        <Upnext/>
      }
      </div>
    
    </div>}
    </>
  )
}
