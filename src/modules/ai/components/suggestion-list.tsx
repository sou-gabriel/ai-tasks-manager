import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

type SuggestionListProps = {
  suggestions: string[]
  isLoadingSuggestions: boolean
  selectSuggestion: (suggestion: string) => void
}

export function SuggestionList({
  suggestions,
  isLoadingSuggestions,
  selectSuggestion,
}: SuggestionListProps) {
  return (
    <div className="space-y-2">
            {isLoadingSuggestions ? (
              <>
                {Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton key={index} className='w-full h-[38px]' />
                ))}
              </>
            ) : (
              <>
                {suggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    type='button'
                    variant="outline"
                    className="w-full text-left justify-start h-auto py-2 px-4"
                    onClick={() => {
                      console.log('clico aqui...')
                      selectSuggestion(suggestion)
                    }}

                  >
                    {suggestion}
                  </Button>
                ))}
              </>
            )}
          </div>
  )
}
