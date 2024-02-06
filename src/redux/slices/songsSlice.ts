'use client';

import { createSlice } from '@reduxjs/toolkit'

import Arijit from '../../app/assets/image/Indian Artist/Arijit_Singh.jpg'
import AR from '../../app/assets/image/Indian Artist/AR_Rahman.jpg'
import Dev from '../../app/assets/image/Indian Artist/Devi_Sri_Prasad.jpg'
import Sraya from '../../app/assets/image/Indian Artist/Shreya_Ghoshal.jpg'
import Pritam from '../../app/assets/image/Indian Artist/Pritam_Chakraborty.jpg'
import Jubin from '../../app/assets/image/Indian Artist/Jubin_Nautiyal.jpg'
import Dhvani from '../../app/assets/image/Indian Artist/Dhvani_Bhanushali.jpg'
import Armaan from '../../app/assets/image/Indian Artist/Armaan_Malik.jpg'
import Tulsi from '../../app/assets/image/Indian Artist/Tulsi_Kumar.jpg'
import Darshan from '../../app/assets/image/Indian Artist/Darshan_Raval.jpg'
import Badshah from '../../app/assets/image/Indian Artist/Badshah.jpg'
import Neha from '../../app/assets/image/Indian Artist/Neha-Kakkar.jpg'
import Atif from '../../app/assets/image/Indian Artist/Atif-Aslam.jpg'

const initialState = {
   artists :
   [
    {
      checked: false,
      id:'artist_1',
      name: 'Arijit Singh', image: `${Arijit}`
  
    },
    {
      checked: false,
      id:'artist_2',
      name: 'AR Rahman', image: `${AR}`
    },
    {
      checked: false,
      id:'artist_3',
      name: 'Shreya Ghoshal', image: `${Sraya}`
    },
    {
      checked: false,
      id:'artist_4',
      name: 'Devi Sri Prasad', image: `${Dev}`
    },
    {
      checked: false,
      id:'artist_5',
      name: 'Pritam Chakraborty', image: `${Pritam}`
    },
    {
      checked: false,
      id:'artist_6',
      name: 'Badshah', image: `${Badshah}`
    },
    {
      checked: false,
      id:'artist_7',
      name: 'Jubin Nautial', image: `${Jubin}`
    },
    {
      checked: false,
      id:'artist_8',
      name: 'Tulsi Kumar', image: `${Tulsi}`
    },
    {
      checked: false,
      id:'artist_9',
      name: 'Darshan Raval', image: `${Darshan}`
    },
    {
      checked: false,
      id:'artist_10',
      name: 'Armaan Malik', image: `${Armaan}`
    },
    {
      checked: false,
      id:'artist_11',
      name: 'Dhvani Bhanushali', image: `${Dhvani}`
    },
    {
      checked: false,
      id:'artist_12',
      name: 'Neha Kakkar', image: `${Neha}`
    },
    {
      checked: false,
      id:'artist_13',
      name: 'Atif Aslam', image: `${Atif}`
    },
    {
      checked: false,
      id:'artist_14',
      name: 'Hemant Kumar ', image: 'https://i.scdn.co/image/ab67616d0000b273d3c5a4cc32d36042dfa8c7a1'
    },
    {
      checked: false,
      id:'artist_15',
      name: 'Manna Dey', image: 'https://i.scdn.co/image/ab67616d0000b273c8b3a54723d08bf3f52696f6'
    },
    {
      checked: false,
      id:'artist_16',
      name: 'Kumar Sanu', image: 'https://i.scdn.co/image/ab6761610000e5ebdd546aa61ed7b95b04b4d8c3'
    },
    {
      checked: false,
      id:'artist_17',
      name: 'Shyamal Mitra', image: 'https://i.scdn.co/image/ab67616d0000b2738a7556dafadd71ba7837609f'
    },
    {
      checked: false,
      id:'artist_18',
      name: 'Lata Mangeshkar', image: 'https://i.scdn.co/image/ab67616d00001e02dcaf44c45130b1cd89cc9215'
    },
    {
      checked: false,
      id:'artist_19',
      name: 'R. D. Burman', image: 'https://i.scdn.co/image/ab67616d00001e021fc21bc762921ee9369e3fa4'
    },
    {
      checked: false,
      id:'artist_20',
      name: 'Bappi Lahiri', image: 'https://i.scdn.co/image/ab67616d00001e0275904113f4d7119d348e3f3e'
    },
    {
      checked: false,
      id:'artist_21',
      name: 'Srikanto Acharya', image: 'https://i.scdn.co/image/ab6761610000e5eb679bcc7530b716799f884d03'
    },
    {
      checked: false,
      id:'artist_22',
      name: 'Haimanti Sukla', image: 'https://i.scdn.co/image/ab67616d00001e02c8162e89e9fa626b8ae92b3c'
    },
    {
      checked: false,
      id:'artist_23',
      name: 'Asha Bhosle', image: 'https://i.scdn.co/image/ab67616d0000b273581631948454302baafce9b8'
    },
    {
      checked: false,
      id:'artist_24',
      name: 'Bhupen Hazarika', image: 'https://i.scdn.co/image/ab67616d0000b27393774fb7d8d0d0f1db05087d'
    }
  ],
  isPlaying:true,
  storiesSongs:[],
  showDetails:false,
  music:{
    title:'',
    imgUrl:'',
    uesrMail:'',
    songUrl:''
  }, 
  songMapId:0,
    input:'',
    searchTerm:'Bollywood',
    keysearchTerm:'',
    scrollValue:0,
    showNavborder:false,
    showSearchResults:false,
    artistData:'',
    apiArtistData:'',
    isLoading:false,
    activeSongArr:[],
    activeSongId:null,
    activeSong:{
    id:'',
    title:'',
    imgUrl:'',
    artist:'',
    songUrl:''
    },
    apiArtistId:'',
    playlistData:{
      title:'',
      desc:'',
      userMail:''
    },
 
    playlistName:'Home',
    // the song data which is wanted to add to the playlist
    playlistSongData:{
      id:'',
      playlistId:'',
      userMail:'',
      title:'',
      imgUrl:'',
      artist:'',
      songUrl:''
    },
    likedSongData:{
      id:'',
      userMail:'',
      title:'',
      imgUrl:'',
      artist:'',
      songUrl:''
    },
    activeSongData:{
      id:'',
      playlistId:'',
      userMail:'',
      title:'',
      imgUrl:'',
      artist:'',
      songUrl:''
    }
}

