import { prisma } from '@/lib/prisma'
import { openai } from '@ai-sdk/openai'
import { generateText } from 'ai'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const query = searchParams.get('q')

  const tasks = await prisma.task.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      status: true,
    },
  })

  if (!query) {
    return NextResponse.json(tasks)
  }

  const tasksNames = tasks
    .slice(0, 100)
    .map(({ name }: { name: string }) => `"${name}"`)
    .join(', ')

  const { text } = await generateText({
    model: openai('gpt-4o-mini'),
    system: `Você é um assistente especializado em análise semântica. Receberá uma lista de tasks: ${tasksNames}. Encontre aquelas que possuem relação semântica com o termo "${query}". Retorne apenas um array JSON válido no formato ["item1", "item2"] e não use crases ou explicações.`,
    prompt: query,
  })

  const results = JSON.parse(text.trim())

  const aiTasks = tasks.filter((task: { name: string }) =>
    results.some((taskName: string) => task.name === taskName),
  )

  return NextResponse.json(aiTasks)
}
