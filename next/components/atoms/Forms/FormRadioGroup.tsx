import FormErrorWrapper from '@components/atoms/Forms/FormErrorWrapper'
import { RadioGroup } from '@headlessui/react'
import React, { PropsWithChildren } from 'react'
import { FieldValues, FormState, useController, UseControllerProps } from 'react-hook-form'

type FormRadioGroupProps<T extends FieldValues> = Omit<
  Parameters<typeof RadioGroup>[0],
  'value' | 'onChange' | 'onBlur'
> &
  UseControllerProps<T> & {
    formState: FormState<T>
  }

const FormRadioGroup = <T extends FieldValues>({
  children,
  formState,
  ...props
}: PropsWithChildren<FormRadioGroupProps<T>>) => {
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
