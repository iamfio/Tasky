import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'

export default function Quotes() {
  const [quote, setQuote] = useState(null)

  const getRandomQuote = async () => {
    const { data } = await axios.get('https://api.goprogram.ai/inspiration')
    setQuote(data)
  }

  useEffect(() => {
    getRandomQuote()
  }, [])

  return (
    <>
      {quote && (
        <div
          className="border rounded-lg w-full text-center text-sm p-2 mt-4 cursor-pointer select-none"
          // onClick={getRandomQuote}
        >
          <div className="font-serif antialiased mb-1">{quote?.quote}</div>
          <div className="font-mono antialiased">- {quote?.author}</div>
        </div>
      )}
    </>
  )
}
