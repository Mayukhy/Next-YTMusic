import { useGetplaylistSongsQuery } from '@/redux/api/api'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function Librarycard({list}) {
    const [isHover,setIsHover] = useState(false)
    const {data:listSongs} = useGetplaylistSongsQuery()
    const session = useSession()
    //filtering my playlist songs
    const mylistsongs = listSongs?.filter((song)=>song?.userMail === session?.data?.user?.email && song?.playlistId === list?._id)
    const router = useRouter()
    return (
    <div
    onClick={()=>
     router.push(`/playlist/${list?._id}`)
    }
    onMouseEnter={()=>setIsHover(true)}
    onMouseLeave={()=>setIsHover(false)}
    className=' hover:opacity-70 transition-all cursor-pointer duration-200 relative flex flex-col min-w-[250px] h-[310px]'>
     
     {/* play icon */}
{ isHover &&  <div className=' animate-[slideup_0.5s] p-2 bg-transparent backdrop-blur-lg rounded-full absolute bottom-0 right-0 mb-20 mr-5'>
     <svg
     className=' text-yellow-50'
     width="35" height="35" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.24182 2.32181C3.3919 2.23132 3.5784 2.22601 3.73338 2.30781L12.7334 7.05781C12.8974 7.14436 13 7.31457 13 7.5C13 7.68543 12.8974 7.85564 12.7334 7.94219L3.73338 12.6922C3.5784 12.774 3.3919 12.7687 3.24182 12.6782C3.09175 12.5877 3 12.4252 3 12.25V2.75C3 2.57476 3.09175 2.4123 3.24182 2.32181ZM4 3.57925V11.4207L11.4288 7.5L4 3.57925Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
     </div>}
     <img src={mylistsongs?.length > 0 ?mylistsongs[0]?.imgUrl:'https://yt3.googleusercontent.com/vCqmJ7cdUYpvR0bqLpWIe8ktaor4QafQLlfQyTuZy-M9W_YafT8Wo9kdsKL2St1BrkMRpVSJgA=s900-c-k-c0x00ffffff-no-rj'}  alt="img" className=' object-cover w-full h-[250px] border border-zinc-400' />
    <p className=' text-xl font-semibold mt-2 w-[240px] truncate text-slate-100'>
        {list?.title}
        </p>
    <p className=' text-lg font-medium w-[240px] truncate text-zinc-300'>{mylistsongs?.length} Songs</p>

    </div>
  )
}
