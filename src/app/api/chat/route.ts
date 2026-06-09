import { buildPortfolioContext } from '@/lib/portfolio-context';
import { createAnthropic } from '@ai-sdk/anthropic';
import { convertToModelMessages, streamText } from 'ai';

export const runtime = 'nodejs';
export const maxDuration = 60;

const anthropic = createAnthropic({
  apiKey: 'placeholder', // H-Chat uses Authorization header, not x-api-key
  baseURL: process.env.ANTHROPIC_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.ANTHROPIC_AUTH_TOKEN}`,
  },
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const context = await buildPortfolioContext();

  const result = streamText({
    model: anthropic('claude-haiku-4-5'),
    system: `You are a friendly assistant on Rizki Nabil Aufa's personal portfolio website.
Answer visitor questions about Rizki based solely on the information below.
Be concise, conversational, and helpful.
If something isn't covered in the data, say you don't have that info and suggest contacting Rizki directly.
Never make up information.

${context}`,
    messages: await convertToModelMessages(messages),
    maxOutputTokens: 512,
  });

  return result.toUIMessageStreamResponse();
}
