import { useState } from 'react'
import './App.css'
import TaskManager from './Components/Task'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      {/* <LoginForm /> */}
      {/* <SignupForm /> */}
      <TaskManager />
    </>
  )
}

export default App
