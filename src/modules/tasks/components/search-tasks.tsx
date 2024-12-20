'use client'

import { useQueryState } from 'nuqs'
import { useRef } from 'react'

import { Input } from '@/components/ui/input'

export function SearchTasks() {
  const [query, setQuery] = useQueryState('q', { defaultValue: '' })
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <Input
      ref={inputRef}
      placeholder="Search tasks..."
      defaultValue={query}
      onChange={(event) => setQuery(event.target.value)}
    />
  )
}
