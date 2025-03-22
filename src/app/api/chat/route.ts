import { streamText,smoothStream } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { prompt2 } from './prompt2';
export async function POST(req: Request) {
  const google = createGoogleGenerativeAI({apiKey:process.env.GOOGLE_GENERATIVE_AI_API_KEY});
  const { messages } = await req.json();
  
  const result = streamText({
    model: google("models/gemini-2.0-flash"),
    system:prompt2,
    experimental_transform: smoothStream({
      delayInMs: 10, // optional: defaults to 10ms
      chunking: 'word', // optional: defaults to 'word'
    }),
    messages
    });
  // let llmOutout='';
  // for await (const textPart of result.textStream) {
  //   llmOutout+=textPart;
  // }
  // console.log(llmOutout)
  
  return result.toDataStreamResponse();
}