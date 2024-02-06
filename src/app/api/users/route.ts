import connectDB from "@/libs/connectdb"
import User from "@/model/User"
import { NextRequest, NextResponse } from "next/server"


export async function GET(req:NextRequest){

    await connectDB()
    try {
      const allusers = await User.find().sort({createdAt:-1})
      return NextResponse.json(allusers,{status:201})  
    } catch (error) {
      return NextResponse.json("Something went wrong",{status:500})
    }
    
}
