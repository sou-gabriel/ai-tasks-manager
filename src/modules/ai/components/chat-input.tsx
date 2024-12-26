import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

type ChatInputProps = {
  input: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

export function ChatInput({ input, isLoading, onSubmit, onInputChange }: ChatInputProps) {
  return (
    <form onSubmit={onSubmit} className="flex w-full space-x-2">
      <Input
        value={input}
        onChange={onInputChange}
        placeholder="Type your message..."
        className="flex-grow"
      />
      <Button type="submit" disabled={isLoading}>
        <Send className="h-4 w-4" />
      </Button>
    </form>
  )
}
