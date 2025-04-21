import React from 'react';

export default function InputUpload({ hidden,title, subTitle, name, onChange, onBlur,paraStyle,labelStyle }) {
    return (
        <label className={`flex items-center justify-center w-full ${hidden}  `}>
            <label htmlFor={name} className={labelStyle}>
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className={paraStyle}><span className="font-semibold"></span> {title}</p>
                    <p className="text-xs text-gray-500">{subTitle}</p>
                </div>
                <input name={name} onChange={onChange} onBlur={onBlur} id={name} type="file" className="hidden" />
            </label>
        </label>
    );
}
