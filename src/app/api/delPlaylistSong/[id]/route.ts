import connectDB from "@/libs/connectdb";
import PlaylistSong from "@/model/PlaylistSong";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req:NextRequest,{ params }: { params: { id: string } }){
  const {id} = params
  await connectDB()
  try {
    const user = await PlaylistSong.findByIdAndDelete(id)
    return NextResponse.json(user,{status:201})  
  } catch (error) {
    console.log(error)
    return NextResponse.json("Something went wrong",{status:500})
  }
}
