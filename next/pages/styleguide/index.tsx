import cx from 'classnames'
import React, { useMemo } from 'react'

import AddIcon from '../../assets/add.svg'
import ArrowRightIcon from '../../assets/arrow_forward.svg'
import DownloadIcon from '../../assets/download.svg'
import SearchIcon from '../../assets/search.svg'
import XIcon from '../../assets/x-alt.svg'
import Breadcrumbs from '../../components/atoms/Breadcrumbs'
import Button from '../../components/atoms/Button'
import MLink from '../../components/atoms/MLink'
import Select from '../../components/atoms/Select'
import Tag from '../../components/atoms/Tag'
import TextField from '../../components/atoms/TextField'
import Accordion from '../../components/molecules/Accordion/Accordion'
import AccordionItem from '../../components/molecules/Accordion/AccordionItem'
import Row from '../../components/molecules/Row'
import Search from '../../components/molecules/Search'

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
  const dummyBreadcrumbLinks = useMemo(
    () => [
      {
        label: <DownloadIcon />,
        link: '#home',
      },
      {
        label: 'very',
        link: '#very',
      },
      {
        label: 'looong',
        link: '#looong',
      },
      {
        label: 'path',
        link: '#path',
      },
      {
        label: 'to',
        link: '#to',
      },
      {
        label: 'some',
        link: '#some',
      },
      {
        label: 'page',
        link: '#page',
      },
    ],
    [],
  )

  return (
    <div className="w-full overflow-hidden">
      <Wrapper title="Breadcrumbs">
        <Stack width="full" bg="white">
          <Breadcrumbs>
            <div>One item</div>
          </Breadcrumbs>
        </Stack>
        <Stack width="full" bg="dark">
          <Breadcrumbs className="text-white opacity-72">
            <div>First item</div>
            <div>Second item</div>
          </Breadcrumbs>
        </Stack>
        <Stack width="full" bg="white">
          <Breadcrumbs>
            <div>First item</div>
            <div>Second item</div>
            <div>Third item</div>
          </Breadcrumbs>
        </Stack>
        <Stack width="full" bg="dark">
          <Breadcrumbs className="text-white opacity-72">
            {dummyBreadcrumbLinks.map(({ label, link }) => (
              <MLink key={link} href={link} noStyles className="underline">
                {label}
              </MLink>
            ))}
          </Breadcrumbs>
        </Stack>
      </Wrapper>

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

      <Wrapper title="Tags">
        <Stack width="full">
          <Tag>I prefer</Tag>
          <Tag>to call</Tag>
          <Tag>them</Tag>
          <Tag isActive>tags</Tag>
        </Stack>
      </Wrapper>

      <Wrapper title="Chips">
        <Stack width="full">
          <Tag ignoreEvents>Chips</Tag>
          <Tag ignoreEvents>are just</Tag>
          <Tag ignoreEvents>tags</Tag>
          <Tag ignoreEvents isActive>
            that
          </Tag>
          <Tag ignoreEvents isActive>
            ignore
          </Tag>
          <Tag ignoreEvents isActive>
            mouse and focus events
          </Tag>
        </Stack>
      </Wrapper>

      <Wrapper title="TextField">
        <Stack width="full">
          <TextField id="deafault" placeholder="Input" />
          <TextField
            id="deafault-left-icon"
            leftSlot={
              <button type="button" className="p-2">
                <SearchIcon />
              </button>
            }
            placeholder="Input"
          />
          <TextField
            id="deafault-right-icon"
            rightSlot={
              <button type="button" className="p-2">
                <XIcon />
              </button>
            }
            placeholder="Input"
          />
          <TextField
            id="deafault-both-icons"
            leftSlot={
              <button type="button" className="p-2">
                <SearchIcon />
              </button>
            }
            rightSlot={
              <button type="button" className="p-2">
                <XIcon />
              </button>
            }
            placeholder="Input"
          />
        </Stack>

        <Stack width="full">
          <TextField id="with-text" defaultValue="Input" placeholder="Input" />
          <TextField
            id="with-text-left-icon"
            defaultValue="Input"
            leftSlot={
              <button type="button" className="p-2">
                <SearchIcon />
              </button>
            }
            placeholder="Input"
          />
          <TextField
            id="with-text-right-icon"
            defaultValue="Input"
            rightSlot={
              <button type="button" className="p-2">
                <XIcon />
              </button>
            }
            placeholder="Input"
          />
          <TextField
            id="with-text-both-icons"
            defaultValue="Input"
            leftSlot={
              <button type="button" className="p-2">
                <SearchIcon />
              </button>
            }
            rightSlot={
              <button type="button" className="p-2">
                <XIcon />
              </button>
            }
            placeholder="Input"
          />
        </Stack>

        <Stack width="full">
          <TextField id="error" error defaultValue="Input" placeholder="Input" />
          <TextField
            id="error-left-icon"
            error
            defaultValue="Input"
            leftSlot={
              <button type="button" className="p-2">
                <SearchIcon />
              </button>
            }
            placeholder="Input"
          />
          <TextField
            id="error-right-icon"
            error
            defaultValue="Input"
            rightSlot={
              <button type="button" className="p-2">
                <XIcon />
              </button>
            }
            placeholder="Input"
          />
          <TextField
            id="error-both-icons"
            error
            defaultValue="Input"
            leftSlot={
              <button type="button" className="p-2">
                <SearchIcon />
              </button>
            }
            rightSlot={
              <button type="button" className="p-2">
                <XIcon />
              </button>
            }
            placeholder="Input"
          />
        </Stack>

        <Stack width="full">
          <TextField id="disabled" disabled defaultValue="Input" placeholder="Input" />
          <TextField
            id="disabled-left-icon"
            disabled
            defaultValue="Input"
            leftSlot={
              <button type="button" className="p-2">
                <SearchIcon />
              </button>
            }
            placeholder="Input"
          />
          <TextField
            id="disabled-right-icon"
            disabled
            defaultValue="Input"
            rightSlot={
              <button type="button" className="p-2">
                <XIcon />
              </button>
            }
            placeholder="Input"
          />
          <TextField
            id="disabled-both-icons"
            disabled
            defaultValue="Input"
            leftSlot={
              <button type="button" className="p-2">
                <SearchIcon />
              </button>
            }
            rightSlot={
              <button type="button" className="p-2">
                <XIcon />
              </button>
            }
            placeholder="Input"
          />
        </Stack>

        <Stack width="full">
          <TextField label="Label" id="with-label" defaultValue="Input" placeholder="Input" />
          <TextField
            label="Label"
            id="with-label-left-icon"
            defaultValue="Input"
            leftSlot={
              <button type="button" className="p-2">
                <SearchIcon />
              </button>
            }
            placeholder="Input"
          />
          <TextField
            label="Label"
            id="with-label-right-icon"
            defaultValue="Input"
            rightSlot={
              <button type="button" className="p-2">
                <XIcon />
              </button>
            }
            placeholder="Input"
          />
          <TextField
            label="Label"
            id="with-label-both-icons"
            defaultValue="Input"
            leftSlot={
              <button type="button" className="p-2">
                <SearchIcon />
              </button>
            }
            rightSlot={
              <button type="button" className="p-2">
                <XIcon />
              </button>
            }
            placeholder="Input"
          />
        </Stack>

        <Stack width="full">
          <TextField
            required
            label="Label"
            id="with-label-required"
            defaultValue="Input"
            placeholder="Input"
          />
          <TextField
            required
            label="Label"
            id="with-label-required-left-icon"
            defaultValue="Input"
            leftSlot={
              <button type="button" className="p-2">
                <SearchIcon />
              </button>
            }
            placeholder="Input"
          />
          <TextField
            required
            label="Label"
            id="with-label-required-right-icon"
            defaultValue="Input"
            rightSlot={
              <button type="button" className="p-2">
                <XIcon />
              </button>
            }
            placeholder="Input"
          />
          <TextField
            required
            label="Label"
            id="with-label-required-both-icons"
            defaultValue="Input"
            leftSlot={
              <button type="button" className="p-2">
                <SearchIcon />
              </button>
            }
            rightSlot={
              <button type="button" className="p-2">
                <XIcon />
              </button>
            }
            placeholder="Input"
          />
        </Stack>
      </Wrapper>

      <Wrapper title="TextField (area)">
        <Stack width="full">
          <TextField id="area" area placeholder="Input" />
          <TextField id="area-with-text" area defaultValue="Input" />
          <TextField id="area-error" area defaultValue="Input" error />
          <TextField id="area-disabled" area disabled defaultValue="Input" />
        </Stack>

        <Stack width="full">
          <TextField required label="Label" id="area-label-required" area placeholder="Input" />
          <TextField
            required
            label="Label"
            id="area-label-required-with-text"
            area
            defaultValue="Input"
          />
          <TextField
            required
            label="Label"
            id="area-label-required-error"
            area
            defaultValue="Input"
            error
          />
          <TextField
            required
            label="Label"
            id="area-label-required-disabled"
            area
            disabled
            defaultValue="Input"
          />
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

      <Wrapper title="Search">
        <Stack width="full">
          {/* eslint-disable-next-line no-alert */}
          <Search placeholder="Search..." onSearch={(value) => alert(`Searching for: ${value}`)} />
        </Stack>
      </Wrapper>

      <Wrapper title="Select">
        <Stack width="full">
          <Select
            label="Project"
            required
            id="select"
            placeholder="Select one project"
            options={[
              {
                key: 'marianum',
                label: '💀 Marianum',
              },
              {
                key: 'city-library',
                label: '📖 City library',
              },
              {
                key: 'hompage',
                label: '🟥 Hompage',
              },
            ]}
          />
        </Stack>
        <Stack width="full">
          <Select
            label="Projects"
            required
            id="select"
            multiple
            placeholder="Select multiple projects"
            options={[
              {
                key: 'marianum',
                label: '💀 Marianum',
              },
              {
                key: 'city-library',
                label: '📖 City library',
              },
              {
                key: 'hompage',
                label: '🟥 Hompage',
              },
            ]}
          />
        </Stack>
      </Wrapper>

      <div className="h-64" />
    </div>
  )
}

export default Showcase
