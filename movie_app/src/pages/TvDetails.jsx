import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

function TvDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data: show, isLoading, error } = useQuery({
    queryKey: ['tv-details', id],
    queryFn: async () => {
      const res = await axios.get(`https://api.themoviedb.org/3/tv/${id}`, {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzM2YTUzYzI3MmZmMzZjZWQyYzMyM2JhODk3MTk0NSIsIm5iZiI6MTcyNTQ0NTI3MC44ODgsInN1YiI6IjY2ZDgzNDk2MjNiZDk2NWIwNTFhYjgzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LlAOUozfqQmqJWYc8yB0USEKQ_JTBj9_XVmu74siIEo',
          accept: 'application/json',
        },
      })
      return res.data
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
  if (error) return <p className="text-red-600 text-center mt-10">Error: Failed to fetch TV show details.</p>
  if (!show) return null

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">{show.name}</h1>
      <img
        src={show.poster_path ? `https://image.tmdb.org/t/p/w500${show.poster_path}` : '/vite.svg'}
        alt={show.name}
        className="w-48 h-72 object-cover rounded-xl shadow mb-6 bg-gray-200"
      />
      <div className="w-full flex flex-col gap-2 text-blue-900 ">
        <p><span className="font-semibold">First Air Date:</span> {show.first_air_date}</p>
        <p><span className="font-semibold">Genres:</span> {show.genres && show.genres.map(g => g.name).join(', ')}</p>
        <p><span className="font-semibold">Overview:</span> {show.overview}</p>
        <div className='relative w-full flex justify-end'>
           <button onClick={() => navigate(-1)} className='rounded-full bg-blue-800 text-amber-50 w-18 p-2 '>Return</button>
        </div>
      </div>
    </div>
  )
}

export default TvDetails