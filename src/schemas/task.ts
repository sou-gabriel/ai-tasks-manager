import { z } from 'zod'

export const taskFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  status: z.enum(['PENDING', 'CONCLUDED'], { message: 'Invalid status' }),
})

export type TaskFormValues = z.infer<typeof taskFormSchema>
