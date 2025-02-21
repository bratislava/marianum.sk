import { useMemo } from 'react'
import { DateFormatterOptions, useDateFormatter } from 'react-aria'

import { bratislavaTimezone } from '@/utils/consts'

/**
 * It's hard to make up a name, name the format by the first usage. Then at the end we can change the naming.
 */
const formats = {
  articleCard: { year: 'numeric', month: 'short', day: 'numeric' } as DateFormatterOptions,
  articlePage: { year: 'numeric', month: 'numeric', day: 'numeric' } as DateFormatterOptions,
  ceremoniesArchive: {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  } as DateFormatterOptions,
  ceremoniesTime: {
    hour: 'numeric',
    minute: 'numeric',
  } as DateFormatterOptions,
  ceremoniesDate: { dateStyle: 'full' } as DateFormatterOptions,
  homepageCeremoniesDate: {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  } as DateFormatterOptions,
  default: { year: 'numeric', month: 'short', day: 'numeric' } as DateFormatterOptions,
}

type FormatDateProps = {
  format?: keyof typeof formats
} & (
  | {
      valueType?: 'date' // default value
      value: Date
    }
  | { valueType: 'ISO'; value: string }
  | { valueType: 'timestamp'; value: number }
)

const FormatDate = ({ value, format = 'default', valueType }: FormatDateProps) => {
  const date = useMemo(() => {
    if (valueType === 'ISO' || valueType === 'timestamp') {
      return new Date(value)
    }
    // valueType === 'date' || valueType === undefined
    return value
  }, [value, valueType])

  const formatter = useDateFormatter({ ...formats[format], timeZone: bratislavaTimezone })

  return <>{formatter.format(date)}</>
}

export default FormatDate
