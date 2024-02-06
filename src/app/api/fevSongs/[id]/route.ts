import connectDB from "@/libs/connectdb";
import userfevSong from "@/model/userfevSong";

import { NextRequest, NextResponse } from "next/server";


export async function PUT(req:NextRequest,{ params }: { params: { id: string } }){
  const {id} = params
  await connectDB()
  try {
    await userfevSong.findByIdAndDelete(id)
    return NextResponse.json('Song is deleted successfully')  
  } catch (error) {
    console.log(error)
    return NextResponse.json("Something went wrong",{status:500})
  }
  
}