import { useState } from 'react'

import AllRoutes from './component/AllRoutes'
import Navbar from './component/Navbar'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
      <AllRoutes/>
    </>
  )
}

export default App
