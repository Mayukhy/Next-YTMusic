'use client'

import DetailHeader from '@/components/artistDetail/DetailHeader';
import ArtistSongs from '@/components/artistSongs/ArtistSongs';
import { useGetArtistQuery } from '@/redux/api/api';
import { setApiArtistData, setArtistData } from '@/redux/slices/songsSlice';
import instance from '@/swazamapi/instance';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps): JSX.Element {
  const { artistData, apiArtistData } = useSelector((state) => state.song);
  const dispatch = useDispatch();
  const { id } = params;
  const { data: selectedArtist } = useGetArtistQuery(id);


  //searching the artist on the basis of artistname
  // useEffect(() => {
  //   const getArtistData = async () => {
  //     await instance
  //       .get(`/search?term=${selectedArtist?.name}&limit=5`)
  //       .then(({ data }) => {
  //         console.log(data);
  //         dispatch(setArtistData(data?.artist?.hits[0]?.artist));
  //       })
  //       .catch((error)=>alert(error))
  //   };
  //   getArtistData();
  // }, [id, selectedArtist]);

  //getting the artist data by artistId directly
  useEffect(() => {
    if (artistData) {
      const getArtistData = async () => {
        await instance
          .get(`/artist/get-details?id=${artistData?.adam_id}`)
          .then(({ data }) => {
            dispatch(setApiArtistData(data?.data[0]?.attributes));
          });
      };
      getArtistData();
    }
  }, [id, artistData]);

  console.log('selected artist is', selectedArtist);
  console.log('artist searchData', artistData);
  console.log('artist Api data is', apiArtistData);

  return (
    <div className=' bg-black min-h-screen flex flex-col w-full '>
<DetailHeader selectedArtist={selectedArtist}/>
<ArtistSongs artistData={artistData}/>
<br /><br />
    </div>
  );
}