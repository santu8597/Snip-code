"use server"

import { z } from "zod"
import { createHmac, randomBytes } from "node:crypto"

// Define schema for tweet validation
const tweetSchema = z.object({
  tweet: z.string().min(1, "Tweet cannot be empty").max(280, "Tweet cannot exceed 280 characters"),
})

// Helper function to generate OAuth signature
function generateOAuthSignature(
  method: string,
  url: string,
  params: Record<string, string>,
  consumerSecret: string,
  tokenSecret: string,
) {
  // Create parameter string
  const paramString = Object.keys(params)
    .sort()
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join("&")

  // Create signature base string
  const signatureBaseString = `${method}&${encodeURIComponent(url)}&${encodeURIComponent(paramString)}`

  // Create signing key
  const signingKey = `${encodeURIComponent(consumerSecret)}&${encodeURIComponent(tokenSecret)}`

  // Generate signature
  const signature = createHmac("sha1", signingKey).update(signatureBaseString).digest("base64")

  return signature
}

// Helper function to generate OAuth header
function generateOAuthHeader(params: Record<string, string>) {
  return (
    "OAuth " +
    Object.keys(params)
      .map((key) => `${encodeURIComponent(key)}="${encodeURIComponent(params[key])}"`)
      .join(", ")
  )
}

export async function sendTweet(formData: FormData) {
  // Validate the tweet content
  const tweet = formData.get("tweet") as string

  const validationResult = tweetSchema.safeParse({ tweet })

  if (!validationResult.success) {
    return {
      success: false,
      message: validationResult.error.errors[0].message,
    }
  }

  try {
    // Twitter API credentials
    const apiKey = process.env.TWITTER_API_KEY
    const apiKeySecret = process.env.TWITTER_API_KEY_SECRET
    const accessToken = process.env.TWITTER_ACCESS_TOKEN
    const accessTokenSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET

    // Check if credentials are available
    if (!apiKey || !apiKeySecret || !accessToken || !accessTokenSecret) {
      return {
        success: false,
        message: "Twitter API credentials are not configured",
      }
    }

    // Twitter API endpoint for posting tweets
    const url = "https://api.x.com/2/tweets"

    // Generate OAuth parameters
    const timestamp = Math.floor(Date.now() / 1000).toString()
    const nonce = randomBytes(16).toString("hex")

    // Parameters for the request
    const params: Record<string, string> = {
      status: tweet,
      oauth_consumer_key: apiKey,
      oauth_nonce: nonce,
      oauth_signature_method: "HMAC-SHA1",
      oauth_timestamp: timestamp,
      oauth_token: accessToken,
      oauth_version: "1.0",
    }

    // Generate OAuth signature
    const signature = generateOAuthSignature("POST", url, params, apiKeySecret, accessTokenSecret)

    // Add signature to OAuth parameters
    const oauthParams = {
      oauth_consumer_key: apiKey,
      oauth_nonce: nonce,
      oauth_signature: signature,
      oauth_signature_method: "HMAC-SHA1",
      oauth_timestamp: timestamp,
      oauth_token: accessToken,
      oauth_version: "1.0",
    }

    // Generate OAuth header
    const authHeader = generateOAuthHeader(oauthParams)

    // Make request to Twitter API
    const response = await fetch(`${url}?status=${encodeURIComponent(tweet)}`, {
      method: "POST",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Twitter API error:", errorData)
      return {
        success: false,
        message: `Failed to send tweet: ${errorData.errors?.[0]?.message || "Unknown error"}`,
      }
    }

    const data = await response.json()
    console.log("Tweet posted successfully:", data.id_str)

    return {
      success: true,
      message: "Tweet sent successfully!",
    }
  } catch (error) {
    console.error("Error sending tweet:", error)
    return {
      success: false,
      message: "An error occurred while sending the tweet",
    }
  }
}

