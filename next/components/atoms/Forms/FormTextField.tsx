import FormErrorWrapper from '@components/atoms/Forms/FormErrorWrapper'
import TextField from '@components/atoms/TextField'
import React, { ComponentProps, forwardRef, PropsWithChildren } from 'react'
import { FieldValues, FormState } from 'react-hook-form'

// Types are not worth the effort.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FormTextFieldProps<T extends FieldValues> = ComponentProps<typeof TextField> & {
  formState: FormState<T>
}

const FormTextField = forwardRef<
  HTMLTextAreaElement & HTMLInputElement,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  PropsWithChildren<FormTextFieldProps<any>>
>(({ children, formState, ...props }, ref) => {
  return (
    <FormErrorWrapper formState={formState} name={props.name}>
      <TextField {...props} ref={ref}>
        {children}
      </TextField>
    </FormErrorWrapper>
  )
})

export default FormTextField
