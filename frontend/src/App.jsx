import { useState } from 'react'
import './App.css'

function App() {
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const API_URL = import.meta.env.VITE_API_URL ||
    (window.location.hostname === 'localhost'
      ? 'http://localhost:8000'
      : 'http://backend:8000');

  const fetchData = async (endpoint) => {
    setLoading(true)
    setError('')

    try {
      const res = await fetch(`${API_URL}${endpoint}`)

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const data = await res.json()
      setResponse(data.text || JSON.stringify(data))
    } catch (err) {
      setError(`Failed to fetch: ${err.message}`)
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleRandom = () => {
    fetchData('/api/random')
  }

  const handleNext = () => {
    fetchData('/api/list/next')
  }

  return (
    <div className="app-container">
      <div className="card">
        <h1>Vibe Code App</h1>
        <p className="subtitle">Automation Testing Demo</p>

        <div className="response-container">
          <textarea
            data-testid="response-box"
            className="response-box"
            value={response}
            readOnly
            placeholder="Click a button to fetch data from the API..."
            rows={6}
          />
          {error && <div className="error-message">{error}</div>}
        </div>

        <div className="button-container">
          <button
            data-testid="btn-random"
            onClick={handleRandom}
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? 'Loading...' : 'Random'}
          </button>

          <button
            data-testid="btn-next"
            onClick={handleNext}
            disabled={loading}
            className="btn btn-secondary"
          >
            {loading ? 'Loading...' : 'Next'}
          </button>
        </div>

        <div className="api-info">
          <small>API: {API_URL}</small>
        </div>
      </div>
    </div>
  )
}

export default App
