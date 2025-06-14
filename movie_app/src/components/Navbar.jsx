import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <>
     <nav className="bg-blue-800 text-white p-3 text-center text-3xl w-[85%] m-auto rounded-2xl mt-10 shadow-lg ">
        <Link to="/" >Movie Zone</Link>
      </nav>
    </>
  )
}

export default Navbar