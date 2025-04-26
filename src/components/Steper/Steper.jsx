import React from 'react'

export default function Steper({stepStyle,icon}) {
  return (
    <>
        <ol className="relative flex items-center pt-10 ">
            <li className="flex flex-col items-center px-6 relative ">
                <span className={`flex items-center justify-center w-8 h-8 ${stepStyle} bg-gray-100 rounded-full ring-4 ring-white`}>
                    <i className={`fa-solid fa-${icon == "check" ? "address-card" : "check"}`}></i>
                </span>
                <h3 className="font-medium leading-tight mt-2">Signup Info</h3>
                <p className="text-sm">Step 1</p>
                <div className="absolute w-3/4 h-[1px] bg-gray-400 bottom-3/4 z-0 left-full transform -translate-x-[43%] translate-y-3/4 "></div>
            </li>
            <li className="flex flex-col items-center px-6 relative ">
                <span className="flex items-center justify-center w-8 h-8 bg-green-200 rounded-full ring-4 ring-white">
                    <i className={`fa-solid fa-${icon == "file-invoice" ? "file-invoice" : "check"}`}></i>
                </span>
                <h3 className="font-medium leading-tight mt-2">Active account</h3>
                <p className="text-sm">Step 2</p>
            </li>
        </ol>
    </>
  )
}
