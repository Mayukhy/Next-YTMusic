import connectDB from "@/libs/connectdb"
import User from "@/model/User"
import { NextRequest, NextResponse } from "next/server"

export async function PUT(req:NextRequest,{ params }: { params: { id: string } }){

     const {id} = params

    await connectDB()
    try {


        const subbedUser = await User.findByIdAndUpdate(id,{
          $set:{
            subcribtion:true
          },
            },
            {new:true})

            //subcribtion successfull
            return NextResponse.json(subbedUser,{status:201})  
       

        
 
    } catch (error) {
      return NextResponse.json("Something went wrong",{status:500})
    }
    
}

// export async function POST(req:NextRequest,res:NextResponse){

//     await connectDB()
//     const body = await req.json()
//     const {title,desc,userMail} = body
//     try {
//       const list = await Playlist.create({
//         title,
//         desc,
//         userMail
//       })
//       return NextResponse.json(list,{status:201})  
//     } catch (error) {
//         console.log(error)
//       return NextResponse.json("Something went wrong",{status:500})
      
//     }
    
// }
