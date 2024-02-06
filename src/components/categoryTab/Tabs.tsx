import { tabs } from '@/app/utils/tabs'
import { setSearchTerm } from '@/redux/slices/songsSlice'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Window from './Window'
import { useSession } from 'next-auth/react'

export default function Tabs() {
  const session = useSession()
    const {searchTerm} = useSelector(state=>state.song)
    const dispatch = useDispatch()
    return (

    <div className=' flex justify-items-start gap-4 my-auto overflow-x-auto scroll-smooth'>
    {tabs?.map((tab)=>(
       <div
       onClick={()=>dispatch(setSearchTerm(tab))}
       className={ searchTerm === tab?'my-auto py-1.5 px-4 bg-zinc-100 transition-all lg:min-w-0 min-w-[110px] truncate duration-200 cursor-pointer text-zinc-950 text-center text-xs rounded-md':'truncate lg:min-w-0 min-w-[110px] my-auto py-1.5 px-4 bg-zinc-600 hover:bg-zinc-800 transition-all duration-200 cursor-pointer text-zinc-100 text-center text-xs rounded-md'}>{tab}</div>
    ))}
{session?.data?.user?.email
&&
<Window/>
}
   
    </div>
  )
}
