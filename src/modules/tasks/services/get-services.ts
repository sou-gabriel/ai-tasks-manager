import { env } from '@/env'
import { tasksModel } from './schema'

export async function getTasks(query?: string | null) {
  const url = `${env.NEXT_PUBLIC_API_BASE_URL}/api/tasks?q=${query || ''}`
  const res = await fetch(url)

  const tasks = await res.json()
  return tasksModel.parse(tasks)
}
