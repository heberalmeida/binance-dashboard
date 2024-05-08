import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setPrice } from '../store/cryptoSlice'

const CryptoWebSocket: React.FC = () => {
    const dispatch = useDispatch()
    const ws = useRef<WebSocket | null>(null)
    const [retryCount, setRetryCount] = useState(0)

    useEffect(() => {
        const connect = () => {
            if (retryCount >= 5) {
                console.log("Máximo de tentativas. Parando a reconexão")
                return
            }

            const websocket = new WebSocket('wss://stream.binance.com:9443/ws/!miniTicker@arr')
            websocket.onopen = () => {
                console.log("WebSocket conexão  ok =)")
                ws.current = websocket
                setRetryCount(0)
            }

            websocket.onmessage = (event) => {
                const data = JSON.parse(event.data)
                data.forEach(({ s: symbol, c: price }: { s: string; c: string }) => {
                    dispatch(setPrice({ symbol, price: parseFloat(price) }))
                })
            }

            websocket.onclose = (event) => {
                console.log("Conexão WebSocket fechada com código:", event.code)
                console.log("Reconectando em 1 segundo...")
                setTimeout(connect, 1000 * 2 ** retryCount)
                setRetryCount(retryCount + 1)
            }

            websocket.onerror = (error) => {
                console.error("WebSocket Erro:", error)
                websocket.close()
            }
        }

        connect()

        return () => {
            if (ws.current) {
                ws.current.close()
                console.log("WebSocket conexão fechada")
            }
        }
    }, [dispatch, retryCount])

    return null
}

export default CryptoWebSocket
