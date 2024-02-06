import React, { useEffect, useState } from 'react'
import Duration from './dropdowns/Duration'
import Guidance from './dropdowns/Guidance'
import axios from 'axios'
import { toast } from 'react-toastify'
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import { useSession } from 'next-auth/react'
import { useDispatch, useSelector } from 'react-redux'
import { setMusic } from '@/redux/slices/songsSlice'
import { useGetFreetearResultsQuery, useGetUserQuery, useGetUsersQuery } from '@/redux/api/api'

export default function Form({setProcessing}) {

  const aiMusicimages = [
    {
      id:1,
      image:'https://cafedissensuseveryday.files.wordpress.com/2023/06/ai-playing-the-piano-1024x683-1.png'
    },
    {
      id:2,
      image:'https://s3.amazonaws.com/media.mediapost.com/dam/cropped/2023/01/27/shutterstock_1188029230_CAgOC4j.jpg'
    },
    {
      id:3,
      image:'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F178b8ebf-3eeb-491e-8c47-da451547c427_1280x720.png'
    },
    {
      id:4,
      image:'https://miro.medium.com/v2/resize:fit:1400/1*LGhIDaitUk2m850Ou2E4XQ.png'
    },
    {
      id:5,
      image:'https://media.licdn.com/dms/image/D5612AQEXMHHWVX2YVA/article-cover_image-shrink_720_1280/0/1692251276024?e=2147483647&v=beta&t=suQuGCxfR8nQRcIr1Mn_Qwp81sbAappJ4bxpDpohhek'
    }
  ]
  const [genId,setGenId] = useState(null)
  const dispatch = useDispatch()
  const session = useSession()
  const {activeSong,music} = useSelector(state=>state.song)

  const {data:allUsers} = useGetUsersQuery()

  //all ai-genarations from all users

  const {data:aiGenarations} = useGetFreetearResultsQuery()
  
  //for refetching the data after a generation is started
  const Ai_Genarations = useGetFreetearResultsQuery()

  console.log('Ai genarations are',aiGenarations)
  const All_Users = useGetUsersQuery()

  //my userData
  const myself= allUsers?.find((u)=>u?.email === session?.data?.user?.email)
  
  const {data:ownData} = useGetUserQuery(myself?._id)
  console.log('Own data with populate',ownData)
  //my genarations 
  const myMusics= aiGenarations?.filter((ai)=>ai?.userMail === session?.data?.user?.email)
  
  
  useEffect(()=>{
    if (genId !== null) {
    const addgenId =async()=>{
        await axios.put(`/api/users/ailimits/${myself?._id}`,{genId})
        .then(()=>{
          toast('one generation is burnt 🔥') 
          All_Users.refetch()
          Ai_Genarations.refetch()
          console.log('The all users are',allUsers)
          setGenId(null)
        })
    }   
    
    addgenId()
  }
  else{

  }

  },[genId])

  console.log(myself)
  console.log('Ai music data is here',music)
  const [postData,setpostData] = useState(
        {
            userMail:`${session?.data?.user?.email}`,
            duration:30,
            guidance:2,
            prompt:'',
        }
    )
    console.log('From data',postData)

    console.log('ACTIVRSONG AGAIN',activeSong)

    useEffect(()=>{
      dispatch(setMusic({...music,userMail:session?.data?.user?.email}))
    },[session])

    //for succesfull music genaration and and add update api limit for free-tear
    const genarateSong=()=>{
     if (myMusics?.length < 5) {
           // burning api limit 🔥🔥
           const burnLimit=async()=>{
            await axios.post('/api/apiLimit',postData)
            .then(({data})=>{
              setGenId(data?._id)
              Ai_Genarations.refetch()
              console.log('generated id',genId)
              // toast.success('one generation is expired 🔥') 
            })
            .catch((error)=>{
                          toast.error('something went wrong')
                        })
      
          }
            burnLimit() 



      console.log('Form data',postData)
        setProcessing(true)
        
        // actual music generation
          axios.post('/api/music',postData)
          .then(({data})=>{
              setProcessing(false)
              console.log(data)
              dispatch(setMusic({...music,songUrl:data,title:postData?.prompt,imgUrl:aiMusicimages[Math.floor(Math.random()*aiMusicimages?.length)]?.image}))
              console.log('Song data',music)
              toast.success('🤖 Music is genareted successfully !')
          })
          .catch((error)=>{
              setProcessing(false)
              console.log(error)
              toast.error(error)})   
        
      }
      else{
       toast.error('Your free tear is fucked_up')
      }

    }



  return (
    <div className=' flex flex-col justify-center gap-3 '>
      <h2
className="lg:text-[50px] md:text-[45px] text-[30px] my-4 text-white font-semibold">
  Start your {' '}
  <span
  className='text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-600'
  >AI {' '}</span>
Journey with {' '}
<span
  className='text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-600'
  >Replecate</span>
      
</h2>
      <div className=' flex lg:flex-row flex-col gap-6'>
<div className=' flex gap-2 my-auto'>
    <p className=' text-white my-auto font-semibold text-base'> Select Music duration :</p>
<Duration 
postData={postData}
setpostData={setpostData}/> 
</div>
<div className=' flex gap-2 my-auto'>
<p className=' text-white my-auto font-semibold text-base'> Choose Guigence level :</p>
<Guidance
postData={postData}
setpostData={setpostData}/>
</div>

      </div>
      {/* user prompt */}

      <form onSubmit={(e)=>{
       e.preventDefault()
        genarateSong() 
      }}>

<FormControl>
        <FormLabel
          sx={{
            color:'whitesmoke',fontSize:20,mb:1
          }}
        >
        prompt to generate AI music
        </FormLabel>
        <Input
                  sx={{
                    color:'whitesmoke',
                    background:'transparent',
                    py:0.5
                  }}
          placeholder="describe here.."
          type="text"
          required
          value={postData?.prompt}
          onChange={(e) =>
           setpostData({...postData,prompt:e.target.value})
          }
          endDecorator={
            <Button
            className=' bg-zinc-600 py-2'
              variant="solid"
              color='neutral'
              type="submit"
              sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            >
              Generate
            </Button>
          }
        />

      </FormControl>
    </form>
    </div>
  )
}
