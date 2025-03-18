import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI("AIzaSyAVQpop5MJZpJg2x3DhEfWs4nCFmOQ-Op0");

export async function POST(req: NextRequest) {
  try {
    const { imageData, mimeType } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent([
      "Analyze this image and solve the questions and just give the answers,with correct options",
      {
        inlineData: {
          data: imageData,
          mimeType,
        },
      },
    ]);
console.log(imageData);
    return NextResponse.json({ 
      analysis:  result.response.text() 
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Analysis failed" },
      { status: 500 }
    );
  }
}