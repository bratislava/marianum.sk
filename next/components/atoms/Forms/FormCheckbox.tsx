import Checkbox from '@components/atoms/Checkbox'
import FormErrorWrapper from '@components/atoms/Forms/FormErrorWrapper'
import get from 'lodash/get'
import React, { ComponentProps, PropsWithChildren } from 'react'
import { FormState, useController, UseControllerProps } from 'react-hook-form'

// Types are not worth the effort.
type FormCheckboxProps = Omit<
  ComponentProps<typeof Checkbox>,
  'isSelected' | 'onChange' | 'onBlur'
> &
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  UseControllerProps<any> & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formState: FormState<any>
  }

const FormCheckbox = ({ children, formState, ...props }: PropsWithChildren<FormCheckboxProps>) => {
  const {
    field: { value, onChange, onBlur },
  } = useController(props)

  const hasError = Boolean(get(formState.errors, props.name))

  return (
    <FormErrorWrapper formState={formState} name={props.name}>
      <Checkbox
        {...props}
        isSelected={value}
        onChange={onChange}
        onBlur={onBlur}
        hasError={hasError}
      >
        {children}
      </Checkbox>
    </FormErrorWrapper>
  )
}

export default FormCheckbox
