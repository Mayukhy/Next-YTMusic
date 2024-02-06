'use client'
import Arijit from './image/Indian Artist/Arijit_Singh.jpg'
import AR from './image/Indian Artist/AR_Rahman.jpg'
import Dev from './image/Indian Artist/Devi_Sri_Prasad.jpg'
import Sraya from './image/Indian Artist/Shreya_Ghoshal.jpg'
import Pritam from './image/Indian Artist/Pritam_Chakraborty.jpg'
import Jubin from './image/Indian Artist/Jubin_Nautiyal.jpg'
import Dhvani from './image/Indian Artist/Dhvani_Bhanushali.jpg'
import Armaan from './image/Indian Artist/Armaan_Malik.jpg'
import Tulsi from './image/Indian Artist/Tulsi_Kumar.jpg'
import Darshan from './image/Indian Artist/Darshan_Raval.jpg'
import Badshah from './image/Indian Artist/Badshah.jpg'
import Neha from './image/Indian Artist/Neha-Kakkar.jpg'
import Atif from './image/Indian Artist/Atif-Aslam.jpg'
import discover from './image/discover.png'
import singer from './image/singer.png'
import song from './image/song.png'
import { useState } from 'react'


export const genres = [
  { title: 'Pop', value: 'POP' },
  { title: 'Hip-Hop', value: 'HIP_HOP_RAP' },
  { title: 'Dance', value: 'DANCE' },
  { title: 'Electronic', value: 'ELECTRONIC' },
  { title: 'Soul', value: 'SOUL_RNB' },
  { title: 'Alternative', value: 'ALTERNATIVE' },
  { title: 'Rock', value: 'ROCK' },
  { title: 'Latin', value: 'LATIN' },
  { title: 'Film', value: 'FILM_TV' },
  { title: 'Country', value: 'COUNTRY' },
  { title: 'Worldwide', value: 'WORLDWIDE' },
  { title: 'Reggae', value: 'REGGAE_DANCE_HALL' },
  { title: 'House', value: 'HOUSE' },
  { title: 'K-Pop', value: 'K_POP' },
];
export const [artists,setArtists] =

useState([
  {
    checked: false,

    name: 'Arijit Singh', image: `${Arijit}`

  },
  {
    checked: false,

    name: 'AR Rahman', image: `${AR}`
  },
  {
    checked: false,

    name: 'Shreya Ghoshal', image: `${Sraya}`
  },
  {
    checked: false,

    name: 'Devi Sri Prasad', image: `${Dev}`
  },
  {
    checked: false,

    name: 'Pritam Chakraborty', image: `${Pritam}`
  },
  {
    checked: false,

    name: 'Badshah', image: `${Badshah}`
  },
  {
    checked: false,

    name: 'Jubin Nautial', image: `${Jubin}`
  },
  {
    checked: false,

    name: 'Tulsi Kumar', image: `${Tulsi}`
  },
  {
    checked: false,

    name: 'Darshan Raval', image: `${Darshan}`
  },
  {
    checked: false,

    name: 'Armaan Malik', image: `${Armaan}`
  },
  {
    checked: false,

    name: 'Dhvani Bhanushali', image: `${Dhvani}`
  },
  {
    checked: false,

    name: 'Neha Kakkar', image: `${Neha}`
  },
  {
    checked: false,

    name: 'Atif Aslam', image: `${Atif}`
  },
  {
    checked: false,

    name: 'Hemant Kumar ', image: 'https://i.scdn.co/image/ab67616d0000b273d3c5a4cc32d36042dfa8c7a1'
  },
  {
    checked: false,

    name: 'Manna Dey', image: 'https://i.scdn.co/image/ab67616d0000b273c8b3a54723d08bf3f52696f6'
  },
  {
    checked: false,

    name: 'Kumar Sanu', image: 'https://i.scdn.co/image/ab6761610000e5ebdd546aa61ed7b95b04b4d8c3'
  },
  {
    checked: false,

    name: 'Shyamal Mitra', image: 'https://i.scdn.co/image/ab67616d0000b2738a7556dafadd71ba7837609f'
  },
  {
    checked: false,

    name: 'Lata Mangeshkar', image: 'https://i.scdn.co/image/ab67616d00001e02dcaf44c45130b1cd89cc9215'
  },
  {
    checked: false,

    name: 'R. D. Burman', image: 'https://i.scdn.co/image/ab67616d00001e021fc21bc762921ee9369e3fa4'
  },
  {
    checked: false,

    name: 'Bappi Lahiri', image: 'https://i.scdn.co/image/ab67616d00001e0275904113f4d7119d348e3f3e'
  },
  {
    checked: false,

    name: 'Srikanto Acharya', image: 'https://i.scdn.co/image/ab6761610000e5eb679bcc7530b716799f884d03'
  },
  {
    checked: false,

    name: 'Haimanti Sukla', image: 'https://i.scdn.co/image/ab67616d00001e02c8162e89e9fa626b8ae92b3c'
  },
  {
    checked: false,

    name: 'Asha Bhosle', image: 'https://i.scdn.co/image/ab67616d0000b273581631948454302baafce9b8'
  },
  {
    checked: false,

    name: 'Bhupen Hazarika', image: 'https://i.scdn.co/image/ab67616d0000b27393774fb7d8d0d0f1db05087d'
  }
]);

export const NostralgicArtist = [

];

export const links = [
  {
    checked: false,

    name: 'Discover', to: '/discover', icon: `${discover}`
  },
  {
    checked: false,

    name: 'Top Artists', to: '/top-artists', icon: `${singer}`
  },
  {
    checked: false,

    name: 'Top Charts', to: '/top-charts', icon: `${song}`
  },
];
export const stockWorldchats = [
  { image: 'https://cdn.modemoxie.com/storage/posts/2022/05/6296a0f58a3ba.jpg', id: '1' },
  { image: 'https://townsquare.media/site/295/files/2021/05/SecondLife.jpg?w=980&q=75', id: '2' },
  { image: 'https://www.rollingstone.com/wp-content/uploads/2018/06/rs-100-songs-70a38f30-ced8-4dd8-bdf5-e660e77accf0.jpg?w=1581&h=1054&crop=1', id: '3' },
  { image: 'https://pyxis.nymag.com/v1/imgs/7e3/e4f/a79402462e2e60f8991e7528a024706d82-12-eoy-songs.rhorizontal.w1100.jpg', id: '4' },
  { image: 'https://i.redd.it/849l4laufmt11.png', id: '5' },
  { image: 'https://external-preview.redd.it/TLTe5XjgCiBG1AZnlfHY5zHVycGEAahx7Plstd9DC58.jpg?width=640&crop=smart&auto=webp&s=a8f4365de2a18a5d3dfddaa61d7e959d81dfe245', id: '6' },
  { image: 'https://www.getintothis.co.uk/wp-content/uploads/2015/12/100-1.jpg', id: '7' },
  { image: 'https://elderhsquill.org/wp-content/uploads/2018/10/Albums-e1539565942145-900x663.png', id: '8' },
  { image: 'https://i.redd.it/qu2p7mejy6e71.jpg', id: '9' },
  { image: 'https://townsquare.media/site/812/files/2020/05/Illustrated-album-covers.jpg?w=1200', id: '10' }
]
export default artists