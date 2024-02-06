import connectDB from "@/libs/connectdb"
import { NextRequest, NextResponse } from "next/server"

import User from "@/model/User"
import { stripe } from "@/app/utils/stripe"
// import getStripe from "@/app/utils/stripe"





// export async function GET(req:NextRequest){

//     await connectDB()
//     try {
//       const apiusages = await Ailimit.find().sort({createdAt:-1})
//       return NextResponse.json(apiusages,{status:201})  
//     } catch (error) {
//       return NextResponse.json("Something went wrong",{status:500})
//     }
    
// }

export async function GET(req:NextRequest,res:NextResponse){

    await connectDB()
    // const body = await req.json()
    // const {sessionId} = body
    try {

const session = await stripe.checkout.sessions.retrieve(
    "cs_test_a1fr8KhZCY2YecxsOjlz4Xof9Y7cyW6G3Ra0Q0BVyFQwhS0qE0iMMTKjGF"
  );
const customerId = await stripe.subscriptions.retrieve(
    'sub_1MowQVLkdIwHu7ixeRlqHVzs'
  )




return new NextResponse(JSON.stringify({ url:session }))
    } catch (error) {
        console.log(error)
      return NextResponse.json("Something went wrong",{status:500})
      
    }
    
}
