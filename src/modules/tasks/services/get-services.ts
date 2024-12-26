import { httpClient } from "@/http/client";
import { tasksModel } from "./schema";

export async function getTasks(query?: string | null) {
  const tasks = await httpClient(`/api/tasks?q=${query || ""}`);
  return tasksModel.parse(tasks);
}
