import { openaiTextToImage } from "@/lib/openai-image-generate";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { text } from "stream/consumers";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const POST = async (req: NextRequest) => {
  try {
    const { message } = await req.json();
    console.log(message);
    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: message,
    });
    return NextResponse.json({
      text: response.output_text,
    });
  } catch (error) {
    console.error("error", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
};
