import { useGetplaylistSongsQuery } from '@/redux/api/api'
import { setActiveSongData } from '@/redux/slices/songsSlice'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export default function Playlists({list,id}) {
    const router = useRouter()
    const {data:playListsSongs} = useGetplaylistSongsQuery()
    const Songs = useGetplaylistSongsQuery()
    const {playlistData,activeSongData} = useSelector(state=>state.song)
    const dispatch = useDispatch()

    //getting only users playlist songs with the playlist id
    const playlistSongs = playListsSongs?.filter((song)=>song?.playlistId === list?._id)
    
    // already addedtoplaylist
    const alreadyAdded = playListsSongs?.find((song)=>song?.playlistId=== list?._id && song?.id === activeSongData?.id )
    
              // if there is an song id then add teh song to the playlist
              const addToplaylist=()=>{
                if (!alreadyAdded) {
                  const addSong=async()=>{
                    await axios.post('/api/addtoPlaylist',activeSongData)
                    .then(()=>{
                      toast('🎶 Added to new created playlist !')
                      Songs.refetch()
        
                    }
                    )
                    .catch(()=>toast.error('something went wrong !'))
                  }
                  addSong()  
                }
                else{
                  toast.warning('Already added to playlist')
                }

              }
  
    return (
    <div
    onMouseEnter={()=>{
        dispatch(setActiveSongData({...activeSongData,playlistId:`${list?._id}`}))
    }}
    onClick={()=>{
        addToplaylist()}}
    className=' flex gap-2 my-auto
     hover:bg-[#403f3e] cursor-pointer px-5 py-1 transition-all duration-200
    '>
      <img
      className=' w-[60px] h-[60px] my-auto'
      src={playlistSongs?.length > 0 ? playlistSongs[0]?.imgUrl :'https://www.gstatic.com/youtube/media/ytm/images/pbg/playlist-empty-state-@576.png'} alt="" />
    <div className=' flex flex-col gap-1 my-auto'>
    <p className=' my-auto font-medium w-[290px] truncate text-zinc-100 text-lg'>{list?.title}</p>
    <p className=' my-auto font-normal text-zinc-400 text-base'>{playlistSongs?.length || 0} Songs</p>
    </div>
 
    
    </div>
  )
}
