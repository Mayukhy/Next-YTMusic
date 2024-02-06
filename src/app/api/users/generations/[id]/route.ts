import connectDB from "@/libs/connectdb";
import Ailimit from "@/model/Ailimit";
import User from "@/model/User";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req:NextRequest,{ params }: { params: { id: string } }){
    const {id} = params
    await connectDB()
    try {
      const user = await User.findById(id)
      const genIds = user?.generationLimit

      const aigenerations = await Promise.all(
        genIds?.map(async(data)=>{
            return await Ailimit.findById(data?._id)
        })
      )
      return NextResponse.json(aigenerations.flat(),{status:201})  
    } catch (error) {
      return NextResponse.json("Something went wrong",{status:500})
    }
    
}