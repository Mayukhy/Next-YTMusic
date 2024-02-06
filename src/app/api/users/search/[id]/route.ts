import connectDB from "@/libs/connectdb"
import User from "@/model/User"
import { NextRequest, NextResponse } from "next/server"


export async function GET(req:NextRequest ,{ params }: { params: { id: string } }){
    const {id} = params
    await connectDB()
    try {
      const searchedUsers = await User.find(
        {
        "$or":[
            {name:{$regex:id,$options:"i"}},
            {email:{$regex:id,$options:"i"}}
        ]
      }

      )
      return NextResponse.json(searchedUsers,{status:201})  
    } catch (error) {
      return NextResponse.json("Something went wrong",{status:500})
    }
    
}
