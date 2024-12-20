import { z } from 'zod'

export const taskModel = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  status: z.enum(['PENDING', 'CONCLUDED']),
})

export const tasksModel = z.array(taskModel)

export type Task = z.infer<typeof taskModel>
