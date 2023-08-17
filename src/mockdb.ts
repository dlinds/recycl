import { readFileSync } from "node:fs"
import { createServer } from "@graphql-yoga/node"
import { Resolvers } from "./gql/server/resolvers-types"

const typeDefs = readFileSync("./schema.graphql", "utf8")

const resolvers: Resolvers = {
  Query: {
    items: async () => {
      return [
        {
          id: 1,
          name: "frozen pizza box",
          isRecyclable: false,
          alternativeUses: [
            "Composting",
            "Use as kindling for fire",
            "Reuse for crafts or storage",
          ],
        },
        {
          id: 2,
          name: "amazon box",
          isRecyclable: true,
          alternativeUses: [
            "Composting",
            "Use as kindling for fire",
            "Reuse for crafts or storage",
          ],
        },
      ]
    },
  },
}

export const graphQLServer = createServer({ schema: { typeDefs, resolvers } })