export const songsSlice = createSlice({
    //from react component by this name the states are called
  name: 'song',
  initialState,
  reducers: {

// setTopSongs: (state,action) => {
//   state.topSongs=action.payload
//   },
setShowDetails:(state,action)=>{
  state.showDetails = action.payload
},
setStoriesSongs:(state,action)=>{
  state.storiesSongs = action.payload
},
setIsplaying:(state,action)=>{
  state.isPlaying = action.payload
},
setScrollValue: (state,action) => {
  state.scrollValue=action.payload
  },
  setShowNavBorder: (state,action) => {
    state.scrollValue=action.payload
    },
    setShowSearchResults: (state,action) => {
      state.showSearchResults=action.payload
      },
      setInput:(state,action)=>{
        state.input = action.payload
      },
      setApiArtistId: (state,action) => {
        state.apiArtistId=action.payload
        },
    setArtistData: (state,action) => {
      state.artistData=action.payload
      },
      setMusic: (state,action) => {
        state.music=action.payload
        },
      setPlaylistName: (state,action) => {
        state.playlistName=action.payload
        },
      setActiveSongData: (state,action) => {
        state.activeSongData=action.payload
        },
      setApiArtistData: (state,action) => {
        state.apiArtistData=action.payload
        },
        setPlaylistData: (state,action) => {
          state.playlistData=action.payload
          },
          setPlaylistSongData: (state,action) => {
            state.playlistSongData=action.payload
            },
            setLikedSongData: (state,action) => {
              state.likedSongData=action.payload
              },
              setKeySearchTerm: (state,action) => {
                state.keysearchTerm=action.payload
                },

                setActiveSongsArray: (state,action)=>{
                  state.activeSongArr = action.payload 
                },

                setSongMapId: (state,action) => {
                  state.songMapId=action.payload
                  },

                //next song 
                setnextSong:(state,action)=>{
                  //action.payload is song mapId
                  state.songMapId = action.payload
                  if (action.payload < state.activeSongArr?.length -1) {
                  state.activeSong.id =   state.activeSongArr[action.payload + 1]?.id ||  state.activeSongArr[action.payload + 1]?.key
                  state.activeSong.artist =  state.activeSongArr[action.payload + 1]?.subtitle ||
                   state.activeSongArr[action.payload + 1]?.heading?.subtitle ||
                   state.activeSongArr[action.payload + 1]?.attributes?.composerName ||
                   state.activeSongArr[action.payload + 1]?.artist
                   state.activeSong.title = state.activeSongArr[action.payload + 1]?.title || state.activeSongArr[action.payload + 1]?.heading?.title || state.activeSongArr[action.payload + 1]?.attributes?.name
                   state.activeSong.imgUrl = state.activeSongArr[action.payload + 1]?.images?.coverart || state.activeSongArr[action.payload + 1]?.images?.default || state.activeSongArr[action.payload + 1]?.imgUrl
                   state.activeSong.songUrl = state.activeSongArr[action.payload + 1]?.hub?.actions[1]?.uri || state.activeSongArr[action.payload + 1]?.stores?.apple?.previewurl || state.activeSongArr[action.payload + 1]?.ringtone || state.activeSongArr[action.payload + 1]?.attributes?.preview || state.activeSongArr[action.payload + 1]?.attributes?.previews[0]?.url || state.activeSongArr[action.payload + 1]?.songUrl
                   
                   state.songMapId ++ 
                }
                  else{
                    state.songMapId = 0
                    
                    state.activeSong.id = state.activeSongArr[0]?.id ||  state.activeSongArr[0]?.key
                    state.activeSong.artist =  state.activeSongArr[0]?.subtitle ||
                     state.activeSongArr[0]?.heading?.subtitle ||
                     state.activeSongArr[0]?.attributes?.composerName ||
                     state.activeSongArr[0]?.artist
                     state.activeSong.title = state.activeSongArr[0]?.title || state.activeSongArr[0]?.heading?.title || state.activeSongArr[0]?.attributes?.name
                     state.activeSong.imgUrl = state.activeSongArr[0]?.images?.coverart || state.activeSongArr[0]?.images?.default || state.activeSongArr[0]?.imgUrl
                     state.activeSong.songUrl = state.activeSongArr[0]?.hub?.actions[1]?.uri || state.activeSongArr[0]?.stores?.apple?.previewurl || state.activeSongArr[0]?.ringtone || state.activeSongArr[0]?.attributes?.preview || state.activeSongArr[0]?.attributes?.previews[0]?.url || state.activeSongArr[0]?.songUrl
                    // state.songMapId ++ 

                  }
                },
                //Prev song
                setnprevSong:(state,action)=>{
                  //action.payload is song mapId
                  state.songMapId = action.payload
                  if (action.payload > 0 && action.payload <= state.activeSongArr?.length -1) {
                  state.activeSong.id =  state.activeSongArr[action.payload - 1]?.id ||  state.activeSongArr[action.payload - 1]?.key
                  state.activeSong.artist =  state.activeSongArr[action.payload - 1]?.subtitle ||
                   state.activeSongArr[action.payload - 1]?.heading?.subtitle ||
                   state.activeSongArr[action.payload - 1]?.attributes?.composerName ||
                   state.activeSongArr[action.payload - 1]?.artist
                   state.activeSong.title = state.activeSongArr[action.payload - 1]?.title || state.activeSongArr[action.payload - 1]?.heading?.title || state.activeSongArr[action.payload - 1]?.attributes?.name
                   state.activeSong.imgUrl = state.activeSongArr[action.payload - 1]?.images?.coverart || state.activeSongArr[action.payload - 1]?.images?.default || state.activeSongArr[action.payload - 1]?.imgUrl
                   state.activeSong.songUrl = state.activeSongArr[action.payload - 1]?.hub?.actions[1]?.uri || state.activeSongArr[action.payload - 1]?.stores?.apple?.previewurl || state.activeSongArr[action.payload - 1]?.ringtone || state.activeSongArr[action.payload - 1]?.attributes?.preview || state.activeSongArr[action.payload - 1]?.attributes?.previews[0]?.url || state.activeSongArr[action.payload - 1]?.songUrl
                   
                   state.songMapId -- 
                }
                  else{
                    state.songMapId = state.activeSongArr?.length
                    
                    state.activeSong.id = state.activeSongArr[state.activeSongArr?.length -1]?._id ||  state.activeSongArr[state.activeSongArr?.length -1]?.id ||  state.activeSongArr[state.activeSongArr?.length -1]?.key
                    state.activeSong.artist =  state.activeSongArr[state.activeSongArr?.length -1]?.subtitle ||
                     state.activeSongArr[state.activeSongArr?.length -1]?.heading?.subtitle ||
                     state.activeSongArr[state.activeSongArr?.length -1]?.attributes?.composerName ||
                     state.activeSongArr[state.activeSongArr?.length -1]?.artist
                     state.activeSong.title = state.activeSongArr[state.activeSongArr?.length -1]?.title || state.activeSongArr[state.activeSongArr?.length -1]?.heading?.title || state.activeSongArr[state.activeSongArr?.length -1]?.attributes?.name
                     state.activeSong.imgUrl = state.activeSongArr[state.activeSongArr?.length -1]?.images?.coverart || state.activeSongArr[state.activeSongArr?.length -1]?.images?.default || state.activeSongArr[state.activeSongArr?.length -1]?.imgUrl
                     state.activeSong.songUrl = state.activeSongArr[state.activeSongArr?.length -1]?.hub?.actions[1]?.uri || state.activeSongArr[state.activeSongArr?.length -1]?.stores?.apple?.previewurl || state.activeSongArr[state.activeSongArr?.length -1]?.ringtone || state.activeSongArr[state.activeSongArr?.length -1]?.attributes?.preview || state.activeSongArr[state.activeSongArr?.length -1]?.attributes?.previews[state.activeSongArr?.length -1]?.url || state.activeSongArr[state.activeSongArr?.length -1]?.songUrl
                    state.songMapId --

                  }
                },
  

      setUpdatedArtistArr: (state, action) => {
      const {id} = action.payload
        return{
          ...state,
         artists :state.artists?.map((item,index) => 
{
  return id === item?.id ?{
    ...item,
    checked:!item.checked
  }:
  item
}
         ) 
        }
  
        },
    setSearchTerm: (state,action) => {
        state.searchTerm=action.payload
        },
    startLoading: (state) => {
        state.isLoading=true
        },
        endLoading: (state) => {
            state.isLoading=false
            },
    setActiveSongId: (state,action) => {
        state.activeSongId=action.payload
        },
        setActiveSong: (state,action) => {
            state.activeSong=action.payload
            },
    

  },
})

// Action creators are generated for each case reducer function
export const {setStoriesSongs,setShowDetails,setInput,setIsplaying,setSongMapId,setApiArtistId,setnextSong,setnprevSong,setActiveSongsArray,setShowSearchResults,setShowNavBorder,setScrollValue,setActiveSong,setLikedSongData,setMusic,setActiveSongData,setPlaylistName,setPlaylistSongData,setPlaylistData,setArtistData,setApiArtistData,setUpdatedArtistArr,setSearchTerm,startLoading,endLoading,setActiveSongId,setKeySearchTerm} = songsSlice.actions

export default songsSlice.reducer