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

export async function POST(req:NextRequest,res:NextResponse){

    await connectDB()
    const body = await req.json()
    const {userMail,userId} = body
    try {

        const userSubed = await User.findOne({email:userMail})

        if (userSubed?.subcribtion) {
          return null  
        }
        else{
            // const stripe = getStripe()
            const stripeSession = await stripe.checkout.sessions.create(
                {
                success_url: `http://localhost:3000/success/${userMail}`,
                cancel_url: 'http://localhost:3000/failure',
                payment_method_types: ["card"],
                mode: "subscription",
                billing_address_collection: "auto",
                customer_email: userMail,
                line_items: [
                  {
                    price_data: {
                      currency: "USD",
                      product_data: {
                        name: "MTAi Pro",
                        description: "Unlimited AI Generations"
                      },
                      unit_amount: 1000,
                      recurring: {
                        interval: "month"
                      }
                    },
                    quantity: 1,
                  },
                ],
              })
              if (stripeSession) {
                    await User.findOneAndUpdate({email:userMail},{
                        $set:{
                            stripSessionId:stripeSession?.id 
                        }
                    },
                    {new:true}
                    ) 
                    // return NextResponse.json(updatedUser,{status:201})   
                

                
              }
          
              return new NextResponse(JSON.stringify({ url: stripeSession.url }))



        }




    //   return NextResponse.json(apiUsage,{status:201})  
    } catch (error) {
        console.log(error)
      return NextResponse.json("Something went wrong",{status:500})
      
    }
    
}
