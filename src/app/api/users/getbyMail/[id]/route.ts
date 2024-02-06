import connectDB from "@/libs/connectdb";
import User from "@/model/User";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest,{ params }: { params: { id: string } }){
    const {id} = params
    await connectDB()
    try {
      const user = await User.findOne({email:id})
      // .populate('generationLimit')
      return NextResponse.json(user,{status:201})  
    } catch (error) {
      return NextResponse.json("Something went wrong",{status:500})
    }
    
}

