// App.tsx
import React from 'react'
import CryptoWebSocket from './components/CryptoWebSocket'
import CryptoPrice from './components/CryptoPrice'

const App: React.FC = () => {
  return (
    <div className="App">
      <CryptoWebSocket />
      <h1 className="text-4xl text-center mt-8">Dashboard</h1>
      <div className="flex flex-wrap justify-center">
        <CryptoPrice symbol="BTCUSDT" />
        <CryptoPrice symbol="ETHUSDT" />
        <CryptoPrice symbol="SOLUSDT" />
        <CryptoPrice symbol="DOGEUSDT" />
      </div>
    </div>
  )
}

export default App
