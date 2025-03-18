"use client"
import { useChat } from "ai/react"
import { MessagesSquare, Send } from "lucide-react"
import { Weather } from "@/components/utils/weather"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useRef } from "react"

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "api/weather",
    maxSteps:5,
  })
 const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const scrollToBottom = () => {
      if (scrollAreaRef.current) {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  
    useEffect(() => {
      scrollToBottom()
    }, [messages])
    
  return (
    <div className="container flex h-screen items-center justify-center py-10">
      <Card className="flex h-[700px] w-[calc(100%-2rem)] flex-col">
        <CardHeader className="flex flex-row items-center gap-3 border-b px-6">
          <MessagesSquare className="h-5 w-5" />
          <CardTitle>AI Chat Assistant</CardTitle>
        </CardHeader>

        <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
          <div className="flex flex-col gap-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex flex-col gap-2 ${message.role === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`rounded-lg px-4 py-2 max-w-[80%] ${
                    message.role === "user" ? "bg-gray-50 text-primary-foreground" : "bg-gray-50"
                  }`}
                >
                  {message.content}
                </div>

                {message.toolInvocations?.map((toolInvocation) => {
                  const { toolName, toolCallId, state } = toolInvocation

                  if (state === "result") {
                    if (toolName === "displayWeather") {
                      const { result } = toolInvocation
                      
                      return (
                        <div key={toolCallId} className="rounded-lg border bg-card p-4 shadow-sm">
                          <Weather {...result} />
                        </div>
                      )
                    }
                  } else {
                    return (
                      toolName === "displayWeather" && (
                        <div key={toolCallId} className="flex items-center gap-2 rounded-lg border bg-card p-4">
                          <Skeleton className="h-8 w-8 rounded-full" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-[200px]" />
                            <Skeleton className="h-4 w-[160px]" />
                          </div>
                        </div>
                      )
                    )
                  }
                })}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <CardContent className="border-t p-4">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <Input value={input} onChange={handleInputChange} placeholder="Type a message..." className="flex-1" />
            <Button type="submit" size="icon" disabled={isLoading}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

