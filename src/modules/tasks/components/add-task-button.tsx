'use client'

import { PlusIcon } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useQueryClient } from '@tanstack/react-query'

import { createTaskAction } from '../actions/task'

const TaskForm = dynamic(
  () => import('./task-form').then(({ TaskForm }) => TaskForm),
  {
    ssr: false,
  },
)

export function AddTaskButton() {
  const queryClient = useQueryClient()
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  async function handleCreateTaskAction(formData: FormData) {
    await createTaskAction(formData)
    setIsSheetOpen(false)
    queryClient.invalidateQueries({ queryKey: ['@atm.tasks'] })
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button>
          <PlusIcon className="size-3" />
          Add task
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New task</SheetTitle>
        </SheetHeader>
        <TaskForm action={handleCreateTaskAction} />
      </SheetContent>
    </Sheet>
  )
}
