'use server'

import { prisma } from '@/lib/prisma'
import { taskFormSchema } from '@/schemas/task'

export async function updateTask(id: string, formData: FormData) {
  const data = taskFormSchema.parse(Object.fromEntries(formData))

  const task = await prisma.task.findUnique({
    where: {
      id,
    },
  })

  if (!task) {
    throw new Error('Task not found.')
  }

  await prisma.task.update({
    where: {
      id,
    },
    data: {
      name: data.name,
      description: data.description,
      status: data.status,
    },
  })
}

export async function createTaskAction(formData: FormData) {
  const data = taskFormSchema.parse(Object.fromEntries(formData))

  await prisma.task.create({
    data: {
      name: data.name,
      description: data.description,
      status: data.status,
    },
  })
}

export async function deleteTaskAction(id: string) {
  await prisma.task.delete({
    where: {
      id,
    },
  })
}
