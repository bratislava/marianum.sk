import { useTranslation } from 'next-i18next'
import { useEffect, useId, useState } from 'react'
import AutosizeInput from 'react-input-autosize'

import AddIcon from '../../assets/add.svg'
import RemoveIcon from '../../assets/remove.svg'

type QuantitySelectProps = {
  id?: string
  value: number
  minValue?: number
  maxValue?: number
  onChange?: (value: number) => void
}

const QuantitySelect = ({
  id,
  value,
  minValue,
  maxValue,
  onChange = () => {},
}: QuantitySelectProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'QuantitySelect' })
  const generatedId = useId()
  const generatedOrProvidedId = id ?? generatedId

  const [inputValue, setInputValue] = useState(value)

  useEffect(() => {
    setInputValue(value)
  }, [value])

  const isLowerThanMin = (newValue: number) => minValue != null && newValue < minValue
  const isHigherThanMax = (newValue: number) => maxValue != null && newValue > maxValue

  const handleMinusClick = () => {
    const newValue = value - 1
    if (isLowerThanMin(value - 1)) {
      return
    }
    onChange(newValue)
  }

  const handlePlusClick = () => {
    const newValue = value + 1
    if (isHigherThanMax(value + 1)) {
      return
    }
    onChange(newValue)
  }

  const handleInputBlur = () => {
    if (isLowerThanMin(inputValue)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setInputValue(minValue!)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      onChange(minValue!)
      return
    }
    if (isHigherThanMax(inputValue)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setInputValue(maxValue!)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      onChange(maxValue!)
      return
    }

    onChange(inputValue)
  }

  return (
    <div className="inline-flex w-min flex-row border border-border">
      <button
        type="button"
        onClick={handleMinusClick}
        className="grid h-10 w-10 place-content-center border-r border-border bg-white text-primary hover:text-primary-dark"
        aria-controls={generatedOrProvidedId}
        aria-label={t('aria.decreaseAmount')}
        disabled={isLowerThanMin(value - 1)}
      >
        <RemoveIcon />
      </button>
      {/* The values are set in a way that paddings are as in design for one-digit numbers. For two-digit numbers
       it doesn't resize. It starts to resize for three-digit numbers. */}
      <AutosizeInput
        type="number"
        inputClassName="px-2 py-2 arrows-hide min-w-[27px] text-center"
        id={generatedOrProvidedId}
        value={inputValue}
        onChange={(event) => setInputValue(Number(event.target.value))}
        onBlur={handleInputBlur}
        extraWidth={0}
        min={minValue}
        max={maxValue}
      />
      <button
        type="button"
        onClick={handlePlusClick}
        className="grid h-10 w-10 place-content-center border-l border-border bg-white text-primary"
        aria-controls={generatedOrProvidedId}
        aria-label={t('aria.increaseAmount')}
        disabled={isHigherThanMax(value + 1)}
      >
        <AddIcon />
      </button>
    </div>
  )
}

export default QuantitySelect
