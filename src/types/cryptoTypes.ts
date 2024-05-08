export interface CryptoState {
  prices: Record<string, number>
  initialPrices: Record<string, number>
}

export interface SetPriceAction {
  symbol: string
  price: number
}

export const SET_PRICE = 'SET_PRICE'
