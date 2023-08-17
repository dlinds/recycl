const fetch = require('node-fetch')

const HASURA_ENDPOINT = 'http://localhost:8080/v1/graphql'
const HASURA_ADMIN_SECRET = 'myadminsecretkey'

export async function fetchHasura(query: any, variables = {}) {
  const response = await fetch(HASURA_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
    },
    body: JSON.stringify({ query, variables }),
  })

  const responseBody = await response.json()

  if (responseBody.errors) {
    throw new Error(JSON.stringify(responseBody.errors))
  }

  return responseBody.data
}

export const getItems = async (itemName: string, state: string) => {
  const query = `
    query {
      items(where: {name: {_eq: "${itemName}"}, state: {_eq: "${state}"}}) {
        id
        name
        isRecyclable
        alternativeUses
        state
      }
    }
    `

  return await fetchHasura(query)
}

export const addNewItem = async (
  itemName: string,
  state: string,
  isRecyclable: boolean,
  alternativeUses: string[]
) => {
  const alternativeUsesString =
    alternativeUses.length > 0 ? alternativeUses.join('","') : ''

  const query = `
    mutation {
      insert_items_one(object: {name: "${itemName}", state: "${state}", isRecyclable: ${isRecyclable}, alternativeUses: ["${alternativeUsesString}"]}) {
        id
        name
        isRecyclable
        alternativeUses
        state
      }
    }
  `

  return await fetchHasura(query)
}
