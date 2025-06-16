import React, { useState } from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

function Sports() {
  const [search, setSearch] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  // Query for sports movies from TMDB (genre id 28 for Action, as TMDB does not have a 'Sports' genre)
  const { data: sportsMovies, isLoading } = useQuery({
    queryKey: ['sports-movies', searchQuery],
    queryFn: async () => {
      let url = 'https://api.themoviedb.org/3/discover/movie?with_genres=28&page=1'
      if (searchQuery) {
        url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchQuery)}`
      }
      const res = await axios.get(url, {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzM2YTUzYzI3MmZmMzZjZWQyYzMyM2JhODk3MTk0NSIsIm5iZiI6MTcyNTQ0NTI3MC44ODgsInN1YiI6IjY2ZDgzNDk2MjNiZDk2NWIwNTFhYjgzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LlAOUozfqQmqJWYc8yB0USEKQ_JTBj9_XVmu74siIEo',
          accept: 'application/json',
        },
      })
      return res.data.results
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 py-10 m-auto max-w-[90%] rounded-2xl mt-10 flex flex-col items-center">
      <h1 className="text-blue-900 font-bold text-4xl mb-10 tracking-wide text-center">Sports Movies</h1>
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-10 w-[90%] m-auto">
        <input
          placeholder="Search sports movies..."
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center px-4 w-full">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow flex flex-col items-center animate-pulse"
            >
              <div className="w-full h-64 bg-gray-200" />
              <div className="w-3/4 h-6 bg-gray-200 mt-4 mb-6 rounded" />
            </div>
          ))
        ) : sportsMovies && sportsMovies.length > 0 ? (
          sportsMovies.map(movie => (
            <div
              key={movie.id}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow flex flex-col items-center"
            >
              <img
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/vite.svg'}
                alt={movie.title}
                className="w-full h-64 object-cover bg-gray-200"
              />
              <p className="m-0 p-4 text-base font-medium text-blue-900 w-full text-center bg-white">{movie.title}</p>
            </div>
          ))
        ) : (
          <p className="text-blue-900 text-lg mt-10 col-span-full text-center">No sports movies found.</p>
        )}
      </div>
    </div>
  )
}

export default Sports