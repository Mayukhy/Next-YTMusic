
import { setInput, setKeySearchTerm, setShowSearchResults } from '@/redux/slices/songsSlice'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function Searchfield() {
    const dispatch = useDispatch()
    const router = useRouter()

    const {showSearchResults,keysearchTerm,input} = useSelector((state)=>state.song)
  return (
    <div className=' w-[600px] flex gap-1 my-auto relative'>
    <input
    onChange={(e)=>dispatch(setInput(e.target.value))}
    onFocus={()=>dispatch(setShowSearchResults(true))}
    // onBlur={()=>{
    //     dispatch(setKeySearchTerm(null))
    //     dispatch(setShowSearchResults(false))}}
    className=' w-full outline-none focus:bg-transparent bg-zinc-800 transition-all duration-200 border text-zinc-200 border-zinc-700 rounded-md p-2'
    type="text"
    placeholder='Search Songs, Artists'
    />
{showSearchResults && input?.length > 3 &&
  <svg
  className=' text-white ml-[-25px] mt-3 scale-125 '
  onClick={()=>{
    dispatch(setKeySearchTerm(input))
    router.push(`/searchResults/${input}`)
    dispatch(setShowSearchResults(false))
  }}
  width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
}
    </div>
  )
}
