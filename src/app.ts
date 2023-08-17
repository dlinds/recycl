import express from "express"
import { callOpenAI } from "./api"

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

    const response = await callOpenAI(state, item)

    res.send(response)
  }
)

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`)
})
