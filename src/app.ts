import express from "express"
import { callOpenAI } from "./api"
const app = express()
const port = 3001

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.get("/test", (req, res) => {
  console.log(callOpenAI("Oregon", "apple"))
  res.send("Hello World!")
})

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`)
})
