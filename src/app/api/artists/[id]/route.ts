import connectDB from "@/libs/connectdb";
import Artist from "@/model/Artist";


import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest,{ params }: { params: { id: string } }){
    const {id} = params
    await connectDB()
    try {
      const artist = await Artist.findById(id)
      return NextResponse.json(artist,{status:201})  
    } catch (error) {
      return NextResponse.json("Something went wrong",{status:500})
    }
    
}
