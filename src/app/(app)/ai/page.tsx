'use client'

import { useChat } from 'ai/react';

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ChatInput, MessageList, SuggestionList, useGetSuggestions } from '@/modules/ai';

export default function AiPage() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setInput
  } = useChat()
  const { suggestions, isLoadingSuggestions } = useGetSuggestions()

  if (messages.length === 0) {
    const shouldShowSuggestions = input.trim().length === 0

    return (
      <div onSubmit={handleSubmit} className="flex-col flex w-full gap-2">
        <ChatInput
          input={input}
          isLoading={isLoading}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
        />

        {shouldShowSuggestions && (
          <SuggestionList
            suggestions={suggestions}
            isLoadingSuggestions={isLoadingSuggestions}
            selectSuggestion={setInput}
          />
        )}
      </div>
    )
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardContent className="h-[60vh] pt-6 overflow-y-auto">
        <MessageList messages={messages} isLoading={isLoading} />
      </CardContent>
      <CardFooter>
        <ChatInput
          input={input}
          isLoading={isLoading}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
        />
      </CardFooter>
    </Card>
  )
}
