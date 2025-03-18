
import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
export const maxDuration = 30;

export async function POST(req: Request) {
    const google = createGoogleGenerativeAI({apiKey:process.env.GOOGLE_GENERATIVE_AI_API_KEY});
  const { messages }: { messages: Message[] } = await req.json();

  // check if user has sent a PDF
  const messagesHavePDF = messages.some(message =>
    message.experimental_attachments?.some(
      a => a.contentType === 'application/pdf',
    ),
  );

  const result = streamText({
    model: google('models/gemini-2.0-flash'),
    messages,
  });

  return result.toDataStreamResponse();
}