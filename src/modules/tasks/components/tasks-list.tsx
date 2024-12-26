"use client";

import { useQueryState } from "nuqs";

import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/use-debounce";
import { CircleXIcon, Loader2Icon } from "lucide-react";
import { useGetTasks } from "../hooks/use-get-tasks";
import { TaskActions } from "./task-actions";
import { TasksListSkeleton } from "./tasks-list-skeleton";

export function TasksList() {
  const [query] = useQueryState("q");
  const debouncedQuery = useDebounce(query ?? "");

  const { tasks, isLoadingTasks, tasksErrorMessage, refetchTasks, isRefetchingTasks } =
    useGetTasks(debouncedQuery);

  if (tasksErrorMessage || isRefetchingTasks) {
    return (
      <div className="py-4 flex items-center gap-2 text-muted-foreground justify-center">
        <CircleXIcon className="size-4" />
        <p className="text-muted-foreground textl-xl">Failed to fetch tasks.</p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => refetchTasks()}
          disabled={isRefetchingTasks}
        >
          {isRefetchingTasks && <Loader2Icon className="size-4 animate-spin" />}
          Try again
        </Button>
      </div>
    );
  }

  if (isLoadingTasks) {
    return <TasksListSkeleton />;
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
  );
}
