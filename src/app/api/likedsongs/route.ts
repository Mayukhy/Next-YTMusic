import connectDB from "@/libs/connectdb";
import LikedSong from "@/model/LikedSong";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    await connectDB()
    try {
      const songs = await LikedSong.find()
      return NextResponse.json(songs,{status:201})  
    } catch (error) {
      return NextResponse.json("Something went wrong",{status:500})
    }
    
}

export async function POST(req:NextRequest,res:NextResponse){

    await connectDB()
    const body = await req.json()
    const {title,id,userMail,imgUrl,artist,songUrl} = body
    try {
      const song = await LikedSong.create({
        title,
        id,
        userMail,
        imgUrl,
        artist,
        songUrl
      })
      return NextResponse.json(song,{status:201})  
    } catch (error) {
        console.log(error)
      return NextResponse.json("Something went wrong",{status:500})
      
    }
    
}