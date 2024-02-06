import connectDB from "@/libs/connectdb"
import User from "@/model/User"
import { NextRequest, NextResponse } from "next/server"
import fs from 'fs'
import Artist from "@/model/Artist"
export async function GET(req:NextRequest){

    await connectDB()
    try {
      const allusers = await Artist.find().sort({createdAt:-1})
      return NextResponse.json(allusers,{status:201})  
    } catch (error) {
      return NextResponse.json("Something went wrong",{status:500})
    }
    
}

export async function POST(req:NextRequest,res:NextResponse){

    await connectDB()
    const body = await req.json()
    const {name,image} = body
    try {
      const artists = await Artist.create({
        name,
        image
      })
      return NextResponse.json(artists,{status:201})  
    } catch (error) {
        console.log(data)
      return NextResponse.json("Something went wrong",{status:500})
      
    }
    
}
