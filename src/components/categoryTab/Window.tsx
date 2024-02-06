import * as React from 'react';
import Button from '@mui/joy/Button';
import { TypeAnimation } from "react-type-animation";
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Stories, { WithSeeMore } from "react-insta-stories";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import { endLoading, setStoriesSongs, startLoading } from '@/redux/slices/songsSlice';
import { useDispatch, useSelector } from 'react-redux';
import instance from '@/swazamapi/instance';
import { useGetFevSongsQuery } from '@/redux/api/api';
import { useSession } from 'next-auth/react';
// import Typography from '@mui/material/Typography';

export default function Window() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch()
  const {storiesSongs} = useSelector(state=>state.song)
  // getting top songs
  // React.useEffect(()=>{
  //   dispatch(startLoading())
  //   const getSongs = async()=>{
  //       await instance.get(`/search?term=hindi songs 2023 &limit=10`)
  //       .then(({data})=>{
  //       dispatch(setStoriesSongs(data?.tracks?.hits))
  //       dispatch(endLoading())
  //       })
  //   }
  //   getSongs()
  // },[])
  return (
    <React.Fragment>
    <div
    onClick={()=>setOpen(true)}
    className=' truncate lg:min-w-0 min-w-[110px] my-4 py-1.5 px-4 bg-zinc-900 hover:bg-zinc-950 transition-all duration-200 cursor-pointer text-zinc-100 text-center text-sm rounded-3xl border-[2px] border-b-blue-700 border-l-red-600 border-t-indigo-500 border-r-green-500
     hover:border-b-indigo-700 hover:border-l-green-600 hover:border-t-blue-500 hover:border-r-rose-500
    '>
      New Year 2024
    </div>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
        className=' animate-[slideup_0.4s]'
          variant="outlined"
          sx={{
            width: 800,
            height:'100vh',
            borderRadius: 'md',
            boxShadow: 'lg',
            border:'none',
            backgroundColor:'#232324'
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
          className=' hover:underline cursor-pointer'
          sx={{
            color:'whitesmoke',
            pl:2,
            mt:2
          }}
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            # MTWrapped2K23
          </Typography>

          <div className="stories">
          <Stories
          width={800}
          height='100vh'
            loop
            keyboardNavigation
            defaultInterval={30000}
            stories={stories2}
            onStoryEnd={(s, st) => console.log("story ended", s, st)}
            onAllStoriesEnd={(s, st) => console.log("all stories ended", s, st)}
            onStoryStart={(s, st) => console.log("story started", s, st)}
          />
        </div>

        </Sheet>
      </Modal>
    </React.Fragment>
  );
}


const Story2 = ({ action, isPaused }) => {
    return (
      <div
        style={{ ...contentStyle, background: "Aquamarine", color: "#16161d" }}
      >
        <h1>Hope you like shivam's story 😄.</h1>
        {/* <p>
          Render your custom JSX by passing just a{" "}
          <code style={{ fontStyle: "italic" }}>content</code> property inside
          your story object.
        </p> */}
        {/* <p>
          You get a <code style={{ fontStyle: "italic" }}>action</code> prop as an
          input to your content function, that can be used to play or pause the
          story.
        </p> */}
        {/* <h1>{isPaused ? "Paused" : "Playing"}</h1> */}
        <h4>
          Wanna create journey stories like these. <br /> Download cube stop
          travel app 🎉
        </h4>
        {/* <p>React Native version coming soon.</p> */}
      </div>
    );
  };
  
  const stories2 = [

    {
      content: ({ action, isPaused }) => {
        const {storiesSongs} = useSelector(state=>state.song)
        const {data:fevSongs} = useGetFevSongsQuery()
        const session = useSession()
        //filtering only my fev songs 
        const myFevs = fevSongs?.filter((s)=>s?.userMail === session?.data?.user?.email)
        const [currentSong,setCurrentSong] = React.useState(null)
        const [songIndex,setSongIndex] = React.useState(0)
        React.useEffect(()=>{
          if (myFevs?.length < 5) {
            setCurrentSong(storiesSongs[0]?.hub?.actions[1]?.uri || storiesSongs[0]?.stores?.apple?.previewurl || storiesSongs[0]?.ringtone || storiesSongs[0]?.attributes?.preview || storiesSongs[0]?.songUrl)  
          }
        },[storiesSongs])

        React.useEffect(()=>{
          if (myFevs?.length >= 5) {
            setCurrentSong(myFevs[0]?.hub?.actions[1]?.uri || myFevs[0]?.stores?.apple?.previewurl || myFevs[0]?.ringtone || myFevs[0]?.attributes?.preview || myFevs[0]?.songUrl)   
          }
          },[fevSongs])
      
        return (
          <div
          className=' flex justify-center items-center mx-auto'>
          <div className='top-0 left-0 absolute w-full h-full object-cover bg-no-repeat'>
          <video
          loop
          muted
          className='w-full h-full object-cover ' autoPlay src="/storiesVideo4.mp4"></video>
          </div>
           <audio
           className=' sr-only'
           autoPlay
           src={currentSong}></audio>
           
           <h1
           style={{
            zIndex:99
           }}
           className=" text-center animate-slideup hover:underline lg:text-[50px] md:text-[45px] text-[35px] text-white font-semibold">
            
            #Happy New Year 2024
            <br />
<TypeAnimation
  wrapper="span"
  sequence={[`Wellcome ${session?.data?.user?.name}`]}
  className=' mt-[-30px] text-center font-bold animate-[slideup_10s] text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-indigo-300'
  repeat={1}
  cursor={false}
  speed={{type: 'keyStrokeDelayInMs', value: 170}}
/>
           </h1>
        </div>
        );
      }
    },
    {
      content: ({ action, isPaused }) => {
        const session = useSession()
        const {data:fevSongs} = useGetFevSongsQuery()
        
        //filtering only my fev songs 
        const myFevs = fevSongs?.filter((s)=>s?.userMail === session?.data?.user?.email)
        const {storiesSongs} = useSelector(state=>state.song)
        const [currentSong,setCurrentSong] = React.useState(null)
        const [songIndex,setSongIndex] = React.useState(0)
        React.useEffect(()=>{
          if (myFevs?.length < 5) {
            setCurrentSong(storiesSongs[0]?.hub?.actions[1]?.uri || storiesSongs[0]?.stores?.apple?.previewurl || storiesSongs[0]?.ringtone || storiesSongs[0]?.attributes?.preview || storiesSongs[0]?.songUrl)  
          }
        },[storiesSongs])

        React.useEffect(()=>{
          if (myFevs?.length >= 5) {
            setCurrentSong(myFevs[0]?.hub?.actions[1]?.uri || myFevs[0]?.stores?.apple?.previewurl || myFevs[0]?.ringtone || myFevs[0]?.attributes?.preview || myFevs[0]?.songUrl)   
          }
          },[fevSongs])

        const nextSong=()=>{
            if ( songIndex < storiesSongs?.slice(0,5)?.length - 1 ) {
              setCurrentSong(storiesSongs[songIndex+1]?.hub?.actions[1]?.uri || storiesSongs[songIndex+1]?.stores?.apple?.previewurl || storiesSongs[songIndex+1]?.ringtone || storiesSongs[songIndex+1]?.attributes?.preview || storiesSongs[songIndex+1]?.songUrl)
              setSongIndex( songIndex + 1)
            }
            else{
              setSongIndex(0)
              setCurrentSong(storiesSongs[0]?.hub?.actions[1]?.uri || storiesSongs[0]?.stores?.apple?.previewurl || storiesSongs[0]?.ringtone || storiesSongs[0]?.attributes?.preview || storiesSongs[0]?.songUrl) 
              
            }
          
        }

        const nextSongFev=()=>{

            if ( songIndex < myFevs?.slice(0,5)?.length - 1) {
              setCurrentSong(myFevs[songIndex+1]?.hub?.actions[1]?.uri || myFevs[songIndex+1]?.stores?.apple?.previewurl || myFevs[songIndex+1]?.ringtone || myFevs[songIndex+1]?.attributes?.preview || storiesSongs[songIndex+1]?.songUrl)
              setSongIndex( songIndex + 1)
            } 
            else{
              setSongIndex(0)
              setCurrentSong(myFevs[0]?.hub?.actions[1]?.uri || myFevs[0]?.stores?.apple?.previewurl || myFevs[0]?.ringtone || myFevs[0]?.attributes?.preview || myFevs[0]?.songUrl)
            }
        }
        return (
          <div
          className=' flex flex-col justify-center mx-auto'>
          <div className='top-0 left-0 absolute w-full h-full object-cover bg-no-repeat'>
          <video
          loop
          muted
          className='w-full h-full object-cover ' autoPlay src="/storiesVideo7.mp4"></video>
          </div>
           <audio
           onEnded={()=>{
            if (myFevs?.length < 5) {
              nextSong()  
            }
            else
            nextSongFev()
           }}
           className=' sr-only'
           autoPlay
           src={currentSong}></audio>
          
{   myFevs?.length >=5 ?
          <p className=' mt-2 mb-4 z-[100] hover:underline cursor-pointer  justify-start font-semibold text-2xl text-zinc-200'>
          #Your top songs in {' '}
          <span className=' font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-indigo-600'>
          2023
          </span>
           


          </p>:

<p className=' mt-2 mb-4 z-[100] hover:underline cursor-pointer  justify-start font-semibold text-2xl text-zinc-200'>
          #Top 5 Songs of 2K23

          </p>}
         
          <div className=' flex flex-col gap-3'>
          { myFevs?.length >= 5 && myFevs?.slice(0,5)?.map((song,id)=>(
          <Card
          onClick={()=>{
              setSongIndex(id)
          }}
          
          className=' animate-[slideup_0.5s]'
          style={{
            zIndex:999
          }}
          sx={{
            
            height:'85px',
            backdropFilter:'blur(10px)',
            background:(song?.hub?.actions[1]?.uri === currentSong || song?.stores?.apple?.previewurl === currentSong || song?.ringtone === currentSong || song?.attributes?.preview === currentSong || song?.songUrl === currentSong)?'linear-gradient(270deg, rgba(53,57,64,0.9023984593837535) 0%, rgba(13,19,29,0.9051995798319328) 99%)':'linear-gradient(90deg, rgba(71,75,82,0.5634628851540616) 0%, rgba(13,19,29,0.5718662464985995) 99%)',
            borderRadius:'10px',
            display: 'flex',width:'350px',zIndex:2,justifyContent:'space-between'}}>
          <Box sx={{ display: 'flex', flexDirection: 'column',my:'auto' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <div className=' flex gap-2 my-auto'>
                <p className=' my-auto text-yellow-50'>
                {id + 1}.
                </p>
                <div className=' flex flex-col my-auto'>
                <p className=' text-zinc-100 font-bold text-lg w-[200px] truncate'
             >
                {song?.title || song?.heading?.title || song?.attributes?.name}
              </p>
              <p
 className=' text-zinc-300 font-semibold text-base w-[200px] truncate'
>
                {song?.subtitle || song?.heading?.subtitle || song?.attributes?.composerName || song?.artist}
              </p>
                </div>
               
              </div>

            </CardContent>
          </Box>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={song?.images?.coverart || song?.images?.default || song?.imgUrl}
            alt="Live from space album cover"
          />
        </Card>
          ))}

{ myFevs?.length < 5 && storiesSongs?.slice(0,5)?.map((song,id)=>(
          <Card
          className=' animate-[slideup_0.5s]'
          sx={{
            height:'100px',
            backdropFilter:'blur(10px)',
            background:(song?.hub?.actions[1]?.uri === currentSong || song?.stores?.apple?.previewurl === currentSong || song?.ringtone === currentSong || song?.attributes?.preview === currentSong || song?.songUrl === currentSong)?'linear-gradient(270deg, rgba(53,57,64,0.9023984593837535) 0%, rgba(13,19,29,0.9051995798319328) 99%)':'linear-gradient(90deg, rgba(71,75,82,0.5634628851540616) 0%, rgba(13,19,29,0.5718662464985995) 99%)',
            borderRadius:'10px',
            display: 'flex',width:'380px',zIndex:2,justifyContent:'space-between'}}>
          <Box sx={{ display: 'flex', flexDirection: 'column',my:'auto' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <div className=' flex gap-2 my-auto'>
                <p className=' my-auto text-yellow-50'>
                {id + 1}.
                </p>
                <div className=' flex flex-col my-auto'>
                <p className=' text-zinc-100 font-bold text-lg w-[200px] truncate'
             >
                {song?.title || song?.heading?.title || song?.attributes?.name}
              </p>
              <p
 className=' text-zinc-300 font-semibold text-base w-[200px] truncate'
>
                {song?.subtitle || song?.heading?.subtitle || song?.attributes?.composerName}
              </p>
                </div>
               
              </div>

            </CardContent>
          </Box>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={song?.images?.coverart || song?.images?.default || song?.imgUrl}
            alt="Live from space album cover"
          />
        </Card>
          ))}
          </div>

        </div>
        );
      }
    },
    {
      content: ({ action, isPaused }) => {
        const {storiesSongs} = useSelector(state=>state.song)
        const {data:fevSongs} = useGetFevSongsQuery()
        const session = useSession()
        //filtering only my fev songs 
        const myFevs = fevSongs?.filter((s)=>s?.userMail === session?.data?.user?.email)
        return (
          <div
          className=' flex justify-center items-center mx-auto'>
          <div className='top-0 left-0 absolute w-full h-full object-cover bg-no-repeat'>
          <video
          loop
          muted
          className='w-full h-full object-cover ' autoPlay src="/storiesVideo7.mp4"></video>
          </div>
           <audio
           className=' sr-only'
           autoPlay
           src={myFevs[0]?.songUrl || storiesSongs[0]?.hub?.actions[1]?.uri || storiesSongs[0]?.stores?.apple?.previewurl || storiesSongs[0]?.ringtone || storiesSongs[0]?.attributes?.preview || storiesSongs[0]?.songUrl}></audio>
          <Card
          className=' animate-[slideup_0.5s]'
          sx={{
            backgroundColor:'#403939',
            borderRadius:'20px',
            display: 'flex',width:'400px',zIndex:2,justifyContent:'space-between'}}>
          <Box sx={{ display: 'flex', flexDirection: 'column',my:'auto' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <p className=' text-zinc-100 font-bold text-xl w-[200px] truncate'
             >
                {myFevs[0]?.title || storiesSongs[0]?.title || storiesSongs[0]?.heading?.title || storiesSongs[0]?.attributes?.name}
              </p>
              <p
 className=' text-zinc-300 font-semibold text-lg w-[200px] truncate'
>
                {myFevs[0]?.artist || storiesSongs[0]?.subtitle || storiesSongs[0]?.heading?.subtitle || storiesSongs[0]?.attributes?.composerName}
              </p>
            </CardContent>
          </Box>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={myFevs[0]?.imgUrl || storiesSongs[0]?.images?.coverart || storiesSongs[0]?.images?.default || storiesSongs[0]?.imgUrl }
            alt="Live from space album cover"
          />
        </Card>
        </div>
        );
      }
    },
    {
      content: ({ action, story }) => {
        const {storiesSongs} = useSelector(state=>state.song)
        const {data:fevSongs} = useGetFevSongsQuery()
        const session = useSession()
        //filtering only my fev songs 
        const myFevs = fevSongs?.filter((s)=>s?.userMail === session?.data?.user?.email)
        return (
          <div
          className=' flex justify-center items-center mx-auto'>
          <div className='top-0 left-0 absolute w-full h-full object-cover bg-no-repeat'>
          <video
          loop
          muted
          className='w-full h-full object-cover ' autoPlay src="/storiesVideo1.mp4"></video>
          </div>
           <audio
           className=' sr-only'
           autoPlay
           src={storiesSongs[1]?.hub?.actions[1]?.uri || storiesSongs[1]?.stores?.apple?.previewurl || storiesSongs[1]?.ringtone || storiesSongs[1]?.attributes?.preview || storiesSongs[1]?.songUrl || myFevs[1]?.songUrl}></audio>
          <Card
          className=' animate-[slideup_0.5s]'
          sx={{
            backgroundColor:'#403939',
            borderRadius:'20px',
            display: 'flex',width:'400px',zIndex:2,justifyContent:'space-between'}}>
          <Box sx={{ display: 'flex', flexDirection: 'column',my:'auto' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
            <p className=' text-zinc-100 font-bold text-xl w-[200px] truncate'
             >
                {storiesSongs[1]?.title || storiesSongs[1]?.heading?.title || storiesSongs[1]?.attributes?.name || myFevs[1]?.title}
              </p>
              <p
 className=' text-zinc-300 font-semibold text-lg w-[200px] truncate'
>
                {storiesSongs[1]?.subtitle || storiesSongs[1]?.heading?.subtitle || storiesSongs[1]?.attributes?.composerName || myFevs[1]?.artist}
              </p>
            </CardContent>
          </Box>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={storiesSongs[1]?.images?.coverart || storiesSongs[1]?.images?.default || storiesSongs[1]?.imgUrl || myFevs[1]?.imgUrl}
            alt="Live from space album cover"
          />
        </Card>
        </div>
        );
      },
    },
    {
      content: ({ action, isPaused }) => {
        const {storiesSongs} = useSelector(state=>state.song)
        const {data:fevSongs} = useGetFevSongsQuery()
        const session = useSession()
        //filtering only my fev songs 
        const myFevs = fevSongs?.filter((s)=>s?.userMail === session?.data?.user?.email)
        return (
          <div
          className=' flex justify-center items-center mx-auto'>
          <div className='top-0 left-0 absolute w-full h-full object-cover bg-no-repeat'>
          <video
          loop
          muted
          className='w-full h-full object-cover ' autoPlay src="/storiesVideo3.mp4"></video>
          </div>
           <audio
           className=' sr-only'
           autoPlay
           src={storiesSongs[2]?.hub?.actions[2]?.uri || storiesSongs[2]?.stores?.apple?.previewurl || storiesSongs[2]?.ringtone || storiesSongs[2]?.attributes?.preview || storiesSongs[2]?.songUrl || myFevs[2]?.songUrl}></audio>
          <Card
          className=' animate-[slideup_0.5s]'
          sx={{
            backgroundColor:'#403939',
            borderRadius:'20px',
            display: 'flex',width:'400px',zIndex:2,justifyContent:'space-between'}}>
          <Box sx={{ display: 'flex', flexDirection: 'column',my:'auto' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
            <p className=' text-zinc-100 font-bold text-xl w-[200px] truncate'
             >
                {storiesSongs[2]?.title || storiesSongs[2]?.heading?.title || storiesSongs[2]?.attributes?.name || myFevs[2]?.title}
              </p>
              <p
 className=' text-zinc-300 font-semibold text-lg w-[200px] truncate'
>
                {storiesSongs[2]?.subtitle || storiesSongs[2]?.heading?.subtitle || storiesSongs[2]?.attributes?.composerName || myFevs[2]?.artist}
              </p>
            </CardContent>
          </Box>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={storiesSongs[2]?.images?.coverart || storiesSongs[2]?.images?.default || storiesSongs[2]?.imgUrl || myFevs[2]?.imgUrl}
            alt="Live from space album cover"
          />
        </Card>
        </div>
        );
      }
    },
    {
      content: ({ action, isPaused }) => {
        const {storiesSongs} = useSelector(state=>state.song)
        const {data:fevSongs} = useGetFevSongsQuery()
        const session = useSession()
        //filtering only my fev songs 
        const myFevs = fevSongs?.filter((s)=>s?.userMail === session?.data?.user?.email)
        
        return (
          <div
          className=' flex justify-center items-center mx-auto'>
          <div className='top-0 left-0 absolute w-full h-full object-cover bg-no-repeat'>
          <video
          loop
          muted
          className='w-full h-full object-cover ' autoPlay src="/storiesVideo4.mp4"></video>
          </div>
           <audio
           className=' sr-only'
           autoPlay
           src={storiesSongs[3]?.hub?.actions[3]?.uri || storiesSongs[3]?.stores?.apple?.previewurl || storiesSongs[3]?.ringtone || storiesSongs[3]?.attributes?.preview || storiesSongs[3]?.songUrl || myFevs[3]?.songUrl}></audio>
          <Card 
          className=' animate-[slideup_0.5s]'
          sx={{
            backgroundColor:'#403939',
            borderRadius:'20px',
            display: 'flex',width:'400px',zIndex:2,justifyContent:'space-between'}}>
          <Box sx={{ display: 'flex', flexDirection: 'column',my:'auto' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
            <p className=' text-zinc-100 font-bold text-xl w-[200px] truncate'
             >
                {storiesSongs[3]?.title || storiesSongs[3]?.heading?.title || storiesSongs[3]?.attributes?.name || myFevs[3]?.title}
              </p>
              <p
 className=' text-zinc-300 font-semibold text-lg w-[200px] truncate'
>
                {storiesSongs[3]?.subtitle || storiesSongs[3]?.heading?.subtitle || storiesSongs[3]?.attributes?.composerName || myFevs[3]?.artist}
              </p>
            </CardContent>
          </Box>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={storiesSongs[3]?.images?.coverart || storiesSongs[3]?.images?.default || storiesSongs[3]?.imgUrl || myFevs[3]?.imgUrl}
            alt="Live from space album cover"
          />
        </Card>
        </div>
        );
      }
    },
    {
      content: ({ action, isPaused }) => {
        const {storiesSongs} = useSelector(state=>state.song)
        const {data:fevSongs} = useGetFevSongsQuery()
        const session = useSession()
        //filtering only my fev songs 
        const myFevs = fevSongs?.filter((s)=>s?.userMail === session?.data?.user?.email)
        
        return (
          <div
          className=' flex justify-center items-center mx-auto'>
          <div className='top-0 left-0 absolute w-full h-full object-cover bg-no-repeat'>
          <video
          loop
          muted
          className='w-full h-full object-cover ' autoPlay src="/storiesVideo5.mp4"></video>
          </div>
           <audio
           className=' sr-only'
           autoPlay
           src={storiesSongs[4]?.hub?.actions[4]?.uri || storiesSongs[4]?.stores?.apple?.previewurl || storiesSongs[4]?.ringtone || storiesSongs[4]?.attributes?.preview || storiesSongs[4]?.songUrl || myFevs[4]?.songUrl}></audio>
          <Card
          className=' animate-[slideup_0.5s]'
          sx={{
            backgroundColor:'#403939',
            borderRadius:'20px',
            display: 'flex',width:'400px',zIndex:2,justifyContent:'space-between'}}>
          <Box sx={{ display: 'flex', flexDirection: 'column',my:'auto' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
            <p className=' text-zinc-100 font-bold text-xl w-[200px] truncate'
             >
                {storiesSongs[4]?.title || storiesSongs[4]?.heading?.title || storiesSongs[4]?.attributes?.name || myFevs[4]?.title}
              </p>
              <p
 className=' text-zinc-300 font-semibold text-lg w-[200px] truncate'
>
                {storiesSongs[4]?.subtitle || storiesSongs[4]?.heading?.subtitle || storiesSongs[4]?.attributes?.composerName || myFevs[4]?.artist}
              </p>
            </CardContent>
          </Box>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={storiesSongs[4]?.images?.coverart || storiesSongs[4]?.images?.default || storiesSongs[4]?.imgUrl || myFevs[4]?.imgUrl}
            alt="Live from space album cover"
          />
        </Card>
        </div>
        );
      }
    },

  ];

  const image = {
    display: "block",
    width: "100%",
    borderRadius: 4
  };
  
  const contentStylestoryback = {
    background: "black",
    width: "100%",
    padding: 20,
    color: "white"
  };
  
  const code = {
    background: "#eee",
    padding: "5px 10px",
    borderRadius: "4px",
    color: "#333"
  };
  
  const contentStyle = {
    background: "salmon",
    width: "100%",
    padding: 20,
    color: "white"
  };
  
  const customSeeMore = {
    textAlign: "center",
    fontSize: 14,
    bottom: 20,
    position: "relative"
  };