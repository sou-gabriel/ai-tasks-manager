import { Skeleton } from '@/components/ui/skeleton'

export function TasksListSkeleton() {
  return (
    <div className="space-y-2.5 max-h-96 overflow-y-auto">
      {Array.from({ length: 7 }).map((_, index) => (
        <Skeleton key={index} className="h-[50px]" />
      ))}
    </div>
  )
}
