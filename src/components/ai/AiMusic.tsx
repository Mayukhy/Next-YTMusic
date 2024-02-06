import { endLoading, startLoading } from '@/redux/slices/songsSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useRouter } from 'next/navigation'

export default function AiMusic() {
const router = useRouter()

    return (
        <div
        className=' flex flex-col justify-center items-center mt-10 w-full gap-5'>

<div className=' flex justify-between gap-3 my-auto mt-5'>
<p className=' font-bold text-white text-[45px]'>
<span
  className='text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-600'
  >AI {' '}</span>
  Songs with {' '}
  <span
  className='text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-600'
  >Replecate</span>
</p>

</div>
            <div className=' flex gap-5 overflow-x-auto ml-[-8px]  scroll-smooth'>
        
              <img
              className=' cursor-pointer hover:opacity-70 transition-all duration-200 w-[400px] h-[400px] animate-[slideup_0.4s]'
              onClick={()=>{
                router.push('/aiGeneration')
              }}
              src="https://cdn-icons-png.flaticon.com/512/5501/5501851.png" alt="" />
            </div>
            </div>
  )
}
