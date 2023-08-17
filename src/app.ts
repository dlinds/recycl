import express from "express"
import { callOpenAI } from "./api"

const app = express()
const port = 3001

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.get("/query", async (req, res) => {
  const response = await callOpenAI("Oregon", "amazon box")

  res.send(response)
})

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`)
})
