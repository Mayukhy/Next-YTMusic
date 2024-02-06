// import * as React from 'react';

// import Modal from '@mui/joy/Modal';
// import DialogTitle from '@mui/joy/DialogTitle';
// import ModalDialog, { ModalDialogProps } from '@mui/joy/ModalDialog';
// import Stack from '@mui/joy/Stack';
// import { Button } from '@radix-ui/themes';



// export default function AddtoPlaylist({variant, setVariant}) {

//   return (
//     <React.Fragment>
//       <Button
//        style={{padding:'0px 6px',borderRadius:'40px'}}
//         onClick={() => {
//             setVariant('solid');
//         }
//     }
//       >
//       <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
//        Add to playlist
//       </Button>
//       <Modal
      
//       sx={{border:'none',boxShadow:'none'}}
//       open={!!variant} onClose={() => setVariant(undefined)}>
//         <ModalDialog variant={variant}
//           className=' border border-zinc-800 animate-[slowfade_0.3s]'
        
//         sx={{minWidth:'700px',backgroundColor:'#232324',color:'whitesmoke'}}
//         >
//           <DialogTitle
//           sx={{fontSize:'30px'}}
//           >New Playlist</DialogTitle>
        
//           <form
//           className=' py-4'
//             onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
//               event.preventDefault();
//               createPlaylist()
//               setOpen(false);
//             }}
//           >
//             <Stack spacing={2}>
//               <FormControl>
//                 <FormLabel
//                 sx={{color:'whitesmoke'}}
//                 >Title</FormLabel>
//                 <Input
//                 value={playlistData?.title}
//                 onChange={(e)=>{
//                  dispatch(setPlaylistData({...playlistData,title:e.target.value}))
//                 }}

//                 color='primary'
//                 placeholder='title..'
//                  sx={{color:'whitesmoke',background:'transparent'}}
//                 autoFocus required />
//               </FormControl>
//               <FormControl>
//                 <FormLabel
//                 sx={{color:'whitesmoke'}}
//                 >Description</FormLabel>
//                 <Input
//                 value={playlistData?.desc}
//                   onChange={(e)=>{
//                     dispatch(setPlaylistData({...playlistData,desc:e.target.value}))
//                   }}
//                     color='primary'
//                 placeholder='description..'
//                  sx={{color:'whitesmoke',background:'transparent'}}
//                  />
//               </FormControl>
//               <div className=' flex flex-row-reverse'>
//               <Button
//                style={{padding:'7px 20px',borderRadius:'40px',fontSize:'20px',fontWeight:500}}
//                       variant='surface'
//                       color='gray'
//               type="submit">Create</Button>
//               </div>
//             </Stack>
//           </form>
//         </ModalDialog>
//       </Modal>
//     </React.Fragment>
//   );
// }


import { useDispatch, useSelector } from 'react-redux';
import { setActiveSongData, setPlaylistData, setPlaylistSongData } from '@/redux/slices/songsSlice';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';
import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog, { ModalDialogProps } from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import CreatePlaylist from '@/components/playlist/createPlaylist/CreatePlaylist';
import { useGetplaylistsQuery } from '@/redux/api/api';
import Playlists from './Playlists';
import CreatePlayListToadd from '@/components/playlist/createPlaylist/CreatePlayListToadd';
import { useGetplaylistSongsQuery } from '@/redux/api/api';
export default function AddtoPlaylist({variant, setVariant}) {
  const {data:playlists} = useGetplaylistsQuery()
  const {playlistData,playlistSongData,activeSongData} = useSelector(state=>state.song)
    const dispatch = useDispatch()
    const session = useSession()
    const router= useRouter()
    //finding loggedin users playlists
    const userplaylists = playlists?.filter((list)=>list?.userMail === session?.data?.user?.email)
    React.useEffect(()=>{
    dispatch(setPlaylistData({...playlistData,userMail:session?.data?.user?.email}))
    },[session])
    const Songs = useGetplaylistSongsQuery()
    const Lists = useGetplaylistsQuery()


    //creation of playlist
    const createPlaylist=()=>{
      const create= async()=>{
      await axios.post('/api/playlist',playlistData)
      .then(({data})=>{
        Lists.refetch()
        Songs.refetch()
        // dispatch(setActiveSongData({...setActiveSongData,playlistId:`${data?._id}`}))
      toast('▶️ Playlist is Created Successfully !',
      {
          position:"top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          })
      }) 
      .catch(()=> toast('Something went wrong !'))   
  }
      create()    
  }

   return (
    <React.Fragment
    >
      <Modal open={!!variant} onClose={() => setVariant(undefined)}>
        <ModalDialog
         sx={{backgroundColor:'#232324',minWidth:'450px',
         maxHeight:600,
         color:'whitesmoke',px:0}}
         className=' border px-0 border-zinc-800 animate-[slowfade_0.3s]'
        variant={variant}>
          <ModalClose />
          <DialogTitle
          sx={{fontSize:'30px',pl:3}}
          >Save to playlist</DialogTitle>
          <div className=' flex gap-4 my-4 flex-col w-full h-[calc(100vh-200px)] overflow-y-auto'>
          {userplaylists?.map((list,id)=>(
          <Playlists   list={list} id={id}/>
          ))}


          </div>
          <div className=' flex mr-4 flex-row-reverse animate-slideup'>
        <CreatePlayListToadd createPlaylist={createPlaylist}/>
        </div>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}