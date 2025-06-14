import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Home() {
  const [search, setSearch] = useState('')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    
    const fetchDefaultMovies = async () => {
      setLoading(true)
      const res = await fetch('https://www.omdbapi.com/?apikey=abec3789&s=avengers')
      const data = await res.json()
      if (data.Search) setMovies(data.Search)
      else setMovies([])
      setLoading(false)
    }
    fetchDefaultMovies()
  }, [])

  const handleSearch = async () => {
    setLoading(true)
    const res = await fetch(`https://www.omdbapi.com/?apikey=abec3789&s=${search}`)
    const data = await res.json()
    if (data.Search) setMovies(data.Search)
    else setMovies([])
    setLoading(false)
  }

  return (
      <>
        <title>Movie Explorer</title>
        <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 py-10 m-auto max-w-[90%] rounded-2xl mt-10">
          <h1 className="text-blue-900 font-bold text-4xl mb-10 tracking-wide text-center">Movie Explorer</h1>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-10 w-[90%] m-auto">
            <input
              placeholder="Search movies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="min-w-[320px] px-4 py-2 rounded-lg bg-white text-blue-900 text-base shadow focus:outline-none focus:ring-2 focus:ring-blue-400 border border-gray-300 transition"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-800 text-white font-semibold rounded-lg px-6 py-2 shadow hover:bg-blue-900 transition cursor-pointer"
            >
              Search
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center px-4">
            {loading ? (
              // Skeleton loader grid
              Array.from({ length: 8 }).map((_, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow flex flex-col items-center animate-pulse"
                >
                  <div className="w-full h-64 bg-gray-200" />
                  <div className="w-3/4 h-6 bg-gray-200 mt-4 mb-6 rounded" />
                </div>
              ))
            ) : movies.length === 0 ? (
              <p className="text-blue-900 text-lg mt-10 col-span-full text-center">No movies found.</p>
            ) : (
              movies.map(movie => (
                <Link
                  key={movie.imdbID}
                  to={`/movie/${movie.imdbID}`}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow hover:scale-105 hover:shadow-lg transition transform duration-200 flex flex-col items-center"
                >
                  <img
                    src={movie.Poster !== 'N/A' ? movie.Poster : '/vite.svg'}
                    alt={movie.Title}
                    className="w-full h-64 object-cover bg-gray-200"
                  />
                  <p className="m-0 p-4 text-base font-medium text-blue-900 w-full text-center bg-white">{movie.Title}</p>
                </Link>
              ))
            )}
          </div>
        </div>
      </>
  
  )
}

export default Home
