import React from 'react'

export default function MessageModel({icon,iconStyle,title,titleStyle,cardStyle}) {
return (
    <>
        <div className='bg-gray-600 bg-opacity-25 fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center '>
            <div className="w-full h-full flex justify-center items-center">
                <div className="p-4 w-full max-w-md">
                    <div className={`bg-white rounded-lg shadow ${cardStyle}`}>
                        <div className="p-4 md:p-5 text-center">
                            <div>
                                <i className={`fa-solid fa-${icon} text-5xl mb-4 ${iconStyle}`}></i>
                            </div>
                            <h3 className={titleStyle}>{title}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
)
}
