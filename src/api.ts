import OpenAI from "openai"
import { ENV } from "./env_variables"

const apiKey = ENV.OPENAI_API_KEY

const openai = new OpenAI({
  apiKey: "my api key", // defaults to process.env["OPENAI_API_KEY"]
})

const main = async (state: State, item: string) => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `In the state of ${state}, can you recycle ${item}? If I cannot, what can I do with ${item} instead? I want a JSON response in the following shape
        {
          isRecyclable: boolean,
          alternatives?: string[]
        }
    `,
      },
    ],
    model: "gpt-4",
  })

  console.log(completion.choices)
}

type State = "Oregon" | "Arizona"

export const callOpenAI = (state: State, item: string): string => {
  return `${apiKey} `
}
