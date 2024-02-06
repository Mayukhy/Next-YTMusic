
import React, { useEffect, useState } from 'react'
import Artist from './Artist'
import { useSelector } from 'react-redux'
import axios from 'axios'

export default function Artists({artists}) {
  const [allArtists,setAllArtists] = useState([])
  useEffect(()=>{
   axios.get('/api/artists')
  .then(({data})=>setAllArtists(data))
  },[])

  return (
    <div className=' grid xl:grid-cols-5 md:grid-cols-4 grid-cols-1 gap-3'>
      {allArtists?.map((artist,id)=>(
      <Artist artist={artist} id={id}/>

      ))}
    </div>
  )
}
