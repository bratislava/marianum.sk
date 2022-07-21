import cx from 'classnames'
import React from 'react'

import AddIcon from '../../assets/add.svg'
import ArrowRightIcon from '../../assets/arrow_forward.svg'
import DownloadIcon from '../../assets/download.svg'
import Accordion from '../../components/atoms/Accordion/Accordion'
import AccordionItem from '../../components/atoms/Accordion/AccordionItem'
import Button from '../../components/atoms/Button'
import MLink from '../../components/atoms/MLink'
import Row from '../../components/molecules/Row'

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
  width?: 'desktop' | 'mobile' | 'full' | null
  direction?: 'column' | 'row'
  children: React.ReactNode
}

export const Stack = ({ bg, width = null, direction = 'row', children }: IStackProps) => {
  return (
    <div
      className={cx('flex p-1 w-fit', {
        'bg-primary-dark': bg === 'dark',
        'w-[1128px]': width === 'desktop',
        'w-[288px]': width === 'mobile',
        'w-full': width === 'full',
        'flex-col space-y-2': direction === 'column',
        'flex-row space-x-2': direction === 'row',
      })}
    >
      {children}
    </div>
  )
}

const Showcase = () => {
  return (
    <>
      <Wrapper title="Accordion">
        <Stack width="full">
          <Accordion>
            <AccordionItem title="Accordion">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quis nobis quia
              corporis officiis dolorem quisquam quam sint! Et in libero, nihil magni amet quasi
              doloribus commodi repellat optio quibusdam!
            </AccordionItem>
            <AccordionItem title="Second accordion">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quis nobis quia
              corporis officiis dolorem quisquam quam sint! Et in libero, nihil magni amet quasi
              doloribus commodi repellat optio quibusdam!
            </AccordionItem>
            <AccordionItem title="Third accordion with very long title to test behaviour when there is a very long title :)">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quis nobis quia
              corporis officiis dolorem quisquam quam sint! Et in libero, nihil magni amet quasi
              doloribus commodi repellat optio quibusdam!
            </AccordionItem>
          </Accordion>
        </Stack>
      </Wrapper>

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
          <Button variant="white" startIcon={<AddIcon />}>
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

      <Wrapper title="Link">
        <Stack>
          <MLink href="/#">Zobraz viac</MLink>
        </Stack>
        <Stack bg="dark">
          <MLink href="/#" variant="white">
            Zobraz viac
          </MLink>
        </Stack>
        <Stack>
          <MLink href="/#" noStyles>
            Zobraz viac
          </MLink>
        </Stack>
      </Wrapper>

      <Wrapper title="Row">
        <Stack width="full" direction="column">
          <Row title="Nazov pozicie" metadata={['Metadata', 'Metadata', 'Metadata']} link="#" />
          <Row title="Nazov partnera" />
          <Row
            title="Nazov suboru"
            category="Kategoria"
            metadata={['Metadata', 'Metadata', 'Metadata']}
            link="#"
            button={
              <Button variant="tertiary" startIcon={<DownloadIcon />}>
                Stiahnut
              </Button>
            }
          />
          <Row
            title="Hladany termin"
            link="#"
            showUrl
            metadata={['Metadata', 'Metadata', 'Metadata']}
          />
          <Row title="Hladany termin" link="#" showUrl />
          <Row title="Nazov partnera" link="#" isExternal />
          <Row
            title="Nazov pobocky"
            link="#"
            address="Adresa"
            arrowInCorner
            moreContent={
              <div>
                <p>Otvaracie hodiny</p>
                <p>09:00 - 18:00</p>
              </div>
            }
          />
        </Stack>
      </Wrapper>
    </>
  )
}

export default Showcase
