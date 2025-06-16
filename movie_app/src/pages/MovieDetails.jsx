import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

function MovieDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  // Movie details query
  const { data: movie, isLoading, error } = useQuery({
    queryKey: ['movie-details', id],
    queryFn: async () => {
      const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzM2YTUzYzI3MmZmMzZjZWQyYzMyM2JhODk3MTk0NSIsIm5iZiI6MTcyNTQ0NTI3MC44ODgsInN1YiI6IjY2ZDgzNDk2MjNiZDk2NWIwNTFhYjgzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LlAOUozfqQmqJWYc8yB0USEKQ_JTBj9_XVmu74siIEo',
          accept: 'application/json',
        },
      })
      return res.data
    }
  })

  // Movie cast query
  const { data: castData, isLoading: loadingCast } = useQuery({
    queryKey: ['movie-cast', id],
    queryFn: async () => {
      const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzM2YTUzYzI3MmZmMzZjZWQyYzMyM2JhODk3MTk0NSIsIm5iZiI6MTcyNTQ0NTI3MC44ODgsInN1YiI6IjY2ZDgzNDk2MjNiZDk2NWIwNTFhYjgzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LlAOUozfqQmqJWYc8yB0USEKQ_JTBj9_XVmu74siIEo',
          accept: 'application/json',
        },
      })
      return res.data.cast
    }
  })

  if (isLoading) return (
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-10 flex flex-col items-center">
      <div className="w-48 h-72 bg-gray-200 rounded-xl mb-6 relative overflow-hidden">
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" style={{backgroundSize: '200% 100%'}} />
      </div>
      <div className="w-64 h-8 bg-gray-200 rounded mb-4 relative overflow-hidden">
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" style={{backgroundSize: '200% 100%'}} />
      </div>
      <div className="w-full flex flex-col gap-2 text-blue-900">
        <div className="w-32 h-6 bg-gray-200 rounded mb-2 relative overflow-hidden">
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" style={{backgroundSize: '200% 100%'}} />
        </div>
        <div className="w-40 h-6 bg-gray-200 rounded mb-2 relative overflow-hidden">
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" style={{backgroundSize: '200% 100%'}} />
        </div>
        <div className="w-36 h-6 bg-gray-200 rounded mb-2 relative overflow-hidden">
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" style={{backgroundSize: '200% 100%'}} />
        </div>
        <div className="w-80 h-20 bg-gray-200 rounded relative overflow-hidden">
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" style={{backgroundSize: '200% 100%'}} />
        </div>
      </div>
    </div>
  )
  if (error) return <p className="text-red-600 text-center mt-10">Error: Failed to fetch movie details.</p>
  if (!movie) return null

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">{movie.title}</h1>
      <img
        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/vite.svg'}
        alt={movie.title}
        className="w-48 h-72 object-cover rounded-xl shadow mb-6 bg-gray-200"
      />
      <div className="w-full flex flex-col gap-2 text-blue-900 ">
        <p><span className="font-semibold">Release Date:</span> {movie.release_date}</p>
        <p><span className="font-semibold">Genres:</span> {movie.genres && movie.genres.map(g => g.name).join(', ')}</p>
        <p><span className="font-semibold">Overview:</span> {movie.overview}</p>
        <div className="my-6">
          <h2 className="text-xl font-semibold mb-2">Cast</h2>
          {loadingCast ? (
            <p>Loading cast...</p>
          ) : castData && castData.length > 0 ? (
            <ul className="grid grid-cols-2 gap-2">
              {castData.slice(0, 10).map(member => (
                <li key={member.cast_id || member.credit_id} className="text-blue-900 text-base">
                  <span className="font-medium">{member.name}</span> <span className="text-gray-600">as</span> <span className="italic">{member.character}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No cast information available.</p>
          )}
        </div>
        <div className='relative w-full flex justify-end'>
           <button onClick={() => navigate(-1)} className='rounded-full bg-blue-800 text-amber-50 w-18 p-2 '>Return</button>
        </div>
      </div>
    </div>
  )
}

export default MovieDetail
