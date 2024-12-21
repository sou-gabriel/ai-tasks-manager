'use client'

import { useChat } from 'ai/react';
import { Send } from "lucide-react";
import { useRef, useState } from 'react';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useGetSuggestions } from '@/modules/ai';

export default function AiPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, setInput } = useChat()
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const { suggestions, isLoadingSuggestions } = useGetSuggestions(isFocused)

  async function handleInputFocus() {
    setIsFocused(true)
  }

  function handleInputBlur() {
    setIsFocused(false)
  }

  function selectSuggestion(suggestion: string) {
    setInput(suggestion)
  }

  if (messages.length === 0) {
    const shouldShowSuggestions = isFocused && suggestions.length > 0 && !isLoadingSuggestions && input.trim().length === 0

    return (
      <div>
        <form onSubmit={handleSubmit} className="relative flex w-full gap-2">
          <Input
            value={input}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder="Digite sua mensagem..."
            className="flex-grow"
            ref={inputRef}
          />

          {shouldShowSuggestions && (
            <div className="absolute translate-y-[110%] left-0 bottom-0 mt-2 space-y-2">
              {suggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full text-left justify-start h-auto py-2 px-4"
                  onClick={() => selectSuggestion(suggestion)}

                >
                  {suggestion}
                </Button>
              ))}
            </div>
          )}

          <Button type="submit" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    )
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardContent className="h-[60vh] pt-6 overflow-y-auto space-y-4">
        {messages.map(m => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] text-sm py-1.5 px-2 p-3 rounded-lg ${m.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
              }`}>
              {m.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="text-sm max-w-[80%] py-1.5 px-2 rounded-lg bg-gray-200 text-black">
              Digitando...
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSubmit} className="flex w-full space-x-2">
          <Input
            value={input}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder="Digite sua mensagem..."
            className="flex-grow"
            ref={inputRef}
          />
          <Button type="submit" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}

