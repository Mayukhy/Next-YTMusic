import { useGetUserBymailQuery, useGetUsersQuery, useGetplaylistsQuery } from '@/redux/api/api'
import { setPlaylistName } from '@/redux/slices/songsSlice'
import { Button } from '@radix-ui/themes'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LikedSongs from './LikedSongs'
import axios from 'axios'
import FreeTear from './FreeTear'

export default function Playlists() {
    const [users,setUsers] = useState([])
    const router = useRouter()
    const dispatch = useDispatch()
    const {playlistName} = useSelector(state=>state.song)
    const {data:playlists} = useGetplaylistsQuery()
    const session = useSession()
    const {data:userbyMail} = useGetUserBymailQuery(session?.data?.user?.email)
        //getting userData
        useEffect(()=>{
            const getUsers = async()=>{
                await axios.get('/api/users')
                .then(({data})=>{
                setUsers(data)
                })
            }
            getUsers()
            },[session])
        
            //finding the currentlyloggedin users id
            const myId = users?.find((u)=>u?.email === session?.data?.user?.email)

    const menu =[
        {name:'Home', to:'/',icon:<svg className=' my-auto scale-125 mr-1 text-indigo-400' width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.07926 0.222253C7.31275 -0.007434 7.6873 -0.007434 7.92079 0.222253L14.6708 6.86227C14.907 7.09465 14.9101 7.47453 14.6778 7.71076C14.4454 7.947 14.0655 7.95012 13.8293 7.71773L13 6.90201V12.5C13 12.7761 12.7762 13 12.5 13H2.50002C2.22388 13 2.00002 12.7761 2.00002 12.5V6.90201L1.17079 7.71773C0.934558 7.95012 0.554672 7.947 0.32229 7.71076C0.0899079 7.47453 0.0930283 7.09465 0.32926 6.86227L7.07926 0.222253ZM7.50002 1.49163L12 5.91831V12H10V8.49999C10 8.22385 9.77617 7.99999 9.50002 7.99999H6.50002C6.22388 7.99999 6.00002 8.22385 6.00002 8.49999V12H3.00002V5.91831L7.50002 1.49163ZM7.00002 12H9.00002V8.99999H7.00002V12Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>},
        {name:'Library', to:'/library', icon:<svg className=' scale-125 mr-1 text-blue-300 my-auto' width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 2C3.22386 2 3 2.22386 3 2.5V13.5C3 13.6818 3.09864 13.8492 3.25762 13.9373C3.41659 14.0254 3.61087 14.0203 3.765 13.924L7.5 11.5896L11.235 13.924C11.3891 14.0203 11.5834 14.0254 11.7424 13.9373C11.9014 13.8492 12 13.6818 12 13.5V2.5C12 2.22386 11.7761 2 11.5 2H3.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>},
        {name:'AI Zone',to:'/aiGeneration', icon:<svg className=' my-auto scale-125 mr-1 text-yellow-300' width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.9 0.499976C13.9 0.279062 13.7209 0.0999756 13.5 0.0999756C13.2791 0.0999756 13.1 0.279062 13.1 0.499976V1.09998H12.5C12.2791 1.09998 12.1 1.27906 12.1 1.49998C12.1 1.72089 12.2791 1.89998 12.5 1.89998H13.1V2.49998C13.1 2.72089 13.2791 2.89998 13.5 2.89998C13.7209 2.89998 13.9 2.72089 13.9 2.49998V1.89998H14.5C14.7209 1.89998 14.9 1.72089 14.9 1.49998C14.9 1.27906 14.7209 1.09998 14.5 1.09998H13.9V0.499976ZM11.8536 3.14642C12.0488 3.34168 12.0488 3.65826 11.8536 3.85353L10.8536 4.85353C10.6583 5.04879 10.3417 5.04879 10.1465 4.85353C9.9512 4.65827 9.9512 4.34169 10.1465 4.14642L11.1464 3.14643C11.3417 2.95116 11.6583 2.95116 11.8536 3.14642ZM9.85357 5.14642C10.0488 5.34168 10.0488 5.65827 9.85357 5.85353L2.85355 12.8535C2.65829 13.0488 2.34171 13.0488 2.14645 12.8535C1.95118 12.6583 1.95118 12.3417 2.14645 12.1464L9.14646 5.14642C9.34172 4.95116 9.65831 4.95116 9.85357 5.14642ZM13.5 5.09998C13.7209 5.09998 13.9 5.27906 13.9 5.49998V6.09998H14.5C14.7209 6.09998 14.9 6.27906 14.9 6.49998C14.9 6.72089 14.7209 6.89998 14.5 6.89998H13.9V7.49998C13.9 7.72089 13.7209 7.89998 13.5 7.89998C13.2791 7.89998 13.1 7.72089 13.1 7.49998V6.89998H12.5C12.2791 6.89998 12.1 6.72089 12.1 6.49998C12.1 6.27906 12.2791 6.09998 12.5 6.09998H13.1V5.49998C13.1 5.27906 13.2791 5.09998 13.5 5.09998ZM8.90002 0.499976C8.90002 0.279062 8.72093 0.0999756 8.50002 0.0999756C8.2791 0.0999756 8.10002 0.279062 8.10002 0.499976V1.09998H7.50002C7.2791 1.09998 7.10002 1.27906 7.10002 1.49998C7.10002 1.72089 7.2791 1.89998 7.50002 1.89998H8.10002V2.49998C8.10002 2.72089 8.2791 2.89998 8.50002 2.89998C8.72093 2.89998 8.90002 2.72089 8.90002 2.49998V1.89998H9.50002C9.72093 1.89998 9.90002 1.72089 9.90002 1.49998C9.90002 1.27906 9.72093 1.09998 9.50002 1.09998H8.90002V0.499976Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>},
        {name:'Fev Artists',to:'/chooseArtists', icon:<svg className=' my-auto scale-125 mr-1' text-violet-300 width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.62129 1.13607C9.81656 0.940808 10.1331 0.940809 10.3284 1.13607L11.3891 2.19673L12.8033 3.61094L13.8639 4.6716C14.0592 4.86687 14.0592 5.18345 13.8639 5.37871C13.6687 5.57397 13.3521 5.57397 13.1568 5.37871L12.5038 4.7257L8.86727 9.57443L9.97485 10.682C10.1701 10.8773 10.1701 11.1939 9.97485 11.3891C9.77959 11.5844 9.463 11.5844 9.26774 11.3891L7.85353 9.97491L6.79287 8.91425L3.5225 12.1846C3.32724 12.3799 3.01065 12.3799 2.81539 12.1846C2.62013 11.9894 2.62013 11.6728 2.81539 11.4775L6.08576 8.20714L5.0251 7.14648L3.61089 5.73226C3.41563 5.537 3.41562 5.22042 3.61089 5.02516C3.80615 4.8299 4.12273 4.8299 4.31799 5.02516L5.42557 6.13274L10.2743 2.49619L9.62129 1.84318C9.42603 1.64792 9.42603 1.33133 9.62129 1.13607Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path><path d="M9.62129 1.13607C9.81656 0.940808 10.1331 0.940809 10.3284 1.13607L11.3891 2.19673L12.8033 3.61094L13.8639 4.6716C14.0592 4.86687 14.0592 5.18345 13.8639 5.37871C13.6687 5.57397 13.3521 5.57397 13.1568 5.37871L12.5038 4.7257L8.86727 9.57443L9.97485 10.682C10.1701 10.8773 10.1701 11.1939 9.97485 11.3891C9.77959 11.5844 9.463 11.5844 9.26774 11.3891L7.85353 9.97491L6.79287 8.91425L3.5225 12.1846C3.32724 12.3799 3.01065 12.3799 2.81539 12.1846C2.62013 11.9894 2.62013 11.6728 2.81539 11.4775L6.08576 8.20714L5.0251 7.14648L3.61089 5.73226C3.41563 5.537 3.41562 5.22042 3.61089 5.02516C3.80615 4.8299 4.12273 4.8299 4.31799 5.02516L5.42557 6.13274L10.2743 2.49619L9.62129 1.84318C9.42603 1.64792 9.42603 1.33133 9.62129 1.13607Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>}
      ]
   // finding only loggedin users playlist
   const userPlaylists = playlists?.filter((list)=>list?.userMail === session?.data?.user?.email)
    return (
    <div className=' flex-col flex gap-2'>

    {/* menue */}
    {menu?.map((item)=>(
            <div
            onClick={()=>{
                dispatch(setPlaylistName(item?.name))
                router.push(`${item?.to}`)}}
            className={playlistName === item?.name?' flex my-auto gap-2 cursor-pointer justify-start text-zinc-100 hover:bg-zinc-800 bg-zinc-800 px-4 py-2 rounded-xl duration-200 transition-all':' cursor-pointer flex my-auto gap-2 justify-start text-zinc-100 hover:bg-zinc-800 px-4 py-2 rounded-xl duration-200 transition-all'}>
             {item?.icon}
             <p className=' text-zinc-100 w-[220px] truncate font-medium'>{item?.name}</p>

            </div>
    ))}
        <LikedSongs/>

        <div className=' w-full h-[0.15px] my-2 bg-zinc-600'></div>
<div className={ userbyMail?.subcribtion ?' flex flex-col gap-1 h-[calc(100vh-490px)] overflow-y-auto' :' flex flex-col gap-1 h-[calc(100vh-550px)] overflow-y-auto'}>
{userPlaylists?.map((list)=>(
    <div
    onClick={()=>{
        dispatch(setPlaylistName(list?.title))
        router.push(`/playlist/${list?._id}`)}}
    className={playlistName === list?.title?' cursor-pointer flex flex-col justify-start text-zinc-100 hover:bg-zinc-800 bg-zinc-800 px-4 py-2 rounded-xl duration-200 transition-all':' cursor-pointer flex flex-col justify-start text-zinc-100 hover:bg-zinc-800 px-4 py-2 rounded-xl duration-200 transition-all'}>
     <p className=' text-zinc-100 w-[220px] truncate font-medium'>{list?.title}</p>
     <p className=' text-zinc-300 font-normal'>{list?.desc || 'no desc'}</p>
    </div>
))}
</div>


{/* free tiar count */}
{session?.data?.user?.email &&
<FreeTear/>
}

      
    </div>
  )
}
