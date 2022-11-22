import FormErrorWrapper from '@components/atoms/Forms/FormErrorWrapper'
import { RadioGroup } from '@headlessui/react'
import React, { PropsWithChildren } from 'react'
import { useController, UseControllerProps } from 'react-hook-form'

// Types are not worth the effort.
type FormRadioGroupProps = Omit<Parameters<typeof RadioGroup>[0], 'value' | 'onChange' | 'onBlur'> &
  UseControllerProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors?: any // TODO: type
  }

const FormRadioGroup = ({ children, errors, ...props }: PropsWithChildren<FormRadioGroupProps>) => {
  const {
    field: { value, onChange, onBlur },
  } = useController(props)

  return (
    <FormErrorWrapper errors={errors} name={props.name}>
      <RadioGroup {...props} value={value} onChange={onChange} onBlur={onBlur}>
        {children}
      </RadioGroup>
    </FormErrorWrapper>
  )
}

export default FormRadioGroup
