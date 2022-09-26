import { RenderFn } from 'editorjs-blocks-react-renderer'
import { ListBlockData } from 'editorjs-blocks-react-renderer/dist/renderers/list'

const RichTextList: RenderFn<ListBlockData> = ({ data }) => {
  const listStyles = 'mb-4 list-inside marker:text-primary last:mb-0 md:mb-6 space-y-3 pl-3'

  if (data.style === 'ordered') {
    return (
      <ol className={`list-disc marker:m-[0px] ${listStyles}`}>
        {data.items.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index} className="">
            {item.toString()}
          </li>
        ))}
      </ol>
    )
  }

  return (
    <ul className={`list-decimal ${listStyles}`}>
      {data.items.map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <li key={index}>
          <span className="pl-1.5">{item.toString()}</span>
        </li>
      ))}
    </ul>
  )
}

export default RichTextList
