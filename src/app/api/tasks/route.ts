import { prisma } from "@/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");

  const tasks = await prisma.task.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      status: true,
    },
    where: {
      name: {
        contains: query ?? undefined,
        mode: "insensitive",
      },
    },
  });

  return NextResponse.json(tasks);
}
