import { endLoading, setApiArtistId, startLoading } from '@/redux/slices/songsSlice'
import instance from '@/swazamapi/instance'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

export default function FeedArtistCard({art,songs}) {
  const dispatch = useDispatch()
  const [isShowen,setIsShowen] = useState(false)
  const router = useRouter()
  const {playlistSongData, activeSong,keysearchTerm,activeSongId,apiArtistId} = useDispatch(state=>state.song)
  const session = useSession()
  const [artistDetail,setArtistDetail] = useState(null)
  var Url = artistDetail?.data?.attributes?.artwork?.url;
  var NewUrl = Url?.replace('{w}','1000')
  var FinalUrl = NewUrl?.replace('{h}','1000')

  useEffect(()=>{
    dispatch(startLoading())
        if (apiArtistId) {
            const getSongs = async()=>{
                await instance.get(`/artist/get-top-songs?id=${apiArtistId}&offset=0`)
                .then(({data})=>{
                setArtistDetail(data)
                dispatch(endLoading())
                })
            }
            getSongs()             
        }

},[keysearchTerm,apiArtistId])
  return (

<div
    onClick={()=>{
      router.push(`/artistdetail/${art?.artist?.adam_id}`)
      dispatch(setApiArtistId(art?.artist?.adam_id))
        }
      
      }
    onMouseEnter={()=>{
        // dispatch(setApiArtistId
        //   (song?.artists && song?.artists[0]?.adamid)
        //   )     
      

      setIsShowen(true)}}
    onMouseLeave={()=>setIsShowen(false)}
    className='  flex  gap-3  cursor-pointer relative duration-200 transition-all my-auto border-b pb-3 border-b-zinc-500 '>
    <div className=' flex gap-2 my-auto'>
    <div className=' relative'>

    <img className='duration-200 rounded-full transition-all border opacity-100 border-zinc-300 w-[50px] h-[50px]'
     src={art?.artist?.avatar || artistDetail?.data?.attributes?.artwork?.url?.replace('{w}','1000')?.replace('{h}','1000') ||'https://t3.ftcdn.net/jpg/01/09/00/64/360_F_109006426_388PagqielgjFTAMgW59jRaDmPJvSBUL.jpg'} alt="" />
    </div>

    <div className=' flex flex-col my-auto gap-1'>
    <p className='xl:w-[350px] md:w-[250px] w-[200px] truncate text-zinc-100 my-auto'>{art?.artist?.name || 'Name'}</p>
    <p className=' text-zinc-300 my-auto text-start xl:w-[350px] md:w-[200px] w-[250px] truncate'>Artist</p>
    </div>
    
    </div>

   


{ isShowen &&

  // <svg
  
  // style={{transform:'translateY(-50%)'}}
  // className=' duration-200 transition-all absolute top-[50%] right-0 text-zinc-300'
  // width="25" height="25" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM4.50003 7C4.22389 7 4.00003 7.22386 4.00003 7.5C4.00003 7.77614 4.22389 8 4.50003 8H10.5C10.7762 8 11 7.77614 11 7.5C11 7.22386 10.7762 7 10.5 7H4.50003Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>

  <svg
  onClick={()=>router.push(`/artistdetail/${artist?.adamId}`)}
  style={{transform:'translateY(-50%)'}}
  className=' duration-200 transition-all absolute top-[50%] right-0 text-zinc-300'
  width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.625 2.5C8.625 3.12132 8.12132 3.625 7.5 3.625C6.87868 3.625 6.375 3.12132 6.375 2.5C6.375 1.87868 6.87868 1.375 7.5 1.375C8.12132 1.375 8.625 1.87868 8.625 2.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM7.5 13.625C8.12132 13.625 8.625 13.1213 8.625 12.5C8.625 11.8787 8.12132 11.375 7.5 11.375C6.87868 11.375 6.375 11.8787 6.375 12.5C6.375 13.1213 6.87868 13.625 7.5 13.625Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>

}


</div>

  )
}
