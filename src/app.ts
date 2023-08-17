import express from "express"
import { callOpenAI } from "./api"
import { addNewItem, getItems } from "./hasura"

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

    const newItem: Item = {
      name: item,
      state,
      isRecyclable: response.isRecyclable,
      alternativeUses: response.alternatives,
    }

    await handleAddingNewItemToHasura(newItem)

    res.send(newItem)
  }
)

export interface Item {
  name: string
  state: string
  isRecyclable: boolean
  alternativeUses: string[]
}

const handleAddingNewItemToHasura = async (item: Item) => {
  const { name, state, isRecyclable, alternativeUses } = item
  await addNewItem(name, state, isRecyclable, alternativeUses)
}

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`)
})
