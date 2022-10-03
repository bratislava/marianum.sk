import { useMemo } from 'react'

const fileColorsMap: { [ext: string]: string } = {
  pdf: '#F15642',
  doc: '#257cee',
  docx: '#257cee',
  zip: '#cc1313',
  rar: '#cc1313',
  txt: '#535353',
  other: '#535353',
}

type FileIconProps = {
  extension?: string
}

const FileIcon = ({ extension }: FileIconProps) => {
  const color = useMemo(() => {
    return fileColorsMap[extension ?? ''] ?? fileColorsMap.other
  }, [extension])

  return (
    <svg className="select-none" width="72" height="72" viewBox="0 0 72 72" fill="none">
      <path
        d="M18 0C15.525 0 13.5 2.025 13.5 4.5V67.5C13.5 69.975 15.525 72 18 72H63C65.475 72 67.5 69.975 67.5 67.5V18L49.5 0H18Z"
        fill="#E2E5E7"
      />
      <path d="M54 18H67.5L49.5 0V13.5C49.5 15.975 51.525 18 54 18Z" fill="#B0B7BD" />
      <path d="M67.5 31.5L54 18H67.5V31.5Z" fill="#CAD1D8" />
      <path
        d="M58.5 58.5C58.5 59.7375 57.4875 60.75 56.25 60.75H6.75C5.5125 60.75 4.5 59.7375 4.5 58.5V36C4.5 34.7625 5.5125 33.75 6.75 33.75H56.25C57.4875 33.75 58.5 34.7625 58.5 36V58.5Z"
        fill={color}
      />
      <text x="13" y="53" fill="white" fontStyle="bold" className="uppercase">
        {extension}
      </text>
      <path
        d="M56.25 60.75H13.5V63H56.25C57.4875 63 58.5 61.9875 58.5 60.75V58.5C58.5 59.7375 57.4875 60.75 56.25 60.75Z"
        fill="#CAD1D8"
      />
    </svg>
  )
}

export default FileIcon
