import { RadioGroup } from '@headlessui/react'
import { mergeProps } from 'react-aria'

const SimpleRadioGroup = (props: Parameters<typeof RadioGroup>[0]) => {
  return <RadioGroup {...mergeProps(props, { className: 'flex flex-col gap-y-2' })} />
}

export default SimpleRadioGroup
