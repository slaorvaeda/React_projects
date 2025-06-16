import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

function fetchChangedMovies() {
  return axios.get('https://api.themoviedb.org/3/movie/changes?page=2', {
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzM2YTUzYzI3MmZmMzZjZWQyYzMyM2JhODk3MTk0NSIsIm5iZiI6MTcyNTQ0NTI3MC44ODgsInN1YiI6IjY2ZDgzNDk2MjNiZDk2NWIwNTFhYjgzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LlAOUozfqQmqJWYc8yB0USEKQ_JTBj9_XVmu74siIEo',
      accept: 'application/json',
    },
  })
}

async function fetchMovieDetails(ids) {
  const detailPromises = ids.map(id =>
    axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzM2YTUzYzI3MmZmMzZjZWQyYzMyM2JhODk3MTk0NSIsIm5iZiI6MTcyNTQ0NTI3MC44ODgsInN1YiI6IjY2ZDgzNDk2MjNiZDk2NWIwNTFhYjgzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LlAOUozfqQmqJWYc8yB0USEKQ_JTBj9_XVmu74siIEo',
        accept: 'application/json',
      },
    }).then(r => r.data).catch(() => null)
  )
  return (await Promise.all(detailPromises)).filter(Boolean)
}

function MovieHome() {
  const [search, setSearch] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  // Query for changed movie IDs
  const { data: changesData, isLoading: loadingChanges } = useQuery({
    queryKey: ['movie-changes'],
    queryFn: fetchChangedMovies
  })

  // Query for movie details
  const ids = changesData?.data?.results ? changesData.data.results.slice(0, 12).map(m => m.id) : []
  const {
    data: movies,
    isLoading: loadingDetails
  } = useQuery({
    queryKey: ['movie-details', ids],
    queryFn: () => fetchMovieDetails(ids),
    enabled: ids.length > 0 && !searchQuery
  })

  // Query for search
  const {
    data: searchResults,
    isLoading: loadingSearch
  } = useQuery({
    queryKey: ['movie-search', searchQuery],
    queryFn: async () => {
      if (!searchQuery) return null
      const res = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchQuery)}`, {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzM2YTUzYzI3MmZmMzZjZWQyYzMyM2JhODk3MTk0NSIsIm5iZiI6MTcyNTQ0NTI3MC44ODgsInN1YiI6IjY2ZDgzNDk2MjNiZDk2NWIwNTFhYjgzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LlAOUozfqQmqJWYc8yB0USEKQ_JTBj9_XVmu74siIEo',
          accept: 'application/json',
        },
      })
      return res.data.results
    },
    enabled: !!searchQuery
  })

  const loading = loadingChanges || loadingDetails || loadingSearch
  const displayMovies = searchQuery ? searchResults || [] : movies || []

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 py-10 m-auto max-w-[90%] rounded-2xl mt-10">
        <h1 className="flex justify-center items-center text-blue-900 font-bold text-4xl mb-10 tracking-wide text-center">Movie Explorer 
          <div className="text-sm border rounded-2xl items-center ml-10 p-2 cursor-pointer">
            <Link to='./create'>+Createlist</Link>
            </div></h1>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-10 w-[90%] m-auto">
          <input
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="min-w-[320px] px-4 py-2 rounded-lg bg-white text-blue-900 text-base shadow focus:outline-none focus:ring-2 focus:ring-blue-400 border border-gray-300 transition"
          />
          <button
            onClick={() => setSearchQuery(search)}
            className="bg-blue-800 text-white font-semibold rounded-lg px-6 py-2 shadow hover:bg-blue-900 transition cursor-pointer"
          >
            Search
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center px-4">
          {loading ? (
            Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow flex flex-col items-center animate-pulse"
              >
                <div className="w-full h-64 bg-gray-200" />
                <div className="w-3/4 h-6 bg-gray-200 mt-4 mb-6 rounded" />
              </div>
            ))
          ) : displayMovies.length === 0 ? (
            <p className="text-blue-900 text-lg mt-10 col-span-full text-center">No movies found.</p>
          ) : (
            displayMovies.map(movie => (
              <Link
                key={movie.id}
                to={`/movie/${movie.id}`}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow hover:scale-105 hover:shadow-lg transition transform duration-200 flex flex-col items-center"
              >
                <img
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/vite.svg'}
                  alt={movie.title}
                  className="w-full h-64 object-cover bg-gray-200"
                />
                <p className="m-0 p-4 text-base font-medium text-blue-900 w-full text-center bg-white">{movie.title}</p>
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default MovieHome
