import React, { useCallback, useEffect, useState } from 'react'
import CatSpinner from './CatSpinner'
import './App.scss'

function App() {
  const [facts, setFacts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchFacts = useCallback(async () => {
    const abortController = new AbortController()
    try {
      setIsLoading(true)
      const response = await fetch('https://catfact.ninja/facts?limit=5', { signal: abortController.signal })
      const { data } = await response.json()
      setFacts(data)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }

    return () => {
      abortController.abort()
    }
  }, [])

  useEffect(() => {
    fetchFacts()
  }, [fetchFacts])

  if (isLoading) {
    return <CatSpinner />
  }

  return (
    <div className="App">
      <h1>Me-wow!</h1>
      <ul>
        {facts.map(({ fact, length }, index) => (
          <li key={`${length}-${index}`}>
            {index + 1} - {fact}
          </li>
        ))}
      </ul>
      <button onClick={fetchFacts}>Show me more!</button>
    </div>
  )
}

export default App
