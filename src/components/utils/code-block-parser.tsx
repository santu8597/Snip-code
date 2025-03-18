"use client"

import type React from "react"
import { CodePreview } from "@/components/utils/code-preview"

interface CodeBlockParserProps {
  content: string
}

export function CodeBlockParser({ content }: CodeBlockParserProps) {
  // Regular expression to match code blocks with language specification
  // Matches: \`\`\`language\ncode\n\`\`\`
  const codeBlockRegex = /```(jsx|tsx|html|css|react|js|javascript)?\n([\s\S]*?)```/g

  // Add a debug function to help troubleshoot
  const debugCodeBlock = (language: string, code: string) => {
    console.log(`Found code block with language: ${language || "unspecified"}`)
    console.log(`Code length: ${code.length} characters`)
  }

  const parts: React.ReactNode[] = []
  let lastIndex = 0
  let match

  // Find all code blocks in the content
  while ((match = codeBlockRegex.exec(content)) !== null) {
    // Add text before the code block
    if (match.index > lastIndex) {
      parts.push(content.substring(lastIndex, match.index))
    }

    const language = match[1] || "text"
    const code = match[2].trim()

    // Debug the detected code block
    debugCodeBlock(language, code)

    // Add the code block with preview
    parts.push(<CodePreview key={`code-${match.index}`} code={code} language={language} />)

    lastIndex = match.index + match[0].length
  }

  // Add any remaining text after the last code block
  if (lastIndex < content.length) {
    parts.push(content.substring(lastIndex))
  }

  return <div>{parts.map((part, index) => (typeof part === "string" ? <span key={index}>{part}</span> : part))}</div>
}

