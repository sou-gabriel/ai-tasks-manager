import { getQueryClient } from '@/lib/query-client'
import {
  AddTaskButton,
  getTasks,
  SearchTasks,
  TasksList,
} from '@/modules/tasks'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { Suspense } from 'react'

export default async function HomePage() {
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['@atm.tasks'],
    queryFn: () => getTasks(),
  })

  return (
    <main className="min-h-screen py-20 max-w-screen-sm mx-auto">
      <div className="flex itmes-center justify-between gap-2 pb-4 mb-4 border-b">
        <Suspense>
          <SearchTasks />
        </Suspense>
        <AddTaskButton />
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense>
          <TasksList />
        </Suspense>
      </HydrationBoundary>
    </main>
  )
}
