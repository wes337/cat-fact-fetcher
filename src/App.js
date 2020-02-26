import React, { useEffect, useState } from 'react'
import CatSpinner from './CatSpinner'
import './App.scss'

function App() {
  const abortController = new AbortController()
  const [facts, setFacts] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    try {
      setLoading(true)
      fetch('https://catfact.ninja/facts?limit=5', {
        signal: abortController.signal,
      })
        .then(response => {
          response.json()
        .then(({ data }) => {
          setFacts(data)
          setLoading(false)
        })
      })
    } catch (error) {
      if (!abortController.signal.aborted) {
        console.log(error)
      }
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()

    return () => {
      abortController.abort()
    }
  }, [])

  if (loading) {
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
      <button onClick={fetchData}>Show me more!</button>
    </div>
  )
}

export default App
