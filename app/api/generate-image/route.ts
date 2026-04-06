import { openaiTextToImage } from "@/lib/openai-image-generate";
import { RawImage } from "@huggingface/transformers";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { prompt } = await req.json();

    if (!prompt || !prompt.trim) {
      return NextResponse.json({ error: "Prompt empty" }, { status: 400 });
    }

    const buffer = await openaiTextToImage(prompt);

    if (!buffer) {
      return NextResponse.json(
        { error: "Failed to generate image" },
        { status: 500 },
      );
    }
    const base64Image = buffer.toString("base64");
    return NextResponse.json({
      image: `data:image/png;base64,${base64Image}`,
      RawImage: base64Image,
    });
  } catch (error) {
    console.error("Generate image error", error);
  }
  return NextResponse.json(
    {
      error: "Server error while generating image",
    },
    {
      status: 500,
    },
  );
};
