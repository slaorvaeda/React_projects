import { useState } from 'react'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'

function AddMovieToList() {
  const [listId, setListId] = useState('')
  const [movieId, setMovieId] = useState('')

  const mutation = useMutation({
    mutationFn: async ({ listId, movieId }) => {
      const res = await axios.post(`https://api.themoviedb.org/3/list/${listId}/add_item`, {
        media_id: movieId
      }, {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzM2YTUzYzI3MmZmMzZjZWQyYzMyM2JhODk3MTk0NSIsIm5iZiI6MTcyNTQ0NTI3MC44ODgsInN1YiI6IjY2ZDgzNDk2MjNiZDk2NWIwNTFhYjgzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LlAOUozfqQmqJWYc8yB0USEKQ_JTBj9_XVmu74siIEo',
          accept: 'application/json',
          'content-type': 'application/json',
        },
      })
      return res.data
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate({ listId, movieId })
  }

  return (
    <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-8 mt-10 flex flex-col items-center">
      <h1 className="text-2xl font-bold text-blue-900 mb-6 text-center">Add Movie to TMDB List</h1>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <input
          type="text"
          placeholder="List ID"
          value={listId}
          onChange={e => setListId(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="text"
          placeholder="Movie ID"
          value={movieId}
          onChange={e => setMovieId(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <button
          type="submit"
          className="bg-blue-800 text-white font-semibold rounded-lg px-6 py-2 shadow hover:bg-blue-900 transition cursor-pointer"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? 'Adding...' : 'Add Movie'}
        </button>
        {mutation.isSuccess && (
          <p className="text-green-600">{mutation.data.status_message || 'Movie added to list!'}</p>
        )}
        {mutation.isError && <p className="text-red-600">Error: {mutation.error?.response?.data?.status_message || 'Failed to add movie.'}</p>}
      </form>
    </div>
  )
}

export default AddMovieToList
