import { useState } from 'react'
import SignupForm from './components/SignupForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SignupForm />
    </>
  )
}

export default App
