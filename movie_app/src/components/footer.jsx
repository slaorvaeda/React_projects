import React from 'react'

function Footer() {
  return (
    <footer className="w-full bg-blue-900 text-white py-4 mt-10 shadow-inner">
      <div className="max-w-2xl mx-auto flex flex-col items-center">
       
      
         <p className="text-md text-center">&copy; {new Date().getFullYear()} Movie App. All rights reserved. <br /> Created by Durga Madhab - slaorvaeda</p>
      </div>
    </footer>
  )
}

export default Footer