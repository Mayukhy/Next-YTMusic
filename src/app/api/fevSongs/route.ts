import connectDB from "@/libs/connectdb";
import userfevSong from "@/model/userfevSong";
import { NextRequest, NextResponse } from "next/server";


//showing the songs in the order of max listen count
export async function GET(req:NextRequest){
    await connectDB()
    try {
      const songs = await userfevSong.find().sort({listencount:-1})
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
    const songExists = await userfevSong.findOne({
        id:id,
        userMail:userMail
    })
    const updatedCriteria = {
        $inc :{
            listencount : 1
        }
    }
    if (songExists) {
      const updatedSong = await userfevSong.findOneAndUpdate({
        
        id:id,
        userMail:userMail
    },
        {
            $inc :{
            listencount : 1
        }
    },
        {new:true}
        )  
        return NextResponse.json(updatedSong,{status:201})  
    }
    else{
        const song = await userfevSong.create({
            title,
            id,
            userMail,
            imgUrl,
            artist,
            songUrl
          })
          return NextResponse.json(song,{status:201})  
    }


    } catch (error) {
        console.log(error)
      return NextResponse.json("Something went wrong",{status:500})
      
    }
    
}