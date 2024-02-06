import * as React from 'react';
import Input from '@mui/joy/Input';


export default function Guidance({postData,setpostData}) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  return (
      <Input
      className=' text-zinc-100'
      sx={{ background:'transparent'}}
        type="number"
        defaultValue={2}
        onChange={(e)=> {
          setpostData({...postData,guidance:Number(e.target.value)})
        console.log('Final form data is here',postData)
        }}
        
        slotProps={{
          input: {
            ref: inputRef,
            min: 1,
            max: 50,
            step: 1,
          },
        }}
      />
  );
}