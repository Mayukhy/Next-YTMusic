import * as React from 'react';

import Skeleton from '@mui/joy/Skeleton';
import { Audio } from  'react-loader-spinner'
export default function Loader() {
  return (
    
      <div

      className=' rounded-3xl h-[300px] xl:mx-16 mx-auto bg-zinc-800 my-10 relative flex flex-col gap-3 justify-center items-center'>
<div className=' flex flex-col gap-2 z-[10] justify-center items-center'>
        <Audio
    height = "100"
    width = "100"
    radius = "10"
    color ='#a5abfa'
    ariaLabel = 'three-dots-loading'     
    wrapperStyle
    wrapperClass
  />

          <p
          className=' text-zinc-200 font-semibold text-center animate-[slideup_0.4s] text-lg'>Your music in under process..</p>

      
</div>


      </div>
  );
}