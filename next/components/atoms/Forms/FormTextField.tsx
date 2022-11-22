import FormErrorWrapper from '@components/atoms/Forms/FormErrorWrapper'
import TextField from '@components/atoms/TextField'
import React, { ComponentProps, forwardRef, PropsWithChildren } from 'react'

// Types are not worth the effort.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FormTextFieldProps<T = any> = ComponentProps<typeof TextField> & { errors?: T }

const FormTextField = forwardRef<
  HTMLTextAreaElement & HTMLInputElement,
  PropsWithChildren<FormTextFieldProps>
>(({ children, errors, ...props }, ref) => {
  return (
    <FormErrorWrapper errors={errors} name={props.name}>
      <TextField {...props} ref={ref}>
        {children}
      </TextField>
    </FormErrorWrapper>
  )
})

export default FormTextField
