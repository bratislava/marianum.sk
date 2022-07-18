import cx from 'classnames'
import React from 'react'

import AddIcon from '../../assets/add.svg'
import ArrowRightIcon from '../../assets/arrow_forward.svg'
import Button from '../../components/atoms/Button'

interface IWrapperProps {
  title?: string
  children: React.ReactNode
}

export const Wrapper = ({ title, children }: IWrapperProps) => {
  return (
    <div className="px-4 pt-4">
      {title && <h2 className="pb-2 text-h2 font-semibold">{title}</h2>}
      {children}
    </div>
  )
}

interface IStackProps {
  bg?: 'white' | 'dark'
  children: React.ReactNode
}

export const Stack = ({ bg, children }: IStackProps) => {
  return (
    <div className={cx('space-x-2 p-1 w-fit', { 'bg-primaryDark': bg === 'dark' })}>{children}</div>
  )
}

const Showcase = () => {
  return (
    <Wrapper title="Button">
      {/* primary */}
      <Stack>
        <Button>Button</Button>
        <Button startIcon={<AddIcon />}>Button</Button>
        <Button endIcon={<ArrowRightIcon />}>Button</Button>
      </Stack>

      {/* secondary */}
      <Stack>
        <Button variant="secondary">Button</Button>
        <Button variant="secondary" startIcon={<AddIcon />}>
          Button
        </Button>
        <Button variant="secondary" endIcon={<ArrowRightIcon />}>
          Button
        </Button>
      </Stack>

      {/* terniary */}
      <Stack>
        <Button variant="tertiary">Button</Button>
        <Button variant="tertiary" startIcon={<AddIcon />}>
          Button
        </Button>
        <Button variant="tertiary" endIcon={<ArrowRightIcon />}>
          Button
        </Button>
      </Stack>

      {/* plain-primary */}
      <Stack>
        <Button variant="plain-primary">Button</Button>
        <Button variant="plain-primary" startIcon={<AddIcon />}>
          Button
        </Button>
        <Button variant="plain-primary" endIcon={<ArrowRightIcon />}>
          Button
        </Button>
      </Stack>

      {/* plain-secondary */}
      <Stack>
        <Button variant="plain-secondary">Button</Button>
        <Button variant="plain-secondary" startIcon={<AddIcon />}>
          Button
        </Button>
        <Button variant="plain-secondary" endIcon={<ArrowRightIcon />}>
          Button
        </Button>
      </Stack>

      {/* white */}
      <Stack bg="dark">
        <Button variant="white">Button</Button>
        <Button variant="white" startIcon={<ArrowRightIcon />}>
          Button
        </Button>
        <Button variant="white" endIcon={<ArrowRightIcon />}>
          Button
        </Button>
      </Stack>

      {/* plain-white */}
      <Stack bg="dark">
        <Button variant="plain-white">Button</Button>
        <Button variant="plain-white" startIcon={<AddIcon />}>
          Button
        </Button>
        <Button variant="plain-white" endIcon={<ArrowRightIcon />}>
          Button
        </Button>
      </Stack>

      <Stack bg="dark">
        <Button variant="circle">
          <ArrowRightIcon />
        </Button>
      </Stack>
    </Wrapper>
  )
}

export default Showcase
