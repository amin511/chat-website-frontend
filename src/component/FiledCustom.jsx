import React from 'react'

import { ErrorMessage, Field } from 'formik'
const FiledCustom = ({ placeholder, name , type, labelText }) => {
    return (
        <div className='flex flex-col gap-3 '>
            <label
                className="text-neutral-900  text-xl font-AnekLatin font-[400]"
                htmlFor={name}>
                {labelText} <span className='text-Secondary-500 font-AnekLatin text-xl'>*</span>
            </label>
            <Field
                placeholder={placeholder}
                className="outline-none py-2 px-2 text-lg rounded-xl  font-AnekLatin font-[300]  border-[0.7px] border-neutral-300  "
                type={type}
                name={name}
            />
            <ErrorMessage className='text-red-600' name={name} component={"div"} />
        </div>
    )
}

export default FiledCustom
