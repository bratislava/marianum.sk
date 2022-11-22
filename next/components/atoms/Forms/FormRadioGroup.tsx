import FormErrorWrapper from '@components/atoms/Forms/FormErrorWrapper'
import { RadioGroup } from '@headlessui/react'
import React, { PropsWithChildren } from 'react'
import { FormState, useController, UseControllerProps } from 'react-hook-form'

// Types are not worth the effort.
type FormRadioGroupProps = Omit<Parameters<typeof RadioGroup>[0], 'value' | 'onChange' | 'onBlur'> &
  UseControllerProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formState: FormState<any> // TODO: type
  }

const FormRadioGroup = ({
  children,
  formState,
  ...props
}: PropsWithChildren<FormRadioGroupProps>) => {
  const {
    field: { value, onChange, onBlur },
  } = useController(props)

  return (
    <FormErrorWrapper formState={formState} name={props.name}>
      <RadioGroup {...props} value={value} onChange={onChange} onBlur={onBlur}>
        {children}
      </RadioGroup>
    </FormErrorWrapper>
  )
}

export default FormRadioGroup
