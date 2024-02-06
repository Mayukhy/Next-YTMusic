import connectDB from "@/libs/connectdb";
import Artist from "@/model/Artist";
import User from "@/model/User";

import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest,{ params }: { params: { id: string } }){
    const {id} = params
    await connectDB()
    try {
      const user = await User.findById(id)
      const fevArtists = user?.fevArtists

      const artists = await Promise.all(
        fevArtists.map(async(artist)=>{
          return await Artist.findById(artist)
        })
      )
      return NextResponse.json(artists.flat(),{status:201})  
    } catch (error) {
      return NextResponse.json("Something went wrong",{status:500})
    }
    
}
