import { logError } from "@/lib/utils";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { NextResponse } from "next/server";

let cache = {
  data: null as string[] | null,
  timestamp: 0,
};

const CACHE_DURATION = 5 * 60; // 5 minutes

export async function GET() {
  const now = Date.now();
  const cacheValid =
    cache.data && now - cache.timestamp < CACHE_DURATION * 1000;

  if (cacheValid) {
    return NextResponse.json(cache.data);
  }

  let suggestions: string[] = [];

  try {
    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      system:
        'Eu quero que você gere algumas sugestões de perguntas para um assistente de chat. Retorne um array de strings com 3 perguntas aleatórias sobre qualquer assunto. Retorne apenas um array JSON válido no formato ["item1", "item2"] e não use crases ou explicações.',
      prompt: "Gere sugestões de perguntas para um assistente de chat.",
    });

    suggestions = JSON.parse(text) as unknown as string[];
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error?.message
        : "Failed to generate suggestions";
    logError(errorMessage);

    console.error("Failed to generate suggestions:", error);
    suggestions = cache.data || [
      "Qual é a capital da França?",
      "Como funciona a fotossíntese?",
      "Quem escreveu Dom Quixote?",
      "O que é inteligência artificial?",
      "Qual é a diferença entre vírus e bactérias?",
      "Como se faz pão caseiro?",
    ];
  } finally {
    cache = {
      data: suggestions,
      timestamp: now,
    };
  }

  return NextResponse.json(suggestions);
}
