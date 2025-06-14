import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function MovieDetail() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true)
      try {
        const res = await fetch(`https://www.omdbapi.com/?apikey=abec3789&i=${id}&plot=full`)
        let data
        try {
          data = await res.json()
        } catch (jsonError) {
          const text = await res.text()
          setMovie({ error: text })
          setLoading(false)
          return
        }
        if (data.Response === 'True') {
          setMovie(data)
        } else {
          setMovie({ error: data.Error || 'Unknown error from OMDb API.' })
        }
      } catch (error) {
        setMovie({ error: 'Failed to fetch movie details.' })
      }
      setLoading(false)
    }
    fetchMovie()
  }, [id])

  if (loading) return (
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
  if (!movie) return null
  if (movie.error) return <p className="text-red-600 text-center mt-10">Error: {movie.error}</p>

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">{movie.Title}</h1>
      <img
        src={movie.Poster !== 'N/A' ? movie.Poster : '/vite.svg'}
        alt={movie.Title}
        className="w-48 h-72 object-cover rounded-xl shadow mb-6 bg-gray-200"
      />
      <div className="w-full flex flex-col gap-2 text-blue-900 ">
        <p><span className="font-semibold">Year:</span> {movie.Year}</p>
        <p><span className="font-semibold">Genre:</span> {movie.Genre}</p>
        <p><span className="font-semibold">Director:</span> {movie.Director}</p>
        <p><span className="font-semibold">Plot:</span> {movie.Plot}
        </p>
        
        <div className='relative w-full flex justify-end'>
           <button onClick={() => navigate(-1)} className='rounded-full bg-blue-800 text-amber-50 w-18 p-2 '>Return</button>
        </div>
       
      </div>
    </div>
  )
}

export default MovieDetail
