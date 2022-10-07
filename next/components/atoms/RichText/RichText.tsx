import cx from 'classnames'
import ReactMarkdown from 'react-markdown'
import { LiProps } from 'react-markdown/lib/ast-to-react'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

import Divider from '../Divider'
import MLink from '../MLink'

export interface RichTextProps {
  className?: string
  content?: string | null
  coloredTable?: boolean
}

export type AdvancedListItemProps = LiProps & { depth?: number }

const RichText = ({ className, content, coloredTable = true }: RichTextProps) => {
  return (
    <ReactMarkdown
      className={cx('flex flex-col gap-8', className)}
      components={{
        h1: ({ children }) => <h1 className="text-h1 font-bold">{children}</h1>,
        h2: ({ children }) => <h2 className="text-h2 font-bold">{children}</h2>,
        h3: ({ children }) => <h3 className="text-h3 font-bold">{children}</h3>,
        h4: ({ children }) => <h4 className="text-h4 font-bold">{children}</h4>,
        h5: ({ children }) => <h5 className="text-h5 font-bold">{children}</h5>,
        h6: ({ children }) => <h6 className="text-h6 font-bold">{children}</h6>,
        // eslint-disable-next-line jsx-a11y/alt-text
        img: (props) => <img {...props} className="w-full" />,
        p: (props) => <p className="whitespace-pre-wrap last:mb-0" {...props} />,
        a: ({ href, children }) => (
          <MLink
            noStyles
            className="font-semibold text-primary underline"
            href={href ?? '#'}
            target={href?.startsWith('http') ? '_blank' : '_self'}
          >
            {children[0]}
          </MLink>
        ),
        blockquote: ({ children, ...props }) => (
          <blockquote
            {...props}
            className="mb-4 border-l-4 border-primary bg-white p-6 last:mb-0 md:mb-6 md:p-8"
          >
            {children}
          </blockquote>
        ),
        table: ({ children, ...props }) => (
          <table {...props} className={cx('m-table', { colored: coloredTable })}>
            {children}
          </table>
        ),
        thead: ({ children, ...props }) => <thead {...props}>{children}</thead>,
        tbody: ({ children, ...props }) => <tbody {...props}>{children}</tbody>,
        tr: ({ children, ...props }) => <tr {...props}>{children}</tr>,
        td: ({ children, ...props }) => (
          <td>
            <div {...props}>{children}</div>
          </td>
        ),
        ol: ({ children, ordered, ...props }) => (
          <ol className="list-decimal pl-4" {...props}>
            {children}
          </ol>
        ),
        ul: ({ children, ordered, ...props }) => (
          <ul className="list-disc pl-4" {...props}>
            {children}
          </ul>
        ),
        li: ({ children, ...props }) => <li {...props}>{children}</li>,
        hr: () => <Divider />,
      }}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
    >
      {content ?? ''}
    </ReactMarkdown>
  )
}

export default RichText
