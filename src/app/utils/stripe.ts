import Stripe from "stripe"

export const stripe = new Stripe(`${process.env.STRIPE_API_KEY}`, {
  apiVersion: "2023-10-16",
  typescript: true,
});


// import { Stripe, loadStripe } from '@stripe/stripe-js';

// let stripePromise: Promise<Stripe | null>;
// const getStripe = () => {
//   if (!stripePromise) {
//     stripePromise = loadStripe(process.env.STRIPE_PUBLIC_API_KEY!);
//   }
//   return stripePromise;
// };

// export default getStripe;


