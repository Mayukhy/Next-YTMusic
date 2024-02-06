//Query and  mutation   fom this application

import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


export const mtMusicAPI = createApi({
    reducerPath: 'mtMusic',
    baseQuery : fetchBaseQuery({
        baseUrl:'http://localhost:3000/api',
        credentials: 'include',
        tagTypes:['Users','playlists','likedsongs','aimusics','playlistSongs']
       
  
    }),
    endpoints:(builder)=>({

  getUsers: builder.query({query:
    ()=>({
       
      url: 'users',
      method:'GET'
   }),
   providesTags:['Users']
}) ,

//getting user's ai generations 
getUser: builder.query({query:
  (id)=>({
     
    url: `users/generations/${id}`,
    method:'GET'
 }),
 providesTags:['Users']
}) ,

//get user by id
getsingleUser: builder.query({query:
  (id)=>({
     
    url: `users/${id}`,
    method:'GET'
 }),
 providesTags:['Users']
}) ,

//get user by mail
getUserBymail: builder.query({query:
  (id)=>({
     
    url: `users/getbyMail/${id}`,
    method:'GET'
 }),
 providesTags:['Users']
}) ,
//getting userSubcribtion atatus means no of free genaration
getFreetearResults: builder.query({query:
  ()=>({
     
    url: 'apiLimit',
    method:'GET'
 }),
//  providesTags:['Users']
}) ,

//getting liked Songs
getLikedSongs: builder.query({query:
  ()=>({
     
    url: 'likedsongs',
    method:'GET'
 }),
 providesTags:['likedsongs']
}) ,

//getting fevSongs to show like spotify wrapped
getFevSongs: builder.query({query:
  ()=>({
     
    url: 'fevSongs',
    method:'GET'
 }),
//  providesTags:['Users']
}) ,

//getting allplaylists
getplaylists: builder.query({query:
  ()=>({
     
    url: 'playlist',
    method:'GET'
 }),
 providesTags:['playlists']
}) ,

//getting playlist Songs
getplaylistSongs: builder.query({query:
  ()=>({
     
    url: 'addtoPlaylist',
    method:'GET'
 }),
 providesTags:['playlistSongs']
}) ,

//get user playlist
getplaylist: builder.query({query:
  (id)=>({
     
    url: `playlist/${id}`,
    method:'GET'
 }),
 providesTags:['playlists']
}) ,

//get aimusic
getAImusic: builder.query({query:
  ()=>({
     
    url: 'aiMusic',
    method:'GET'
 }),
 providesTags:['aimusics']
}) ,


//updating(add) fevArtist array of a specific user
addFevArtists:builder.mutation({
  query:(id)=>{
     return {
          headers:{
              'Content-type' : 'application/json',
          },
          url:`users/${id}`,
          method:'PUT',

      }
  },
  invalidatesTags:['Users']
}),

//updating(remove) fevArtist array of a specific user
removeFevArtists:builder.mutation({
  query:(id)=>{
     return {
          headers:{
              'Content-type' : 'application/json',
          },
          url:`users/update/${id}`,
          method:'PUT',

      }
  },
  invalidatesTags:['Users']
}),

//getting single artist
getArtist: builder.query({query:
  (id)=>({
     
    url: `artists/${id}`,
    method:'GET'
 }),
}) ,
getfevArtists: builder.query({query:
  (id)=>({
    url: `artists/fevArtists/${id}`,
    method:'GET'
 }),
 providesTags:['Users']
}) ,
// getSearchedUsers: builder.query({query:
//     (searchTerm)=>({
       
//       url: `users/search/${searchTerm}`,
//       method:'GET'
//    }),
   
// }) ,
     
          
   }),
    
});

export const {
useGetsingleUserQuery,
useGetUserBymailQuery,
useGetUsersQuery,
useGetUserQuery,
// useGetSearchedUsersQuery
useGetfevArtistsQuery,
useAddFevArtistsMutation,
useRemoveFevArtistsMutation,
useGetArtistQuery,
useGetplaylistQuery,
useGetplaylistsQuery,
useGetplaylistSongsQuery,
useGetAImusicQuery,
useGetLikedSongsQuery,
useGetFevSongsQuery,
useGetFreetearResultsQuery

}=mtMusicAPI;

