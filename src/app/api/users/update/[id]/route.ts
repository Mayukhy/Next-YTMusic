import connectDB from "@/libs/connectdb";
import User from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req:NextRequest,{ params }: { params: { id: string } }){
  const {id} = params
  const body = await req.json()
  const {artistId} = body
  await connectDB()
  try {
    const user = await User.findByIdAndUpdate(id,{
      $pull:{
        fevArtists:artistId}
    })
    return NextResponse.json(user,{status:201})  
  } catch (error) {
    console.log(error)
    return NextResponse.json("Something went wrong",{status:500})
  }
  
}