import connectDB from "@/libs/connectdb";
import User from "@/model/User";
import { getSession, useSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(req:NextRequest,{ params }: { params: { id: string } }){
  
    //pushing userAigeneration id to userSchema as object id

    // const session = await getSession()
    //     if (!session?.user?.email) {
    //     return NextResponse.json('You are not authenticated',{status:404}) 
    //   }
    const {id} = params
    // const AiGenarationId = req.queary.AiGenarationId
  const body = await req.json()

//   body is generated ai o/p objectId
  const {genId} = body
  await connectDB()
  try {
    const user = await User.findByIdAndUpdate(id,{
      // fevArtists:updatedArtistCheckedArr
      $addToSet:{
        generationLimit:genId}
    })
    return NextResponse.json(user,{status:201})  
  } catch (error) {
    console.log(error)
    return NextResponse.json("Something went wrong",{status:500})
  }
  
}