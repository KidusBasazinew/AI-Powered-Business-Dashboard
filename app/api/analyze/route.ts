import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { data } = body;

    if (!data) {
      return NextResponse.json(
        { error: "Missing data in request body" },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(
      process.env.NEXT_PUBLIC_GEMINI_API_KEY!
    );

    const prompt = `
      Based on the following CSV data or description, analyze and summarize insights:
      ${JSON.stringify(data)}
    `;

    const model = await genAI
      .getGenerativeModel({ model: "gemini-2.0-flash" })
      .generateContent([prompt]);

    // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    // const result = await model.generateContent({
    //   contents: [{ role: "user", parts: [{ text: prompt }] }],
    // });

    const text = model.response.text();
    console.log(text);
    return NextResponse.json({ text }, { status: 200 });
  } catch (error) {
    console.error("❌ AI generation error:", error);
    return NextResponse.json(
      { error: "Failed to process request", details: String(error) },
      { status: 500 }
    );
  }
}
