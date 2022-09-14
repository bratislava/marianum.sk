import { RenderFn } from 'editorjs-blocks-react-renderer'
import { ImageBlockData } from 'editorjs-blocks-react-renderer/dist/renderers/image'

import { UploadFile } from '../../../graphql'
import MImage from '../MImage'

const RichTextImage: RenderFn<ImageBlockData & { file: { strapiImage: UploadFile } }> = ({
  data,
  className,
}) => {
  return (
    <figure className={className}>
      <MImage image={data.file.strapiImage} layout={data.stretched ? 'responsive' : undefined} />
      {/* TODO: Add styles to caption */}
      {data.file.strapiImage.caption && <figcaption>{data.file.strapiImage.caption}</figcaption>}
    </figure>
  )
}

export default RichTextImage
