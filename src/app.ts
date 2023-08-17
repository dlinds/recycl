import express from "express"
import { test } from "./test"
const app = express()
const port = 3001

app.get("/", (req, res) => {
  console.log("GET /")
  res.send("Hello World!")
})

app.get("/test", (req, res) => {
  console.log(test())
  res.send("Hello World!")
})

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`)
})
