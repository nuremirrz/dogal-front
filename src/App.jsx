import { useState } from 'react'
import './App.css'
import TestComponent from './TestComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1>test</h1>
    <TestComponent/>
    </>
  )
}

export default App
