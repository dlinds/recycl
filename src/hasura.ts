const fetch = require("node-fetch")

const HASURA_ENDPOINT = "http://localhost:8080/v1/graphql"
const HASURA_ADMIN_SECRET = "myadminsecretkey"

export async function fetchHasura(query: any, variables = {}) {
  const response = await fetch(HASURA_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": HASURA_ADMIN_SECRET,
    },
    body: JSON.stringify({ query, variables }),
  })

  const responseBody = await response.json()

  if (responseBody.errors) {
    throw new Error(JSON.stringify(responseBody.errors))
  }

  return responseBody.data
}

// Example usage:
// const MY_QUERY = `
//   query {
//     items {
//       id
//       name
//     }
//   }
// `

// fetchHasura(MY_QUERY).then((data) => console.log(data))

export const getItems = async (itemName: string) => {
  // make query to to check if name already exists
  const query = `

  query {
    items(where: {name: {_eq: "${itemName}"}}) {
      id
      name
    }
  }

  `

  return await fetchHasura(query)
}
