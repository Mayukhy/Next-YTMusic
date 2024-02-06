import * as React from 'react';
import Select, { SelectStaticProps } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import IconButton from '@mui/joy/IconButton';
import CloseRounded from '@mui/icons-material/CloseRounded';

export default function Duration({postData,setpostData}) {
  console.log('From data',postData)
  const [value, setValue] = React.useState<string | null>();
  const action: SelectStaticProps['action'] = React.useRef(null);
  return (
    <Select
    className=' text-white hover:bg-black'
    
      action={action}
      value={value}
      placeholder="Specify duration.."
      onChange={(e, newValue) => {
        setValue(newValue)
    }}
      {...(value && {
        // display the button and remove select indicator
        // when user has selected a value
        endDecorator: (
          <IconButton
            size="sm"
            variant="plain"
            color="neutral"
            onMouseDown={(event) => {
              // don't open the popup when clicking on this button
              event.stopPropagation();
            }}
            onClick={() => {
              setValue(null);
              action.current?.focusVisible();
            }}
          >
            <CloseRounded />
          </IconButton>
        ),
        indicator: null,
      })}
      sx={{ minWidth: 160 ,background:'transparent'}}
    >
      <Option
      onClick={()=>setpostData({...postData,duration:10})}
      value={10}>10 sec</Option>
      <Option
      onClick={()=>setpostData({...postData,duration:20})}
      value={20}>20 sec</Option>
      <Option
      onClick={()=>setpostData({...postData,duration:30})}
      value={30}>30 sec</Option>
      <Option
      onClick={()=>setpostData({...postData,duration:60})}
      value={60}>60 sec</Option>
      <Option
      onClick={()=>setpostData({...postData,duration:90})}
      value={90}>more than 1 min</Option>
    </Select>
  );
}