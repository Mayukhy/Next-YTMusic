import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import DialogTitle from '@mui/joy/DialogTitle';
import ModalDialog, { ModalDialogProps } from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import { Button } from '@radix-ui/themes';
import { useDispatch, useSelector } from 'react-redux';
import {setPlaylistData } from '@/redux/slices/songsSlice';
import { useSession } from 'next-auth/react';

import { useRouter } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';



export default function CreatePlayListToadd({createPlaylist}) {
 const {playlistData,playlistSongData} = useSelector(state=>state.song)

 const dispatch = useDispatch()
 const session = useSession()
 React.useEffect(()=>{
 dispatch(setPlaylistData({...playlistData,userMail:session?.data?.user?.email}))
 },[session])
  const [open, setOpen] = React.useState<boolean>(false);
  const [variant, setVariant] = React.useState<
  ModalDialogProps['variant'] | undefined
>(undefined);
console.log('active playlist song data is here with id',playlistSongData)

  return (
    <React.Fragment>
      <Button
       style={{padding:'6px 10px',borderRadius:'40px',fontWeight:600}}
        variant='surface'
        color='gray'
        onClick={() => {
            setVariant('solid');
        }
    }
      >
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        New Playlist
      </Button>
      <Modal
      
      sx={{border:'none',boxShadow:'none'}}
      open={!!variant} onClose={() => setVariant(undefined)}>
        <ModalDialog variant={variant}
          className=' border border-zinc-800 animate-[slowfade_0.3s]'
        
        sx={{minWidth:'700px',backgroundColor:'#232324',color:'whitesmoke'}}
        >
          <DialogTitle
          sx={{fontSize:'30px'}}
          >New Playlist</DialogTitle>
        
          <form
          className=' py-4'
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              createPlaylist()
              setOpen(false);
              setVariant(undefined)
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel
                sx={{color:'whitesmoke'}}
                >Title</FormLabel>
                <Input
                value={playlistData?.title}
                onChange={(e)=>{
                 dispatch(setPlaylistData({...playlistData,title:e.target.value}))
                }}

                color='primary'
                placeholder='title..'
                 sx={{color:'whitesmoke',background:'transparent'}}
                autoFocus required />
              </FormControl>
              <FormControl>
                <FormLabel
                sx={{color:'whitesmoke'}}
                >Description</FormLabel>
                <Input
                value={playlistData?.desc}
                  onChange={(e)=>{
                    dispatch(setPlaylistData({...playlistData,desc:e.target.value}))
                  }}
                    color='primary'
                placeholder='description..'
                 sx={{color:'whitesmoke',background:'transparent'}}
                 />
              </FormControl>
              <div className=' flex flex-row-reverse'>
              <Button
               style={{padding:'7px 20px',borderRadius:'40px',fontSize:'20px',fontWeight:500}}
                      variant='surface'
                      color='gray'
              type="submit">Create</Button>
              </div>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}