import { useState } from 'react'
import { Routes ,Route } from 'react-router-dom'
import Home from './pages/Home'
import CreateBook from './pages/CreateBook'
import ShowBook from './pages/ShowBook'
import DeleteBook from './pages/DeleteBook'
import EditBook from './pages/EditBook'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/books/create' element={<CreateBook />}/>
      <Route path='/books/details/:id' element={<ShowBook />}/>
      <Route path='/books/edit/:id' element={<EditBook />}/>
      <Route path='/books/delete/:id' element={<DeleteBook />}/>
     </Routes>
    </>
  )
}

export default App
