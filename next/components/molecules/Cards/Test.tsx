/* eslint-disable */
import * as React from 'react'

type ButtonProps = JSX.IntrinsicElements['button'] & {
  href?: undefined
}

type AnchorProps = JSX.IntrinsicElements['a'] & {
  href: string
}

type PolymorphicProps = ButtonProps | AnchorProps
type PolymorphicButton = {
  (props: AnchorProps): JSX.Element
  (props: ButtonProps): JSX.Element
}

// const isAnchor = (props: PolymorphicProps): props is AnchorProps => {
//   return props.href != undefined
// }

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, PolymorphicProps>(
  (props, ref) => {
    return props.href != undefined ? (
      <a {...props} ref={ref as React.ForwardedRef<HTMLAnchorElement>} />
    ) : (
      <button {...props} ref={ref as React.ForwardedRef<HTMLButtonElement>} />
    )
  },
) as PolymorphicButton

const refButton = React.createRef<HTMLButtonElement>()
const refAnchor = React.createRef<HTMLAnchorElement>()

// Need to use null as default, error otherwise
const useRefButton = React.useRef<HTMLButtonElement>(null)
const useRefAnchor = React.useRef<HTMLAnchorElement>(null)

const tests = (
  <>
    // All fine with createRef, event inferred
    <Button ref={refButton} className="class" onClick={(e) => console.log(e)} />
    <Button ref={refAnchor} className="class" href="someHref" onClick={(e) => console.log(e)} />
    // All fine with useRef, event inferred
    <Button ref={useRefButton} className="class" onClick={(e) => console.log(e)} />
    <Button ref={useRefAnchor} className="class" href="someHref" onClick={(e) => console.log(e)} />
    // Button can be disabled
    <Button ref={useRefButton} disabled className="class" onClick={(e) => console.log(e)} />
    // Anchor cannot
    <Button ref={useRefAnchor} className="class" href="someHref" onClick={(e) => console.log(e)} />
    // Not valid type for button
    {/*<Button ref={refButton} type="wow" onClick={(e) => console.log(e)} />*/}
    // Ok now with valid type="submit"
    <Button ref={refButton} type="submit" onClick={(e) => console.log(e)} />
    // Anchor can have some type too, it's valid
    <Button ref={refAnchor} href="someHref" type="submit" onClick={(e) => console.log(e)} />
    <Button ref={refAnchor} href="someHref" type="nonButtonType" onClick={(e) => console.log(e)} />
    // Anchor ref is not valid for button
    <Button ref={refAnchor} onClick={(e) => console.log(e)} />
    <Button ref={useRefAnchor} onClick={(e) => console.log(e)} />
    // Button ref is not valid for anchor
    <Button ref={refButton} href="someHref" onClick={(e) => console.log(e)} />
    <Button ref={useRefButton} href="someHref" onClick={(e) => console.log(e)} />
  </>
)
