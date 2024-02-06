'use client'
import React,{useEffect,useState} from 'react'
import SignInButton from './SignInButton'
import { signIn, useSession,signOut } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { motion } from 'framer-motion';
import axios from 'axios';
import { Avatar, Button } from '@radix-ui/themes';
import Searchfield from './searchBar/Searchfield';
import { setScrollValue, setShowNavBorder } from '@/redux/slices/songsSlice';
import { useDispatch, useSelector } from 'react-redux';


export default function Navber() {
  const router = useRouter()
  const session = useSession()
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const {scrollValue,showNavborder} = useSelector(state=>state.song)
  
  useEffect(()=>{
    console.log(showNavborder,scrollValue)
  },[scrollValue])

  //getting all users
  useEffect(() => {
    const getUsers = async () => {
        await axios.get('/api/users').then(({ data }) => {
          setAllUsers(data)}); 
    }
    getUsers();
  }, []);

  //myself
  const me= allUsers?.find((user)=>user?.email === session?.data?.user?.email)

  useEffect(() => {
    if (session?.status !== 'authenticated') {
      router.push('/')
    }
  }, [session?.status,router]);

      // for Social login
      const socialAction = (action) => {
        signIn(action, { redirect: false })
      } 
      const dispatch = useDispatch()

    //   const controlNavber = ()=>{
    //       if (window.scrollY > 3) {
    //         if (window.scrollY > scrollValue) {
    //          dispatch(setShowNavBorder(false))
    //         }
    //     dispatch(setScrollValue(window.scrollY))
    //   }
    //   if (window.scrollY < 3) {
    //       if (window.scrollY < scrollValue) {
    //         dispatch(setShowNavBorder(true))
    //       }
    //   dispatch(setScrollValue(window.scrollY))
    // }
    //   }
    //   useEffect(()=>{
    //       window.addEventListener('scroll',controlNavber)
    //       return ()=>{
    //         window.removeEventListener('scroll',controlNavber)
    //       }
    //       },[scrollValue,showNavborder])
      
    //       useEffect(()=>{
    //        window.scrollTo(0,0)
    //       },[])

        
    

  return (
<div
style={{
  zIndex:99999999999999
}}
className={ scrollValue>10?'bg-black shadow-zinc-600 shadow-sm py-3 animate-[slidedown_0.4s] flex justify-between backdrop-blur-sm px-3 md:px-6 top-0 w-screen':'bg-black border-none py-3 animate-[slidedown_0.4s] flex justify-between backdrop-blur-sm px-3 md:px-6 top-0 w-screen'}>
      

      <div
      onClick={()=>router.push('/')}
      className=' flex gap-3 cursor-pointer'>
      <Avatar width='50px' height='50px'  className=' w-[40px] h-[40px] md:my-auto my-2' src='/logo.png'></Avatar>
    <p className=' xl:block hidden font-semibold text-indigo-50 my-auto'>MTmusic</p>
      </div>
        <Searchfield/>
 
      
    { !session?.data ?
    < div className=' ml-3 flex gap-2'>
    <SignInButton socialAction={socialAction}/>

    </div>
  :
  <div className=' flex gap-2 my-auto'>
   
    <div
    onClick={()=>router.push('/profile')}
    className=' relative my-auto cursor-pointer'>
        <Avatar
        size='2'
        src={me?.image} alt={me?.name} />
        </div>

    {/* <p className=' my-auto text-sm text-gray-300'>{session?.data?.user?.name}</p> */}
    <Button
    
    onClick={() =>signOut()} variant='surface' color='crimson' >
    Log Out
  </Button>
{ session?.data?.user?.email === 'rohandanu18@gmail.com' &&
  <motion.div
            whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.8 }} 
            initial={{ scale: 0 }}
            animate={{ rotate: 360, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
            className=' xl:block hidden'
  
  >
  </motion.div>}

  </div>  
  }
    </div>
    
  )
}
