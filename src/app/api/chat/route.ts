import { buildPortfolioContext } from '@/lib/portfolio-context';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import type { LanguageModel } from 'ai';
import { convertToModelMessages, streamText } from 'ai';

export const runtime = 'nodejs';
export const maxDuration = 60;

// --- Provider factory ---

function getModel(): LanguageModel {
  const provider = process.env.AI_PROVIDER ?? 'gemini';

  if (provider === 'anthropic') {
    const anthropic = createAnthropic({
      apiKey: 'placeholder',
      baseURL: process.env.ANTHROPIC_BASE_URL,
      headers: {
        Authorization: `Bearer ${process.env.ANTHROPIC_AUTH_TOKEN}`,
      },
    });
    return anthropic('claude-haiku-4.5');
  }

  // Default: gemini
  const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
  });
  return google('gemini-1.5-flash');
}

// --- Route handler ---

const SYSTEM_PROMPT = `You are a friendly assistant on Rizki Nabil Aufa's personal portfolio website.
Answer visitor questions about Nabil based solely on the information below.
Be concise, conversational, and helpful.
If something isn't covered in the data, say you don't have that info and suggest contacting Rizki directly.
Never make up information.`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const [model, context] = await Promise.all([Promise.resolve(getModel()), buildPortfolioContext()]);

    const provider = process.env.AI_PROVIDER ?? 'gemini';
    console.log(`[chat/route] provider=${provider}`);

    const result = streamText({
      model,
      system: `${SYSTEM_PROMPT}\n\n${context}`,
      messages: await convertToModelMessages(messages),
      maxOutputTokens: 512,
      onError: (err) => console.error('[chat/route] stream error:', err),
    });

    return result.toUIMessageStreamResponse();
  } catch (err) {
    console.error('[chat/route] error:', err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
