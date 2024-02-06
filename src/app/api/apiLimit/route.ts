import connectDB from "@/libs/connectdb"
import { NextRequest, NextResponse } from "next/server"
import Ailimit from "@/model/Ailimit"

export async function GET(req:NextRequest){

    await connectDB()
    try {
      const apiusages = await Ailimit.find().sort({createdAt:-1})
      return NextResponse.json(apiusages,{status:201})  
    } catch (error) {
      return NextResponse.json("Something went wrong",{status:500})
    }
    
}

export async function POST(req:NextRequest,res:NextResponse){

    await connectDB()
    const body = await req.json()
    const {userMail,prompt} = body
    try {
      const apiUsage = await Ailimit.create({
userMail,
prompt
  })
      return NextResponse.json(apiUsage,{status:201})  
    } catch (error) {
        console.log(error)
      return NextResponse.json("Something went wrong",{status:500})
      
    }
    
}
