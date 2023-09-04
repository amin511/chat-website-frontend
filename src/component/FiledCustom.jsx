import React from 'react'

import { ErrorMessage, Field } from 'formik'
const FiledCustom = ({ placeHolder, name, labelText }) => {
    return (
        <div className='flex flex-col gap-3 '>
            <label
                className="text-neutral-900  text-xl font-AnekLatin font-[600]"
                htmlFor={name}>
                {labelText} <span className='text-Secondary-500 font-AnekLatin text-xl'>*</span>
            </label>
            <Field
                placeholder={placeHolder}
                className="outline-none py-2 px-2 text-lg rounded-xl  font-AnekLatin font-bold  border-[0.7px] border-neutral-300  "
                type={name}
                name={name} />
            <ErrorMessage className='text-red-600' name={name} component={"div"} />
        </div>
    )
}

export default FiledCustom
