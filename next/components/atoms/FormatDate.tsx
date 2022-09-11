import { DateFormatterOptions, useDateFormatter } from 'react-aria'

/**
 * It's hard to make up a name, name the format by the first usage. Then at the end we can change the naming.
 */
const formats = {
  articleCard: { year: 'numeric', month: 'short', day: 'numeric' } as DateFormatterOptions,
  articlePage: { year: 'numeric', month: 'numeric', day: 'numeric' } as DateFormatterOptions,
}

type FormatDateProps = {
  value: Date // TODO: add number?
  format: keyof typeof formats
}

const FormatDate = ({ value, format }: FormatDateProps) => {
  const formatter = useDateFormatter({ ...formats[format], timeZone: 'Europe/Bratislava' })

  return <>{formatter.format(value)}</>
}

export default FormatDate
