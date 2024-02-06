'use client'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Result from './Result'
import { endLoading, setKeySearchTerm, setShowSearchResults, startLoading } from '@/redux/slices/songsSlice'
import instance from '@/swazamapi/instance'
import { useRouter } from 'next/navigation'

export default function SearchResults() {
    const router = useRouter()
    const {keysearchTerm,showSearchResults,input} = useSelector(state=>state.song)
    const [searchResults,setsearchResults] = useState([])
    const dispatch = useDispatch()
    // getting top songs
  useEffect(()=>{
    if (input && showSearchResults) {
        dispatch(startLoading())
    const getSongs = async()=>{
        await instance.get(`/search?term=${input}&limit=10`)
        .then(({data})=>{
        setsearchResults(data)
        dispatch(endLoading())
        })
    }
    getSongs()    
    }

  },[input])
    return (
    <div
    style={{
        zIndex:99999999
    }}
    className='flex justify-center items-center'>

    
    <div
    className={(input && showSearchResults) ?' top-14 flex flex-col gap-1 min-h-[100px] max-h-[500px] overflow-y-auto z-[200] bg-black absolute w-[600px] backdrop-blur-xl border-b border-l border-r border-zinc-700 rouded-b-md rounded-bl-md rounded-br-md':''}>
{input && showSearchResults &&  
     <p 
     onClick={()=>{
        dispatch(setKeySearchTerm(input))
        router.push(`/searchResults/${input}`)
        dispatch(setShowSearchResults(false))
    }}
     className=' flex text-zinc-400 gap-4 px-4 text-lg p-2 transition-all duration-150 cursor-pointer hover:bg-zinc-900'>
<svg className=' my-auto' width="21" height="21" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        {input}
    </p>}
    {input && showSearchResults && (searchResults?.tracks?.hits  || [...Array(5)])?.map((song)=>(
        <Result song={song}/>
    ))}
    </div>
    </div>
  )
}
