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
    const { item, state } = req.query

    const currentCachedItems = await getItems(item, state)

    if (currentCachedItems.items.length > 0) {
      res.send(currentCachedItems.items[0])
      return
    }

    const response = await callOpenAI(state, item)

    res.send(response)
  }
)

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`)
})
