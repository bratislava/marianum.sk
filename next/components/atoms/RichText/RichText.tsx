import ReactMarkdown from 'react-markdown'
import { LiProps } from 'react-markdown/lib/ast-to-react'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

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
      className={className}
      components={{
        h1: ({ children }) => <h1 className="text-h1 font-bold">{children}</h1>,
        h2: ({ children }) => <h2 className="text-h2 font-bold">{children}</h2>,
        h3: ({ children }) => <h3 className="text-h3 font-bold">{children}</h3>,
        h4: ({ children }) => <h4 className="text-h4 font-bold">{children}</h4>,
        h5: ({ children }) => <h5 className="text-h5 font-bold">{children}</h5>,
        h6: ({ children }) => <h6 className="text-h6 font-bold">{children}</h6>,
        p: ({ node, ...props }) => <p className="whitespace-pre-wrap last:mb-0" {...props} />,
        a: ({ href, children }) => (
          <MLink href={href ?? '#'} target={href?.startsWith('http') ? '_blank' : '_self'}>
            {children[0]}
          </MLink>
        ),
        // img: ({ src, alt }) => (
        //   <div className="flex justify-center">{src && <ContentImage src={src} alt={alt} />}</div>
        // ),
        blockquote: ({ children }) => <div className="border-primary">{children}</div>,
        table: ({ children }) => <table className="w-full">{children}</table>,
        // tr: ({ children }) => (
        //   <tr className="flex w-[280px] flex-col rounded-lg bg-white py-8 px-1 md:table-row md:w-full md:p-0 md:odd:bg-white md:even:bg-transparent">
        //     {children}
        //   </tr>
        // ),
        // tbody: ({ children }) => (
        //   <tbody className="flex gap-5 md:table-row-group md:gap-0">{children}</tbody>
        // ),
        // thead: () => <thead className="bg-transparent" />,
        // td: ({ children }) => (
        //   <td className="first:rounded-l-lg last:rounded-r-lg">
        //     <div className="md:text-default mb-1 flex items-center px-4 text-left text-sm md:min-h-[92px] lg:mb-0">
        //       {children}
        //     </div>
        //   </td>
        // ),
        // ol: ({ children }) => {
        //   const elements = children
        //     .filter((e) => e !== '\n')
        //     .map((e) => {
        //       return (
        //         isValidElement(e) && {
        //           ...e,
        //           props: {
        //             ...e.props,
        //             children: e.props.children.filter((c: string) => c !== '\n'),
        //           },
        //         }
        //       )
        //     })
        //   return <div className="my-6 flex flex-col first:mt-0 last:mb-0 lg:my-10">{elements}</div>
        // },
        // li: ({ ordered, children, index, depth }: AdvancedListItemProps) => {
        //   const level = depth ?? 0
        //   if (ordered) {
        //     return (
        //       <NumericalListItem index={index} variant="combined" hasBackground={false}>
        //         {children}
        //       </NumericalListItem>
        //     )
        //   }
        //   return (
        //     <div className="flex gap-x-8 lg:gap-x-6">
        //       <div
        //         className={cx(
        //           'mt-1.5 h-4 w-4 shrink-0 rounded-full border-4 border-solid border-primary bg-primary',
        //           { 'bg-primary': level === 0 },
        //           { 'border-4 border-solid border-primary': level !== 0 },
        //         )}
        //       />
        //       <div className="text-base lg:text-default whitespace-pre-wrap">{children}</div>
        //     </div>
        //   )
        // },

        // ul: ({ children, depth }) => {
        //   const elements = children.map((e) => {
        //     return isValidElement(e) ? { ...e, props: { ...e.props, depth } } : e
        //   })
        //   return (
        //     <ul className="inner-list my-6 flex flex-col gap-y-5 first:mt-0 last:mb-0 lg:my-10 lg:ml-6 lg:gap-y-8">
        //       {elements}
        //     </ul>
        //   )
        // },
      }}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
    >
      {content ?? ''}
    </ReactMarkdown>
  )
}

export default RichText
