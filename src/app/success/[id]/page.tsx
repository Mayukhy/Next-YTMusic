'use client'
import {useGetUserBymailQuery, useGetsingleUserQuery } from '@/redux/api/api'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function page({params}) {
  const {id} = params
  const session = useSession()
  const {data:singleUser} = useGetUserBymailQuery(session?.data?.user?.email)
  const router = useRouter()

  useEffect(()=>{
    // if (!singleUser?.stripSessionId) {
    //     router.push('/')
    //     }
    //     else{
      if ( singleUser && singleUser?.subcribtion ===false) {
        
        const subscribe=async()=>{
          await axios.put(`/api/paymentSuccess/${singleUser?._id}`)
          .then(()=>{
              toast('Your Subcribtion is started 🥳')
              // router.push(`/success/${id}`)
          })
      }
      subscribe()  
      }
      else if (singleUser?.subcribtion) {
        toast.error('You are already in pro plane')
        router.push('/')
      }

        
  },[singleUser])

  return (
    <div className=' text-green-600 font-extrabold text-7xl'>
      Success
    </div>
  )
}
