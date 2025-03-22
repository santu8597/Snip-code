import TweetForm from "@/components/utils/tweet-form"

export default function Home() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-2xl font-bold text-center mb-6">Twitter Poster</h1>
      <TweetForm />
    </main>
  )
}

