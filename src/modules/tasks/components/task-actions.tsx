'use client'

import { useQueryClient } from '@tanstack/react-query'
import { EllipsisIcon, PencilIcon, TrashIcon } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { deleteTaskAction, updateTask } from '../actions/task'
import type { Task } from '../services/schema'

const TaskForm = dynamic(
  () => import('./task-form').then(({ TaskForm }) => TaskForm),
  {
    ssr: false,
  },
)

type TaskActionsProps = {
  task: Task
}

export function TaskActions({ task }: TaskActionsProps) {
  const queryClient = useQueryClient()
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  async function handleTaskDelete() {
    await deleteTaskAction(task.id)
    toast('Task deleted successfully.')
    queryClient.invalidateQueries({ queryKey: ['@atm.tasks'] })
  }

  async function handleUpdateTaskAction(formData: FormData) {
    await updateTask(task.id, formData)
    setIsSheetOpen(false)
    queryClient.invalidateQueries({ queryKey: ['@atm.tasks'] })
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <span className="sr-only">Open menu</span>
            <EllipsisIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsSheetOpen(true)}>
            <PencilIcon className="size-3" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleTaskDelete()}>
            <TrashIcon className="size-3" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Update task</SheetTitle>
          </SheetHeader>
          <TaskForm task={task} action={handleUpdateTaskAction} />
        </SheetContent>
      </Sheet>
    </>
  )
}
