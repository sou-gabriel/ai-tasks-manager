
import { AppNav } from "@/components/app-nav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AppLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='max-w-2xl mx-auto'>
      <header className='flex items-center justify-between p-4 border-b mb-4'>
        <AppNav />
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className='size-8' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </header>
      <main>
        {children}
      </main>
    </div>
  )
}
