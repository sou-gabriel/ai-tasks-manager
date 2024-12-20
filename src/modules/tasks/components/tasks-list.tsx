'use client'

import { useQuery } from '@tanstack/react-query'
import { useQueryState } from 'nuqs'

import { useDebounce } from '@/hooks/use-debounce'
import { getTasks } from '../services/get-services'
import { TaskActions } from './task-actions'
import { TasksListSkeleton } from './tasks-list-skeleton'

export function TasksList() {
  const [query] = useQueryState('q')
  const debouncedQuery = useDebounce(query ?? '')

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ['@atm.tasks', debouncedQuery],
    queryFn: () => getTasks(debouncedQuery),
  })

  if (isLoading) {
    return <TasksListSkeleton />
  }

  return (
    <div className="space-y-2.5 max-h-96 overflow-y-auto">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="border py-2 px-4 bg-muted hover:bg-muted/90 transition-colors rounded-md flex items-center justify-between"
          data-name={task.name}
        >
          <p className="font-semibold">{task.name}</p>
          <TaskActions task={task} />
        </div>
      ))}
    </div>
  )
}
