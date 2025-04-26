import React from 'react';

export default function InputField({ onClick,iconRight,iconRightStyle,name, value, onChange, onBlur, inputType, type, title, styleSpan, inputStyle, placeholder, icon, iconStyle }) {
    if (type === "input") {
        return (
            <label className='flex flex-col w-full'>
                <span className={styleSpan}>{title}</span>
                <div className='relative'>
                    <i className={`fa fa-${icon} ${iconStyle}`} />
                    <input id={name} onClick={onClick} name={name} value={value || ""} onChange={onChange} onBlur={onBlur} type={inputType} placeholder={placeholder} className={inputStyle} />
                    <i className={`fa fa-${iconRight} ${iconRightStyle}`} />
                </div>
            </label>
        )
    } else if (type === "textarea") {
        return (
            <label className='flex flex-col w-full'>
                <span className={styleSpan}>{title}</span>
                <div className='relative'>
                    <i className={`fa fa-${icon} ${iconStyle}`} />
                    <textarea id={name} name={name} value={value || ""} onChange={onChange} onBlur={onBlur} placeholder={placeholder} className={inputStyle} />
                </div>
            </label>
        )
    }
}
