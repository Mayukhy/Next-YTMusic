import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { Zap } from "lucide-react";
import PlanCards from './PlanCards';
import { useGetUserBymailQuery } from '@/redux/api/api';
import { useSession } from 'next-auth/react';

export default function ProModelpopup({addSubcribtion}) {
  const [open, setOpen] = React.useState<boolean>(false);
  const session = useSession()
  const {data:currentUser} = useGetUserBymailQuery(session?.data?.user?.email)
  return (
    <React.Fragment>
{   !currentUser?.subcribtion?
         <Button
          onClick={()=>setOpen(true)}
          style={{
            borderRadius:'20px'
          }}
          
        //   onClick={proModal.onOpen} 
           className="w-full rounded-3xl">
            Upgrade
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>:
                   <Button
                   onClick={()=>setOpen(true)}
                   style={{
                     borderRadius:'20px'
                   }}
                   
                 //   onClick={proModal.onOpen} 
                    className="w-full rounded-3xl">
                     Manage Subscribtion
                     {/* <Zap className="w-4 h-4 ml-2 fill-white" /> */}
                   </Button>
          }
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
        className=' animate-[slideup_0.5s]'
          variant="outlined"
          sx={{
            width: {lg:800,md:700,xs:'100%'},
            backgroundColor:'#232324',
            border:'none',
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
{ currentUser?.subcribtion?

<Typography
          sx={{
            display:'flex',
            mb:2
           
          }}
          className=' flex my-auto gap-1'
            component="h2"
            id="modal-title"
            level="h2"
            textColor='common.white'
            fontWeight="lg"
            mb={1}
          >

            Manage Your
            <img
           className=' w-[40px] h-[40px] mt-0.5 hover:animate-[spin_2s] cursor-pointer'
           src='http://localhost:3000/logo.png' alt="" />
             <span className=' text-sm px-3 mt-2  bg-gradient-to-r from-red-800 cursor-pointer hover:bg-gradient-to-l duration-200 transition-all to-blue-800 font-normal rounded-2xl pt-[3px] h-[30px]  border border-zinc-600'>
             Pro
             </span>
             
          </Typography>:

<Typography
sx={{
  display:'flex',
  mb:2
 
}}
className=' flex my-auto gap-1'
  component="h2"
  id="modal-title"
  level="h2"
  textColor='common.white'
  fontWeight="lg"
  mb={1}
>

  Upgreade to
  <img
 className=' w-[40px] h-[40px] mt-0.5 hover:animate-[spin_2s] cursor-pointer'
 src='http://localhost:3000/logo.png' alt="" />
   <span className=' text-sm px-3 mt-2  bg-gradient-to-r from-red-800 cursor-pointer hover:bg-gradient-to-l duration-200 transition-all to-blue-800 font-normal rounded-2xl pt-[3px] h-[30px]  border border-zinc-600'>
   Pro
   </span>
   
</Typography>
          }
    

         <PlanCards currentUser={currentUser}  addSubcribtion={addSubcribtion}/>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}