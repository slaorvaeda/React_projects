import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <>
     <nav className="bg-blue-800 text-white p-3 text-center text-3xl w-[85%] m-auto rounded-2xl mt-10 shadow-lg flex justify-between items-center">
        <Link to="/" className="font-bold text-2xl tracking-wide">Movie Zone</Link>
        <div className="flex gap-8 text-lg">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/movie" className="hover:underline">Movies</Link>
          <Link to="/tv" className="hover:underline">TV</Link>
          <Link to="/sports" className="hover:underline">sports</Link>
        </div>
      </nav>
    </>
  )
}

export default Navbar