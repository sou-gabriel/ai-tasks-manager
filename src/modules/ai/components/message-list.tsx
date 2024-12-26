import type { Message } from "ai"

type MessageListProps = {
  messages: Message[]
  isLoading: boolean
}

export function MessageList({ messages, isLoading }: MessageListProps) {
  return (
    <div className="space-y-4">
      {messages.map(message => (
        <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className={`max-w-[80%] text-sm py-1.5 px-2 p-3 rounded-lg ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
            }`}>
            {message.content}
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
    </div>
  )
}
