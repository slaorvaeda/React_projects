import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import MovieDetail from './pages/MovieDetails'
import Footer from './components/footer'
import Navbar from './components/Navbar'

function App() {
  return (
    <BrowserRouter>
    <Navbar />
     

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
