import connectDB from "@/libs/connectdb";
import LikedSong from "@/model/LikedSong";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(req:NextRequest,{ params }: { params: { id: string } }){
  const {id} = params
  await connectDB()
  try {
    await LikedSong.findByIdAndDelete(id)
    return NextResponse.json('Song is deleted successfully')  
  } catch (error) {
    console.log(error)
    return NextResponse.json("Something went wrong",{status:500})
  }
  
}