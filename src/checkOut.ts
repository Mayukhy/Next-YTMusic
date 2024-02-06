import {loadStripe,Stripe} from "@stripe/stripe-js"


export async function checkout({userId,lineItems}) {
    let stripePromise: Promise<Stripe | null>;
    // let stripePromise =null
    const getstripe =()=>{
        if(!stripePromise){
            stripePromise =loadStripe(`${process.env.STRIPE_PUBLIC_API_KEY}`)
        }
        return stripePromise
    }
    const stripe =await getstripe()
    await stripe?.redirectToCheckout(
        
    //     {
    //     mode:"payment",
    //     lineItems,
    //     successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
	// 	cancelUrl: window.location.origin
    // }

    {
        successUrl: `http://localhost:3000/success/${userId}`,
        cancelUrl: 'http://localhost:3000/failure',
        // payment_method_types: ["card"],
        mode: "payment",
        lineItems
        // billing_address_collection: "auto",
        // customer_email: userMail,
        // lineItems: [
        //   {
        //     price_data: {
        //       currency: "inr",
        //       product_data: {
        //         name: "MTAi Pro",
        //         description: "Unlimited AI Generations"
        //       },
        //       unit_amount: 500*100,
        //     //   recurring: {
        //     //     interval: "month"
        //     //   }
        //     },
        //     quantity: 1,
        //   },
        // ],
        
      }
    
    
    )
}