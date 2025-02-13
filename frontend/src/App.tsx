import { useState } from 'react'
import './App.css'
import TaskManager from './Pages/Task'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <LoginForm /> */}
      {/* <SignupForm /> */}
      <TaskManager />
    </>
  )
}

export default App
