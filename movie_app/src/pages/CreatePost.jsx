import { useState } from 'react'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

function CreateMovieList() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [language, setLanguage] = useState('en')

  const mutation = useMutation({
    mutationFn: async (newList) => {
      const res = await axios.post('https://api.themoviedb.org/3/list', newList, {
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
    mutation.mutate({ name, description, language })
  }

  return (
    <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-8 mt-10 flex flex-col items-center">
      <h1 className="text-2xl font-bold text-blue-900 mb-6 text-center">Create Movie List (TMDB)</h1>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <input
          type="text"
          placeholder="List Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="text"
          placeholder="Language (e.g. en)"
          value={language}
          onChange={e => setLanguage(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <button
          type="submit"
          className="bg-blue-800 text-white font-semibold rounded-lg px-6 py-2 shadow hover:bg-blue-900 transition cursor-pointer"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? 'Creating...' : 'Create List'}
        </button>
        
          <Link to='./add' className='bg-blue-800 text-white font-semibold rounded-lg px-6 py-2 shadow hover:bg-blue-900 transition cursor-pointer text-center'> Add movie </Link>
       
        {mutation.isSuccess && (
          <>
            <p className="text-green-600">List created!</p>
            {mutation.data && (mutation.data.list_id || mutation.data.id) && (
              <p className="text-blue-800 mt-2">List ID: {mutation.data.list_id || mutation.data.id}</p>
            )}
          </>
        )}
        {mutation.isError && <p className="text-red-600">Error creating list. {mutation.error?.response?.data?.errors?.[0]}</p>}
      </form>
    </div>
  )
}

export default CreateMovieList
