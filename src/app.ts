import express from "express"
import { callOpenAI } from "./api"
import { getItems } from "./hasura"

export interface ActionPayload<T> {
  action: {
    name: string
  }
  input: T
  request_query: string
  session_variables: Record<string, string>
}

const app = express()
const port = 3001

app.get("/", (_, res) => {
  res.send("Hello World!")
})

interface TypedRequestBody<T> extends Express.Request {
  headers: Record<string, string>
  body: T
  query: T
}

interface CanIRecycleQuery {
  state: string
  item: string
}

app.get(
  "/CanIRecycle",
  async (req: TypedRequestBody<CanIRecycleQuery>, res: any) => {
    const { state, item } = req.query

    const response = (await doesItemAlreadyExist(item))
      ? "exists"
      : await callOpenAI(state, item)

    res.send(response)
  }
)

const doesItemAlreadyExist = async (itemName: string) => {
  const { items } = await getItems(itemName)

  return items.length > 0
}

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`)
})
