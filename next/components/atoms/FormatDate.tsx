import { DateFormatterOptions, useDateFormatter } from 'react-aria'
import { bratislavaTimezone } from 'utils/consts'

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
  value: Date // TODO: add number?
  format?: keyof typeof formats
}

const FormatDate = ({ value, format = 'default' }: FormatDateProps) => {
  const formatter = useDateFormatter({ ...formats[format], timeZone: bratislavaTimezone })

  return <>{formatter.format(value)}</>
}

export default FormatDate
