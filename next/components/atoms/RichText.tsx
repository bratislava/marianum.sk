import cx from 'classnames'
import Image from 'next/image'
import { PropsWithChildren, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

import Divider from '@/components/atoms/Divider'
import MLink from '@/components/atoms/MLink'
import NormalizeText from '@/components/atoms/NormalizeText/NormalizeText'
import { useHorizontalScrollFade } from '@/utils/useHorizontalScrollFade'

export interface RichTextProps {
  className?: string
  content?: string | null
  coloredTable?: boolean
}

const RichTextTable = ({
  children,
  colored,
  ...props
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
PropsWithChildren<{ colored: boolean } & Record<any, any>>) => {
  const tableWrapperRef = useRef<HTMLDivElement>(null)
  const { scrollFadeClassNames } = useHorizontalScrollFade({ ref: tableWrapperRef })

  return (
    <div className="relative">
      <div className={cx('overflow-x-auto', scrollFadeClassNames)} ref={tableWrapperRef}>
        <table {...props} className={cx('m-table', { colored })}>
          {children}
        </table>
      </div>
    </div>
  )
}

const RichText = ({ className, content, coloredTable = true }: RichTextProps) => {
  return (
    <div className={cx('flex flex-col gap-8', className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ children }) => <h1 className="text-h1 font-bold">{children}</h1>,
          h2: ({ children }) => <h2 className="text-h2 font-bold">{children}</h2>,
          h3: ({ children }) => <h3 className="text-h3 font-bold">{children}</h3>,
          h4: ({ children }) => <h4 className="text-h4 font-bold">{children}</h4>,
          h5: ({ children }) => <h5 className="text-h5 font-bold">{children}</h5>,
          h6: ({ children }) => <h6 className="text-h6 font-bold">{children}</h6>,
          img: ({ src, alt: altFromStrapi }) => {
            // Strapi inserts image in markdown like this: ![alt||caption](url)
            // thanks to patch located in patches/@strapi+admin
            // If there is no || pattern, the whole alt should be used for both properties.

            let alt = altFromStrapi
            let caption = altFromStrapi

            if (altFromStrapi?.includes('||')) {
              ;[alt, caption] = altFromStrapi.split('||')
            }

            return (
              <figure className="flex flex-col gap-4">
                {/* https://stackoverflow.com/a/73618982 */}
                <Image
                  src={src as string}
                  width="0"
                  height="0"
                  className="w-full"
                  alt={alt ?? ''}
                  sizes="100vw"
                />
                <figcaption className="text-center text-sm">{caption}</figcaption>
              </figure>
            )
          },
          p: ({ children, ...props }) => (
            <p className="whitespace-pre-wrap" {...props}>
              <NormalizeText>{children}</NormalizeText>
            </p>
          ),
          a: ({ href, children }) => {
            const isExternal = href?.startsWith('http')

            return (
              <MLink
                href={href ?? '#'}
                target={isExternal ? '_blank' : '_self'}
                variant="regular"
                noArrow
              >
                {children}
                {/* add nbsp and arrow to indicate external link */}
                {/* \u{0000FE0E} is Unicode variation selector that prevents symbols to be rendered as emojis on iOS
               https://stackoverflow.com/questions/8335724/unicode-characters-being-drawn-differently-in-ios5 */}
                {isExternal && `${String.fromCodePoint(160)}↗\u{0000FE0E}`}
              </MLink>
            )
          },
          blockquote: ({ children, ...props }) => (
            <blockquote {...props} className="border-l-4 border-primary bg-white p-6 md:p-8">
              {children}
            </blockquote>
          ),
          table: ({ children, ...props }) => (
            <RichTextTable colored={coloredTable} {...props}>
              {children}
            </RichTextTable>
          ),
          thead: ({ children, ...props }) => <thead {...props}>{children}</thead>,
          tbody: ({ children, ...props }) => <tbody {...props}>{children}</tbody>,
          tr: ({ children, ...props }) => <tr {...props}>{children}</tr>,
          td: ({ children, ...props }) => (
            <td>
              <div {...props}>
                <NormalizeText>{children}</NormalizeText>
              </div>
            </td>
          ),
          ol: ({ children, ...props }) => (
            <ol className="list-decimal pl-8 marker:text-primary" {...props}>
              {children}
            </ol>
          ),
          ul: ({ children, ...props }) => (
            <ul className="list-disc pl-8 marker:text-primary" {...props}>
              {children}
            </ul>
          ),
          li: ({ children, ...props }) => <li {...props}>{children}</li>,
          hr: () => <Divider />,
        }}
      >
        {content ?? ''}
      </ReactMarkdown>
    </div>
  )
}

export default RichText
