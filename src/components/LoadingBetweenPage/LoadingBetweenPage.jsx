import React from 'react'

export default function LoadingBetweenPage() {
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50'>
      {/* Background with gradient and slight blur */}
      <div className='absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-br from-gray-950 to-gray-900 opacity-90 backdrop-blur-md'></div>

      {/* Loading content */}
      <div className="relative z-10 flex flex-col justify-center items-center">
        <div className="text-center text-5xl font-extrabold text-white space-x-2">
          <span className='animate-pulse '>EDUMATEK</span>
          <span className='animate-ping text-yellow-400'>PRIME</span>
        </div>

        {/* Spinner with gradient effect */}
        <div className="mt-6 w-16 h-16 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full animate-spin border-t-4 border-transparent"></div>

        {/* Optional loading text */}
        <p className="mt-4 text-lg text-white animate-pulse">Loading, please wait...</p>
      </div>    
    </div>
  )
}
