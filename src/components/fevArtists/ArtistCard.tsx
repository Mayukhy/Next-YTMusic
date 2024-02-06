import * as Avatar from '@radix-ui/react-avatar';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function ArtistCard({artist}) {
 const router = useRouter()
  return (
    <div
    onClick={()=>router.push(`/artistdetail/${artist?._id}`)}
    className=' flex flex-col p-5 cursor-pointer 2xl:hover:bg-zinc-900 relative justify-center opacity-60 items-center transition-all duration-200'>
    <Avatar.Root className="bg-blackA1 hover:scale-105 relative transition-all duration-200 hover:opacity-60 inline-flex h-[250px] w-[250px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
<Avatar.Image
  className="h-full w-full rounded-[inherit] object-cover"
  src={artist?.image}
  alt="Colm Tuite"
/>
<Avatar.Fallback
  className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
  delayMs={600}
>
  {artist?.name}
</Avatar.Fallback>
</Avatar.Root>
<p className=' text-base font-medium mt-2 text-zinc-300'>{artist?.name}</p>
</div>
  )
}
