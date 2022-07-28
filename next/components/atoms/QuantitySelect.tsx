import { useEffect, useId, useState } from 'react'
import Add from '../../assets/add.svg'
import Remove from '../../assets/remove.svg'
import AutosizeInput from 'react-input-autosize'

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
  const generatedOrProvidedId = id ?? useId()

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
      setInputValue(minValue!)
      onChange(minValue!)
      return
    }
    if (isHigherThanMax(inputValue)) {
      setInputValue(maxValue!)
      onChange(maxValue!)
      return
    }

    onChange(inputValue)
  }

  return (
    <div className="inline-flex flex-row border border-border w-min">
      <button
        onClick={handleMinusClick}
        className="grid place-content-center text-primary w-10 h-10 bg-white hover:text-primary-dark border-border border-r"
        aria-controls={generatedOrProvidedId}
        aria-label="Znížiť množstvo" /* TODO: Translation */
        disabled={isLowerThanMin(value - 1)}
      >
        <Remove />
      </button>
      <AutosizeInput
        type="number"
        inputClassName="px-4 py-2 arrows-hide"
        id={generatedOrProvidedId}
        value={inputValue}
        onChange={(event) => setInputValue(Number(event.target.value))}
        onBlur={handleInputBlur}
        extraWidth={0}
        min={minValue}
        max={maxValue}
      />
      <button
        onClick={handlePlusClick}
        className="grid place-content-center text-primary w-10 h-10 bg-white border-border border-l"
        aria-controls={generatedOrProvidedId}
        aria-label="Zvýšiť množstvo" /* TODO: Translation */
        disabled={isHigherThanMax(value + 1)}
      >
        <Add />
      </button>
    </div>
  )
}

export default QuantitySelect
