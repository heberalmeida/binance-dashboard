import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CryptoState, SetPriceAction } from '../types/cryptoTypes'

const initialState: CryptoState = {
  prices: {},
  initialPrices: {}
}

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    setPrice: (state, action: PayloadAction<SetPriceAction>) => {
      const { symbol, price } = action.payload
      state.prices[symbol] = price
      state.initialPrices[symbol] = state.initialPrices[symbol] || price
    }
  }
})

export const { setPrice } = cryptoSlice.actions
export default cryptoSlice.reducer
