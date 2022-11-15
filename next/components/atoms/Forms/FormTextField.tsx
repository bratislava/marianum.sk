import { ErrorMessage } from '@hookform/error-message'
import React, { ComponentProps, forwardRef, PropsWithChildren } from 'react'

import TextField from '../TextField'

// Types are not worth the effort.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FormTextFieldProps<T = any> = ComponentProps<typeof TextField> & { errors?: T }

const FormTextField = forwardRef<
  HTMLTextAreaElement & HTMLInputElement,
  PropsWithChildren<FormTextFieldProps>
>(({ children, errors, ...props }, ref) => {
  return (
    <>
      <TextField {...props} ref={ref}>
        {children}
      </TextField>
      {props.name && errors ? <ErrorMessage errors={errors} name={props.name} /> : null}
    </>
  )
})

export default FormTextField
