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
    const { prompt,guidance,duration} = body;

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }


    const response = await replicate.run(
      "meta/musicgen:b05b1dff1d8c6dc63d14b0cdb42135378dcb87f6373b0d3d341ede46e59e2b38",
      {
        input: {
          prompt: prompt,
          top_k: 250,
          top_p: 0,
          duration: duration,
          temperature: 1,
          continuation: false,
          model_version: "stereo-large",
          output_format: "wav",
          continuation_start: 0,
          multi_band_diffusion: false,
          normalization_strategy: "peak",
          classifier_free_guidance: guidance
        }
      }
    );

    return NextResponse.json(response);
  } catch (error) {
    console.log('[MUSIC_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

