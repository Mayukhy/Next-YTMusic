import connectDB from "@/libs/connectdb"
import { NextRequest, NextResponse } from "next/server"

import PlaylistSong from "@/model/PlaylistSong"

export async function GET(req:NextRequest){

    await connectDB()
    try {
      const songs = await PlaylistSong.find().sort({createdAt:-1})
      return NextResponse.json(songs,{status:201})  
    } catch (error) {
      return NextResponse.json("Something went wrong",{status:500})
    }
    
}

export async function POST(req:NextRequest,res:NextResponse){

    await connectDB()
    const body = await req.json()
    const {title,id,playlistId,userMail,imgUrl,artist,songUrl} = body
    try {
      const newSong = await PlaylistSong.create({
title,
id,
playlistId,
userMail,
imgUrl,
artist,
songUrl
  })
      return NextResponse.json(newSong,{status:201})  
    } catch (error) {
        console.log(error)
      return NextResponse.json("Something went wrong",{status:500})
      
    }
    
}
