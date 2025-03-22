"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { sendTweet } from "../../app/action"
import { useFormStatus } from "react-dom"

// Update the SubmitButton component to show a more informative loading state
function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending} className="min-w-[100px]">
      {pending ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Tweeting...
        </span>
      ) : (
        "Tweet"
      )}
    </Button>
  )
}

export default function TweetForm() {
  const [message, setMessage] = useState("")
  const [tweetResult, setTweetResult] = useState<{ success: boolean; message: string } | null>(null)

  async function handleSubmit(formData: FormData) {
    const result = await sendTweet(formData)
    setTweetResult(result)

    if (result.success) {
      setMessage("")
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-xl font-bold mb-4">Post a Tweet</h2>

      <form action={handleSubmit} className="space-y-4">
        <div>
          <Textarea
            name="tweet"
            placeholder="What's happening?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[100px] w-full"
            maxLength={280}
          />
          <p className="text-sm text-gray-500 mt-1 text-right">{message.length}/280</p>
        </div>

        <div className="flex justify-end">
          <SubmitButton />
        </div>
      </form>

      {tweetResult && (
        <div
          className={`mt-4 p-3 rounded ${tweetResult.success ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"}`}
        >
          {tweetResult.message}
        </div>
      )}
    </div>
  )
}

