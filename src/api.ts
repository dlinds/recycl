import OpenAI from "openai"
import { ENV } from "./env_variables"

const apiKey = ENV.OPENAI_API_KEY

const main = async (location: string, item: string) => {
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY not found")
  }
  const openai = new OpenAI({
    apiKey,
  })
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `In ${location}, can you recycle ${item}? If I cannot, what can I do with ${item} instead? I want a JSON response in the following shape. I only want the JSON and nothing else (this is for an API app)
        {
          isRecyclable: boolean,
          alternatives?: string[]
        }
    `,
      },
    ],
    model: "gpt-4",
  })

  return completion.choices
}

export const callOpenAI = async (
  location: string,
  item: string
): Promise<IsRecyclable> => {
  const apiResponse = await main(location, item)

  return parseResponse(apiResponse)
}

interface IsRecyclable {
  isRecyclable: boolean
  alternatives: string[]
}

const parseResponse = (response: any): IsRecyclable => {
  const parsed = JSON.parse(response[0].message.content)

  const formatted: IsRecyclable = {
    isRecyclable: parsed.isRecyclable,
    alternatives: parsed.alternatives,
  }

  return formatted
}
