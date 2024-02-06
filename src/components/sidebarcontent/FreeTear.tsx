import { Card,Button } from '@radix-ui/themes'
import React, { useEffect } from 'react'


import { useGetFreetearResultsQuery, useGetUserBymailQuery } from '@/redux/api/api';
import { useSession } from 'next-auth/react';
import LinearProgress from '@mui/joy/LinearProgress';


import axios from 'axios';

import ProModelpopup from './upgreadeSub/ProModelpopup';
export default function FreeTear() {
  // const asyncStripe = loadStripe(process.env.STRIPE_PUBLIC_API_KEY!)  
  const session = useSession()
    const [progress, setProgress] = React.useState(0);
    const [userData,setuserData] = React.useState({
      userId:'',
      userMail:`${session?.data?.user?.email}`,
      lineItems:[{price:"100",quantity:1}]
    })
      //all ai-genarations from all users

  
  const {data:aiGenarations} = useGetFreetearResultsQuery()
  const {data:userbyMail} = useGetUserBymailQuery(session?.data?.user?.email)
  
  useEffect(()=>{
  setuserData({...userData,userId:userbyMail?._id})
  },[userbyMail])
  //for refetching the data after a generation is started
  const Ai_Genarations = useGetFreetearResultsQuery()

    //my genarations 
    const myMusics= aiGenarations?.filter((ai)=>ai?.userMail === session?.data?.user?.email)

    useEffect(()=>{
        setProgress(myMusics?.length)
    },[myMusics?.length])

    const addSubcribtion=()=>{
    const subsCribe=async()=>{

      await axios.post('/api/stripe',userData)
      .then(({data})=>{console.log(data)
      window.location.href = data?.url
      })

    }
    subsCribe()

    // checkout(userData)
    }

  return (
    <div className="px-3">
      <Card
      style={{
        backgroundColor:'#22262b',
        borderRadius:'20px',
        padding:'5px 5px'
      }}
      className=" bg-zinc-700 rounded-2xl">
{ !userbyMail?.subcribtion &&          <div className="text-center text-sm text-white mb-4 space-y-2">
            <p>
             {myMusics?.length || 0}/5 Free Generations
            </p>

        <LinearProgress
      
      determinate
      variant="outlined"
      color={ myMusics?.length <= 2 ?'success':(myMusics?.length > 2 && myMusics?.length <= 4)?'warning':'danger'}
      size="sm"
      thickness={24}
      value={progress*20}
      sx={{
      borderRadius:'20px',
      border:'1px solid #586b8a',
      }}
    ></LinearProgress>
          </div>}
<ProModelpopup addSubcribtion={addSubcribtion}/>

      </Card>
    </div>
  )
}
