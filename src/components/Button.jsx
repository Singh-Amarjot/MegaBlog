import React, { forwardRef } from 'react'

function Button({
 type ,
 className="",
 children,
 bgColor = 'bg-blue-600',
 textColor = 'text-white',
 ...props
},ref) {
    return (
        <button className={`px-4 py-2 rounded-lg 
        ${bgColor} ${textColor} ${className}`} {...props} ref={ref}>
            {children}
            </button>
      )
}

export default forwardRef(Button)