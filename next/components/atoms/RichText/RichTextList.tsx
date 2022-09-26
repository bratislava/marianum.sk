import { RenderFn } from 'editorjs-blocks-react-renderer'
import { ListBlockData } from 'editorjs-blocks-react-renderer/dist/renderers/list'

const RichTextList: RenderFn<ListBlockData> = ({ data }) => {
  const listStyles = 'mb-4 list-inside marker:text-primary last:mb-0 md:mb-6 space-y-3 pl-3'

  // just simple lists are implemented, not nested ones

  if (data.style === 'ordered') {
    return (
      <ol className={`list-disc marker:m-[0px] ${listStyles}`}>
        {data.items.map((item, index) => {
          if (typeof item === 'string') {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <li key={index}>{item.toString()}</li>
            )
          }
          return null
        })}
      </ol>
    )
  }

  return (
    <ul className={`list-decimal ${listStyles}`}>
      {data.items.map((item, index) => {
        if (typeof item === 'string') {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index}>
              <span className="pl-1.5">{item}</span>
            </li>
          )
        }
        return null
      })}
    </ul>
  )
}

export default RichTextList
