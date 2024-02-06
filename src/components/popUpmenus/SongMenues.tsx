import * as React from 'react';
import Dropdown from '@mui/joy/Dropdown';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import AddtoPlaylist from './addtoplayListpopup/AddtoPlaylist';
import ModalDialog, { ModalDialogProps } from '@mui/joy/ModalDialog';
import { setActiveSongData, setLikedSongData, setPlaylistSongData } from '@/redux/slices/songsSlice';
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useGetLikedSongsQuery } from '@/redux/api/api';
export default function SongMenues() {
    const {activeSongData,activeSong,likedSongData} = useSelector(state=>state.song)
    console.log('active playlist song data is here',activeSongData)
    const session = useSession()
    const likedSongs = useGetLikedSongsQuery()
    const {data:likedMYSongs} = useGetLikedSongsQuery()
    const dispatch = useDispatch()
    const [variant, setVariant] = React.useState<
    ModalDialogProps['variant'] | undefined
  >(undefined);

  //adding song to liked song 
  const addtoLiked=()=>{
    const likesong=async()=>{
    await axios.post('/api/likedsongs',likedSongData)
    .then(({data})=>{
      likedSongs.refetch()
      toast('You have liked the song')
    })
    .catch(()=>{
      toast.error('Error')
    })
    }
    likesong()
  }
  //already liked
  const alreadyLiked = likedMYSongs?.find((song)=>song?.id === likedSongData?.id && song?.userMail === session?.data?.user?.email)
    
  return (
        <>

<AddtoPlaylist setVariant={setVariant}
      variant={variant}/>
    <Dropdown>
      <MenuButton
      // active songdata is stored to likedsong data to post teh data to liked song array
      onClick={()=>
        {
          dispatch(setLikedSongData({
        
            title:`${activeSong?.title || activeSong?.heading?.title || activeSong?.attributes?.name}`,
            imgUrl:`${activeSong?.imgUrl}`,
            artist:`${activeSong?.artist}`,
            id:`${activeSong?.id}`,
            userMail:`${session?.data?.user?.email}`,
            songUrl:`${activeSong?.songUrl}`
  
           
      }))
      dispatch(setActiveSongData({
        
        title:`${activeSong?.title || activeSong?.heading?.title || activeSong?.attributes?.name}`,
        imgUrl:`${activeSong?.imgUrl}`,
        artist:`${activeSong?.artist}`,
        id:`${activeSong?.id}`,
        playlistId:'',
        userMail:`${session?.data?.user?.email}`,
        songUrl:`${activeSong?.songUrl}`

       
  }))
        }
}
      className=' scale-[0.6] transition-all duration-200'
        sx={{borderRadius:'50%',height:'50px',width:'50px'}}
        slots={{ root: IconButton }}
      >
           <div className=' text-white transition-all hover:bg-zinc-600 duration-200 p-2  rounded-full'>
           <svg className='' width="36" height="36" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.625 2.5C8.625 3.12132 8.12132 3.625 7.5 3.625C6.87868 3.625 6.375 3.12132 6.375 2.5C6.375 1.87868 6.87868 1.375 7.5 1.375C8.12132 1.375 8.625 1.87868 8.625 2.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM7.5 13.625C8.12132 13.625 8.625 13.1213 8.625 12.5C8.625 11.8787 8.12132 11.375 7.5 11.375C6.87868 11.375 6.375 11.8787 6.375 12.5C6.375 13.1213 6.87868 13.625 7.5 13.625Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
           
           </div>
            
      </MenuButton>
      <Menu
      className=' animate-[slowfade_0.3s]'
      sx={{background:'#2b2b2a',border:'none',boxShadow:'none'}}
      >
{ alreadyLiked?
        <MenuItem
        sx={{color:'whitesmoke'}}

        //removing like from the selected song
         onClick={()=>{}}
        >
        <svg className=' text-rose-400' width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.35248 4.90532C1.35248 2.94498 2.936 1.35248 4.89346 1.35248C6.25769 1.35248 6.86058 1.92336 7.50002 2.93545C8.13946 1.92336 8.74235 1.35248 10.1066 1.35248C12.064 1.35248 13.6476 2.94498 13.6476 4.90532C13.6476 6.74041 12.6013 8.50508 11.4008 9.96927C10.2636 11.3562 8.92194 12.5508 8.00601 13.3664C7.94645 13.4194 7.88869 13.4709 7.83291 13.5206C7.64324 13.6899 7.3568 13.6899 7.16713 13.5206C7.11135 13.4709 7.05359 13.4194 6.99403 13.3664C6.0781 12.5508 4.73641 11.3562 3.59926 9.96927C2.39872 8.50508 1.35248 6.74041 1.35248 4.90532Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        Added liked songs</MenuItem>:
        
        <MenuItem
        sx={{color:'whitesmoke'}}

        //adding song to liked song page
         onClick={addtoLiked}
        >
        <svg  width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.89346 2.35248C3.49195 2.35248 2.35248 3.49359 2.35248 4.90532C2.35248 6.38164 3.20954 7.9168 4.37255 9.33522C5.39396 10.581 6.59464 11.6702 7.50002 12.4778C8.4054 11.6702 9.60608 10.581 10.6275 9.33522C11.7905 7.9168 12.6476 6.38164 12.6476 4.90532C12.6476 3.49359 11.5081 2.35248 10.1066 2.35248C9.27059 2.35248 8.81894 2.64323 8.5397 2.95843C8.27877 3.25295 8.14623 3.58566 8.02501 3.88993C8.00391 3.9429 7.98315 3.99501 7.96211 4.04591C7.88482 4.23294 7.7024 4.35494 7.50002 4.35494C7.29765 4.35494 7.11523 4.23295 7.03793 4.04592C7.01689 3.99501 6.99612 3.94289 6.97502 3.8899C6.8538 3.58564 6.72126 3.25294 6.46034 2.95843C6.18109 2.64323 5.72945 2.35248 4.89346 2.35248ZM1.35248 4.90532C1.35248 2.94498 2.936 1.35248 4.89346 1.35248C6.0084 1.35248 6.73504 1.76049 7.20884 2.2953C7.32062 2.42147 7.41686 2.55382 7.50002 2.68545C7.58318 2.55382 7.67941 2.42147 7.79119 2.2953C8.265 1.76049 8.99164 1.35248 10.1066 1.35248C12.064 1.35248 13.6476 2.94498 13.6476 4.90532C13.6476 6.74041 12.6013 8.50508 11.4008 9.96927C10.2636 11.3562 8.92194 12.5508 8.00601 13.3664C7.94645 13.4194 7.88869 13.4709 7.83291 13.5206C7.64324 13.6899 7.3568 13.6899 7.16713 13.5206C7.11135 13.4709 7.05359 13.4194 6.99403 13.3664C6.0781 12.5508 4.73641 11.3562 3.59926 9.96927C2.39872 8.50508 1.35248 6.74041 1.35248 4.90532Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        Add to liked songs</MenuItem>}
        <MenuItem
                  onClick={() => {
                    setVariant('plain');
                  }}
        sx={{color:'whitesmoke'}}
        >
<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM7.50003 4C7.77617 4 8.00003 4.22386 8.00003 4.5V7H10.5C10.7762 7 11 7.22386 11 7.5C11 7.77614 10.7762 8 10.5 8H8.00003V10.5C8.00003 10.7761 7.77617 11 7.50003 11C7.22389 11 7.00003 10.7761 7.00003 10.5V8H4.50003C4.22389 8 4.00003 7.77614 4.00003 7.5C4.00003 7.22386 4.22389 7 4.50003 7H7.00003V4.5C7.00003 4.22386 7.22389 4 7.50003 4Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        Add to Playlist
</MenuItem>
        <MenuItem
        sx={{color:'whitesmoke'}}
        >
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.04995 2.74995C3.04995 2.44619 2.80371 2.19995 2.49995 2.19995C2.19619 2.19995 1.94995 2.44619 1.94995 2.74995V12.25C1.94995 12.5537 2.19619 12.8 2.49995 12.8C2.80371 12.8 3.04995 12.5537 3.04995 12.25V2.74995ZM5.73333 2.30776C5.57835 2.22596 5.39185 2.23127 5.24177 2.32176C5.0917 2.41225 4.99995 2.57471 4.99995 2.74995V12.25C4.99995 12.4252 5.0917 12.5877 5.24177 12.6781C5.39185 12.7686 5.57835 12.7739 5.73333 12.6921L14.7333 7.94214C14.8973 7.85559 15 7.68539 15 7.49995C15 7.31452 14.8973 7.14431 14.7333 7.05776L5.73333 2.30776ZM5.99995 11.4207V3.5792L13.4287 7.49995L5.99995 11.4207Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        Play next</MenuItem>
      </Menu>
    </Dropdown>
    </>
  );
}