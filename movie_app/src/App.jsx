import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import MovieDetail from './pages/MovieDetails'
import Footer from './components/footer'
import Navbar from './components/Navbar'
import MovieHome from './pages/MovieHome'
import TvHome from './pages/TvHome'
import TvDetails from './pages/TvDetails'
import Sports from './pages/sports'
import CreateMovieList from './pages/CreatePost'
import Home from './pages/Home'
const AddMovieToList = React.lazy(() => import('./pages/AddMovieToList'));

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie" element={<MovieHome />} />
        <Route path="/movie/create" element={<CreateMovieList />} />
        <Route path="/movie/create/add" element={
          <React.Suspense fallback={<div>Loading...</div>}>
            <AddMovieToList />
          </React.Suspense>
        } />
        <Route path="/tv" element={<TvHome />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/tv/:id" element={<TvDetails />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
