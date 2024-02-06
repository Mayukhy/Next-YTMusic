import Replicate from "replicate";
import { NextResponse,NextRequest } from "next/server";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN
});

export async function POST(
  req: NextRequest
) {
  try {
    const body = await req.json();
    const { prompt,guidance} = body;

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }


    const response = await replicate.run(
      "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
      {
        input: {
            width: 768,
            height: 768,
            prompt: prompt,
            scheduler: "K_EULER",
            num_outputs: 1,
            guidance_scale: guidance,
            num_inference_steps: 50
        }
      }
    );

    return NextResponse.json(response);
  } catch (error) {
    console.log('[MUSIC_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

