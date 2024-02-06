import connectDB from "@/libs/connectdb"
import { NextRequest, NextResponse } from "next/server"
import Playlist from "@/model/Playlist"
export async function GET(req:NextRequest){

    await connectDB()
    try {
      const playlists = await Playlist.find().sort({createdAt:-1})
      return NextResponse.json(playlists,{status:201})  
    } catch (error) {
      return NextResponse.json("Something went wrong",{status:500})
    }
    
}

export async function POST(req:NextRequest,res:NextResponse){

    await connectDB()
    const body = await req.json()
    const {title,desc,userMail} = body
    try {
      const list = await Playlist.create({
        title,
        desc,
        userMail
      })
      return NextResponse.json(list,{status:201})  
    } catch (error) {
        console.log(error)
      return NextResponse.json("Something went wrong",{status:500})
      
    }
    
}
