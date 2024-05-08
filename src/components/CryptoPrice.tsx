import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

interface Props {
  symbol: string
}

const CryptoPrice: React.FC<Props> = ({ symbol }) => {
  const { price, initialPrice } = useCryptoData(symbol)
  const { name, color } = getCoinInfo(symbol)
  const change = calculateChange(price, initialPrice)
  const changeColorClass = getChangeColorClass(change)
  const formattedPrice = formatCurrency(price)
  const formattedInitialPrice = formatCurrency(initialPrice)

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4 m-2 rounded shadow">
    <div className={`${color} p-4 rounded flex flex-col`}>
      <h2 className="text-xl font-bold mb-2">{name}</h2>
      <div className="flex justify-between">
        <p>Preço Atual:</p>
        <p>{formattedPrice}</p>
      </div>
      <div className="flex justify-between">
        <p>Preço Inicial:</p>
        <p>{formattedInitialPrice}</p>
      </div>
      <div className={`flex justify-between ${changeColorClass}`}>
        <p>Variação:</p>
        <p className={changeColorClass}>{change.toFixed(2)}%</p>
      </div>
    </div>
  </div>
  )
}

const useCryptoData = (symbol: string) => {
  const price = useSelector((state: RootState) => state.crypto.prices[symbol])
  const initialPrice = useSelector((state: RootState) => state.crypto.initialPrices[symbol])
  return { price, initialPrice }
}

const getCoinInfo = (symbol: string) => {
  const coinInfo: { [key: string]: { name: string; color: string } } = {
    BTCUSDT: { name: 'Bitcoin (BTC)', color: 'bg-blue-200' },
    ETHUSDT: { name: 'Ethereum (ETH)', color: 'bg-green-200' },
    SOLUSDT: { name: 'Solana (SOL)', color: 'bg-yellow-200' },
    DOGEUSDT: { name: 'Dogecoin (DOGE)', color: 'bg-purple-200' },
  }
  return coinInfo[symbol] || { name: 'Unknown', color: 'bg-gray-200' }
}

const calculateChange = (price: number | undefined, initialPrice: number | undefined) => {
  return price && initialPrice ? ((price - initialPrice) / initialPrice) * 100 : 0
}

const getChangeColorClass = (change: number) => {
  return change < 0 ? 'text-red-500' : ''
}

const formatCurrency = (amount: number | undefined) => {
  return amount ? new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount) : '$0'
}

export default CryptoPrice
