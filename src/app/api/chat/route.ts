import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(request: Request) {
  const { messages } = await request.json()

  const result = streamText({
    model: openai('gpt-4o-mini'),
    messages
  })

  return result.toDataStreamResponse()
}
