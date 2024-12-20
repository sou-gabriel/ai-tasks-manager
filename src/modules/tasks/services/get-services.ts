import { env } from '@/env'
import { tasksModel } from './schema'

export async function getTasks(query?: string | null) {
  const url = `${env}/api/tasks?q=${query || ''}`
  const res = await fetch(url)

  const tasks = await res.json()
  return tasksModel.parse(tasks)
}
