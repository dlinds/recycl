export interface CanIRecycleQuery {
  state: string
  item: string
}

export interface Item {
  name: string
  state: string
  isRecyclable: boolean
  alternativeUses: string[]
}

export interface IsRecyclable {
  isRecyclable: boolean
  alternatives: string[]
}
