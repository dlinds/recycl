import OpenAI from "openai"
import { ENV } from "./env_variables"

const apiKey = ENV.OPENAI_API_KEY

const openai = new OpenAI({
  apiKey,
})

const main = async (state: State, item: string) => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `In the state of ${state}, can you recycle ${item}? If I cannot, what can I do with ${item} instead? I want a JSON response in the following shape. I only want the JSON and nothing else (this is for an API app)
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

type State = "Oregon" | "Arizona"

export const callOpenAI = async (
  state: State,
  item: string
): Promise<IsRecyclable> => {
  const apiResponse = await main(state, item)

  return parseResponse(apiResponse)
}

interface IsRecyclable {
  isRecyclable: boolean
  alternatives?: string[]
}

const parseResponse = (response: any): IsRecyclable => {
  const parsed = JSON.parse(response[0].message.content)

  const formatted: IsRecyclable = {
    isRecyclable: parsed.isRecyclable,
    alternatives: parsed.alternatives,
  }

  return formatted
}
