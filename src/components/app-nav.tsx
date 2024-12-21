'use client'

import Link from "next/link";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { buttonVariants } from "./ui/button";

export function AppNav() {
  const pathname = usePathname()

  return (
    <nav className='flex items-center gap-2'>
      <Link
        href="/tasks"
        className={cn(
          buttonVariants({ variant: 'ghost', size: 'sm' }),
          pathname.includes('/tasks') && [
            "bg-accent text-accent-foreground font-semibold",
          ]
        )}
      >
        Tasks
      </Link>
      <Link
        href="/ai"
        className={cn(
          buttonVariants({ variant: 'ghost', size: 'sm' }),
          pathname.includes('/ai') && [
            "bg-accent text-accent-foreground font-semibold",
          ]
        )}
      >
        Assistente
      </Link>
    </nav>
  )
}
