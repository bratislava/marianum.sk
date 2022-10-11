import { RadioGroup } from '@headlessui/react'
import cx from 'classnames'
import { GetStaticProps, GetStaticPropsResult } from 'next'
import Head from 'next/head'
import { SSRConfig } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ReactNode, useMemo, useState } from 'react'

import AddIcon from '../../assets/add.svg'
import ArrowRightIcon from '../../assets/arrow_forward.svg'
import DownloadIcon from '../../assets/download.svg'
import SearchIcon from '../../assets/search.svg'
import XIcon from '../../assets/x-alt.svg'
import Avatar from '../../components/atoms/Avatar'
import Breadcrumbs from '../../components/atoms/Breadcrumbs'
import Button from '../../components/atoms/Button'
import Checkbox from '../../components/atoms/Checkbox'
import IconButton from '../../components/atoms/IconButton'
import MLink from '../../components/atoms/MLink'
import Pagination from '../../components/atoms/Pagination/Pagination'
import QuantitySelect from '../../components/atoms/QuantitySelect'
import RadioBox from '../../components/atoms/Radio/RadioBox'
import RadioSimple from '../../components/atoms/Radio/RadioSimple'
import RadioSimpleGroup from '../../components/atoms/Radio/RadioSimpleGroup'
import ReviewStars from '../../components/atoms/ReviewStars'
import RichText from '../../components/atoms/RichText/RichText'
import Select from '../../components/atoms/Select'
import Tab from '../../components/atoms/Tabs/Tab'
import Tabs from '../../components/atoms/Tabs/Tabs'
import Tag from '../../components/atoms/Tag'
import TagToggle from '../../components/atoms/TagToggle'
import TextField from '../../components/atoms/TextField'
import SectionsWrapper, { SectionsWrapperProps } from '../../components/layouts/SectionsWrapper'
import AccordionGroup from '../../components/molecules/Accordion/AccordionGroup'
import AccordionItem from '../../components/molecules/Accordion/AccordionItem'
import ArticleCard from '../../components/molecules/Cards/ArticleCard'
import BundleCard from '../../components/molecules/Cards/BundleCard'
import { CategoryCard, FaqThemeCard } from '../../components/molecules/Cards/CategoryFaqThemeCard'
import PartnerCard from '../../components/molecules/Cards/PartnerCard'
import ProductCard from '../../components/molecules/Cards/ProductCard'
import ServiceCard from '../../components/molecules/Cards/ServiceCard'
import Checklist from '../../components/molecules/Checklist/Checklist'
import Row from '../../components/molecules/Row/Row'
import Search from '../../components/molecules/Search'
import Section from '../../components/molecules/Section'
import { UploadFile } from '../../graphql'

/* eslint-disable no-secrets/no-secrets, sonarjs/no-duplicate-string, unicorn/numeric-separators-style */
const image: UploadFile = {
  updatedAt: '2022-08-24T20:30:23.750Z',
  name: 'adams family',
  alternativeText: "Adam's family alt",
  caption: "Adam's family caption",
  width: 663,
  height: 422,
  formats: {
    small: {
      ext: '.jpg',
      url: '/uploads/small_adams_family_1681cf52bb.jpg',
      hash: 'small_adams_family_1681cf52bb',
      mime: 'image/jpeg',
      name: 'small_adams family',
      path: null,
      size: 35.67,
      width: 500,
      height: 318,
    },
    thumbnail: {
      ext: '.jpg',
      url: '/uploads/thumbnail_adams_family_1681cf52bb.jpg',
      hash: 'thumbnail_adams_family_1681cf52bb',
      mime: 'image/jpeg',
      name: 'thumbnail_adams family',
      path: null,
      size: 10.75,
      width: 245,
      height: 156,
    },
  },
  hash: 'adams_family_1681cf52bb',
  ext: '.jpg',
  mime: 'image/jpeg',
  size: 59.67,
  url: '/uploads/adams_family_1681cf52bb.jpg',
  previewUrl: null,
  provider: 'local',
  provider_metadata: null,
  createdAt: '2022-08-24T20:30:23.750Z',
  placeholder:
    'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAGAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUG/8QAIRAAAQQABwEBAAAAAAAAAAAAAQIDBAUABxESEyExBqH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AkZQSpl3UW1bDkphOQqlyZvSyklL7ShwuIV6DtJB1B8696yDWYP08NpEWPYOcLKQ2jV1QO1PQ/BhhgP/Z',
}

const richText = '# Heading 1'

type WrapperProps = {
  title?: string
  children: ReactNode
}

export const Wrapper = ({ title, children }: WrapperProps) => {
  return (
    <div className="mb-10 flex flex-col gap-2">
      {title && <h2 className="pb-2 text-h2 font-semibold">{title}</h2>}
      {children}
    </div>
  )
}

type StackProps = {
  bg?: 'white' | 'dark'
  width?: 'desktop' | 'mobile' | 'full' | null
  direction?: 'column' | 'row'
  children: React.ReactNode
}

export const Stack = ({ bg, width = null, direction = 'row', children }: StackProps) => {
  return (
    <div
      className={cx('flex', {
        'w-fit': width == null,
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
  const [paginationSelectedPage, setPaginationSelectedPage] = useState(1)
  const [quantitySelectValue, setQuantitySelectValue] = useState(1)
  const [radioValue, setRadioValue] = useState('value-1')
  const [checkboxValue, setCheckboxValue] = useState(true)
  const [cardsBorder, setCardsBorder] = useState(true)

  const dummyBreadcrumbLinks = useMemo(
    () => [
      {
        label: <DownloadIcon />,
        path: '#home',
      },
      {
        label: 'very',
        path: '#very',
      },
      {
        label: 'looong',
        path: '#looong',
      },
      {
        label: 'path',
        path: '#path',
      },
      {
        label: 'to',
        path: '#to',
      },
      {
        label: 'some',
        path: '#some',
      },
      {
        label: 'page',
        path: '#page',
      },
    ],
    [],
  )

  const dummySectionWrappers: (Omit<SectionsWrapperProps, 'children'> & { count: number })[] =
    useMemo(
      () => [
        {
          count: 10,
          alternateBackground: false,
          background: 'dark',
        },
        {
          count: 10,
          alternateBackground: false,
          background: 'light',
        },
        {
          count: 10,
          alternateBackground: true,
          startBackground: 'dark',
        },
        {
          count: 10,
          alternateBackground: true,
          startBackground: 'light',
        },
        {
          count: 9,
          alternateBackground: true,
          startBackground: 'dark',
        },
        {
          count: 9,
          alternateBackground: true,
          startBackground: 'light',
        },
      ],
      [],
    )

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="overflow-hidden bg-[#E5E5E5]">
        <div className="container pb-64">
          <Wrapper title="Headings">
            <h1>Headline 1</h1>
            <h2>Headline 2</h2>
            <h3>Headline 3</h3>
            <h4>Headline 4</h4>
            <h5>Headline 5</h5>
            <h6>Headline 6</h6>
            <h6 className="text-h4">Headline 6 with custom size h4</h6>
          </Wrapper>

          <Wrapper title="Breadcrumbs">
            <Stack width="full" bg="white">
              <Breadcrumbs crumbs={[{ label: 'One item', path: '#' }]} />
            </Stack>
            <Stack width="full" bg="dark">
              <Breadcrumbs
                className="text-white opacity-72"
                crumbs={[
                  { label: 'First item', path: '#' },
                  { label: 'Second item', path: '#' },
                ]}
              />
            </Stack>
            <Stack width="full" bg="white">
              <Breadcrumbs
                crumbs={[
                  { label: 'First item', path: '#' },
                  { label: 'Second item', path: '#' },
                  { label: 'Third item', path: '#' },
                ]}
              />
            </Stack>
            <Stack width="full" bg="dark">
              <Breadcrumbs className="text-white opacity-72" crumbs={dummyBreadcrumbLinks} />
            </Stack>
          </Wrapper>

          <Wrapper title="Button">
            <Stack>
              <Button>Button</Button>
              <Button startIcon={<AddIcon />}>Button</Button>
              <Button endIcon={<ArrowRightIcon />}>Button</Button>
              <Button disabled>Button disabled</Button>
            </Stack>

            <Stack>
              <Button variant="secondary">Button</Button>
              <Button variant="secondary" startIcon={<AddIcon />}>
                Button
              </Button>
              <Button variant="secondary" endIcon={<ArrowRightIcon />}>
                Button
              </Button>
              <Button variant="secondary" disabled>
                Button disabled
              </Button>
            </Stack>

            <Stack>
              <Button variant="tertiary">Button</Button>
              <Button variant="tertiary" startIcon={<AddIcon />}>
                Button
              </Button>
              <Button variant="tertiary" endIcon={<ArrowRightIcon />}>
                Button
              </Button>
              <Button variant="tertiary" disabled>
                Button disabled
              </Button>
            </Stack>

            <Stack>
              <Button variant="plain-primary">Button</Button>
              <Button variant="plain-primary" startIcon={<AddIcon />}>
                Button
              </Button>
              <Button variant="plain-primary" endIcon={<ArrowRightIcon />}>
                Button
              </Button>
              <Button variant="plain-primary" disabled>
                Button disabled
              </Button>
            </Stack>

            <Stack>
              <Button variant="plain-secondary">Button</Button>
              <Button variant="plain-secondary" startIcon={<AddIcon />}>
                Button
              </Button>
              <Button variant="plain-secondary" endIcon={<ArrowRightIcon />}>
                Button
              </Button>
              <Button variant="plain-secondary" disabled>
                Button disabled
              </Button>
            </Stack>

            <Stack>
              <Button variant="white">Button</Button>
              <Button variant="white" startIcon={<AddIcon />}>
                Button
              </Button>
              <Button variant="white" endIcon={<ArrowRightIcon />}>
                Button
              </Button>
              <Button variant="white" disabled>
                Button disabled
              </Button>
            </Stack>

            <Stack>
              <Button variant="plain-white">Button</Button>
              <Button variant="plain-white" startIcon={<AddIcon />}>
                Button
              </Button>
              <Button variant="plain-white" endIcon={<ArrowRightIcon />}>
                Button
              </Button>
              <Button variant="plain-white" disabled>
                Button disabled
              </Button>
            </Stack>

            <Stack>
              <Button variant="primary" href="#">
                Button link
              </Button>
              <Button variant="tertiary" href="#" startIcon={<AddIcon />}>
                Button link
              </Button>
              <Button variant="plain-secondary" href="#" endIcon={<ArrowRightIcon />}>
                Button link
              </Button>
            </Stack>
          </Wrapper>

          <Wrapper title="IconButton">
            <Stack>
              <IconButton variant="primary">
                <ArrowRightIcon />
              </IconButton>
              <IconButton variant="secondary">
                <ArrowRightIcon />
              </IconButton>
              <IconButton variant="tertiary">
                <ArrowRightIcon />
              </IconButton>
              <IconButton variant="white">
                <ArrowRightIcon />
              </IconButton>
              <IconButton variant="plain-primary">
                <ArrowRightIcon />
              </IconButton>
              <IconButton variant="plain-secondary">
                <ArrowRightIcon />
              </IconButton>
            </Stack>

            <Stack>
              <IconButton disabled variant="primary">
                <ArrowRightIcon />
              </IconButton>
              <IconButton disabled variant="secondary">
                <ArrowRightIcon />
              </IconButton>
              <IconButton disabled variant="tertiary">
                <ArrowRightIcon />
              </IconButton>
              <IconButton disabled variant="white">
                <ArrowRightIcon />
              </IconButton>
              <IconButton disabled variant="plain-primary">
                <ArrowRightIcon />
              </IconButton>
              <IconButton disabled variant="plain-secondary">
                <ArrowRightIcon />
              </IconButton>
            </Stack>

            <Stack>
              <IconButton size="small" variant="primary">
                <ArrowRightIcon />
              </IconButton>
              <IconButton size="small" variant="secondary">
                <ArrowRightIcon />
              </IconButton>
              <IconButton size="small" variant="tertiary">
                <ArrowRightIcon />
              </IconButton>
              <IconButton size="small" variant="white">
                <ArrowRightIcon />
              </IconButton>
              <IconButton size="small" variant="plain-primary">
                <ArrowRightIcon />
              </IconButton>
              <IconButton size="small" variant="plain-secondary">
                <ArrowRightIcon />
              </IconButton>
            </Stack>

            <Stack>
              <IconButton disabled size="small" variant="primary">
                <ArrowRightIcon />
              </IconButton>
              <IconButton disabled size="small" variant="secondary">
                <ArrowRightIcon />
              </IconButton>
              <IconButton disabled size="small" variant="tertiary">
                <ArrowRightIcon />
              </IconButton>
              <IconButton disabled size="small" variant="white">
                <ArrowRightIcon />
              </IconButton>
              <IconButton disabled size="small" variant="plain-primary">
                <ArrowRightIcon />
              </IconButton>
              <IconButton disabled size="small" variant="plain-secondary">
                <ArrowRightIcon />
              </IconButton>
            </Stack>

            <Stack>
              <IconButton variant="pagination">1</IconButton>
              <IconButton variant="pagination-selected">2</IconButton>
              <IconButton variant="pagination">11</IconButton>
              <IconButton variant="pagination">111</IconButton>
            </Stack>
          </Wrapper>

          <Wrapper title="Link">
            <Stack>
              <MLink href="/#">Zobraz viac</MLink>
              <MLink href="/#" variant="white">
                Zobraz viac
              </MLink>
              <MLink href="/#" noStyles>
                Zobraz viac
              </MLink>
            </Stack>
          </Wrapper>

          <Wrapper title="TagToggle">
            <Stack width="full">
              <TagToggle>Its</TagToggle>
              <TagToggle>tag</TagToggle>
              <TagToggle>button</TagToggle>
              <TagToggle isSelected>now</TagToggle>
            </Stack>
          </Wrapper>

          <Wrapper title="Tag">
            <Stack width="full">
              <Tag>Chips</Tag>
              <Tag>are just</Tag>
              <Tag>tags</Tag>
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

          <Wrapper title="Row">
            <Checkbox isSelected={cardsBorder} onChange={setCardsBorder}>
              Show border
            </Checkbox>

            <Stack width="full" direction="column">
              <Row
                title="Nazov pozicie"
                metadata={['Metadata', 'Metadata', 'Metadata']}
                linkHref="#"
                border={cardsBorder}
              />
              <Row title="Nazov partnera" border={cardsBorder} />
              <Row
                title="Nazov suboru"
                category={{ attributes: { title: 'Kategoria', slug: 'kategoria' } }}
                metadata={['Metadata', 'Metadata', 'Metadata']}
                linkHref="#"
                button={
                  <Button variant="tertiary" startIcon={<DownloadIcon />}>
                    Stiahnut
                  </Button>
                }
                border={cardsBorder}
              />
              <Row
                title="Hladany termin"
                linkHref="#"
                showUrl
                metadata={['Metadata', 'Metadata', 'Metadata']}
                border={cardsBorder}
              />
              <Row
                title="Hladany termin"
                linkHref="#"
                showUrl
                tags={['Typ vysledku']}
                border={cardsBorder}
              />
              <Row title="Nazov partnera" linkHref="#" isExternal border={cardsBorder} />
              <Row
                title="Nazov pobocky"
                linkHref="#"
                address="Adresa"
                arrowInCorner
                moreContent={
                  <div>
                    <p>Otvaracie hodiny</p>
                    <p>09:00 - 18:00</p>
                  </div>
                }
                border={cardsBorder}
              />
              <Row
                title="Volať záchrannú zdravotnú službu 112"
                number={1}
                moreContent="Ak Váš blízky umrie mimo zdravotníckeho zariadenia, neodkladne kontaktujte tiesňovú linku 112, ktorá na miesto vyšle obhliadajúceho lekára."
                border={cardsBorder}
              />
            </Stack>
          </Wrapper>

          <Wrapper title="Tabs">
            <Stack width="full">
              <Tabs>
                <Tab label="Recent">
                  <div className="p-4">Recent</div>
                </Tab>
                <Tab label="Popular">
                  <div className="p-4">Popular</div>
                </Tab>
                <Tab label="Trending">
                  <div className="p-4">Trending</div>
                </Tab>
              </Tabs>
            </Stack>
            <Stack width="full" bg="dark">
              <Tabs areWhite>
                <Tab label="Recent">
                  <div className="p-4">Recent</div>
                </Tab>
                <Tab label="Popular">
                  <div className="p-4">Popular</div>
                </Tab>
                <Tab label="Trending">
                  <div className="p-4">Trending</div>
                </Tab>
              </Tabs>
            </Stack>
          </Wrapper>

          <Wrapper title="Tabs (big)">
            <Stack width="full">
              <Tabs areBig>
                <Tab label="Mimo zdravotníckeho zariadenia (domov, DSS)">
                  <div className="p-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat velit, incidunt
                    iste excepturi, minus blanditiis saepe repellendus, adipisci eveniet explicabo
                    temporibus repellat minima nemo ipsam maxime tenetur reprehenderit et quae.
                  </div>
                </Tab>
                <Tab label="V zdravotníckom zariadení">
                  <div className="p-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure voluptatum
                    inventore at optio reiciendis quasi laborum sed nemo quos! Vel distinctio
                    incidunt blanditiis repellat reiciendis ut impedit optio cupiditate ex.
                  </div>
                </Tab>
              </Tabs>
            </Stack>
          </Wrapper>

          <Wrapper title="Search">
            <Stack width="full">
              <Search
                placeholder="Search..."
                // eslint-disable-next-line no-alert
                onSearch={(value) => alert(`Searching for: ${value}`)}
              />
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
                    key: 'homepage',
                    label: '🟥 Homepage',
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
                    key: 'homepage',
                    label: '🟥 Homepage',
                  },
                ]}
              />
            </Stack>
          </Wrapper>

          <Wrapper title="Accordion">
            <Stack width="full">
              <AccordionGroup>
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
              </AccordionGroup>
            </Stack>
          </Wrapper>

          <Wrapper title="Checklist">
            <Stack width="full">
              <Checklist
                items={[
                  {
                    isOpen: true,
                    id: '1',
                    key: 'volat-zachrannu-zdravotnu-sluzbu-112',
                    title: 'Volať záchrannú zdravotnú službu 112',
                    description:
                      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed dolorum tempora quidem quam, dolores iste quos. Distinctio nostrum unde aut quaerat dolorum. Adipisci fugit odio sed! Totam excepturi quo est.',
                  },
                  {
                    id: '2',
                    key: 'obhliadka-lekarom',
                    title: 'Obhliadka lekárom',
                    description:
                      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad ea dignissimos unde nulla quas, et suscipit iusto placeat, qui harum, nobis quibusdam officiis dolorum commodi vitae voluptatum eveniet eos pariatur.',
                  },
                  {
                    id: '3',
                    key: 'kontaktujte-vyvoz-zosnulych',
                    title: 'Kontaktujte vývoz zosnulých',
                    description:
                      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eligendi velit ipsum expedita ab sunt minus? Dolorum nemo, nihil ad commodi architecto molestias facilis nobis laudantium nulla vitae. Ratione, dolorum.',
                  },
                  {
                    id: '4',
                    key: 'kontaktujte-pohrebnu-sluzbu',
                    title: 'Kontaktujte pohrebnú službu',
                    description:
                      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga maxime harum corrupti culpa numquam doloremque error, amet corporis aut fugit, accusantium, laborum voluptatem sequi excepturi saepe libero reiciendis delectus? Temporibus!',
                  },
                  {
                    id: '5',
                    key: 'pripravte-si-doklady-a-dokumenty',
                    title: 'Pripravte si doklady a dokumenty',
                    description:
                      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos, tempore repudiandae nulla vero molestiae nemo nesciunt odit nostrum est itaque eveniet, accusantium magni asperiores iusto necessitatibus quod id error perferendis.',
                  },
                  {
                    id: '6',
                    key: 'pripravte-si-oblecenie-pre-zosnuleho',
                    title: 'Pripravte si oblečenie pre zosnulého',
                    description:
                      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam dolorum necessitatibus modi ex quia voluptatibus eius quidem, deleniti beatae dicta temporibus eveniet doloribus optio ad qui dolores hic dolor ipsa.',
                  },
                  {
                    id: '7',
                    key: 'zvolte-si-sposob-poslednej-rozlucky-a-pochovania',
                    title: 'Zvoľte si spôsob poslednej rozlúčky a pochovania',
                    description:
                      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus dolores sunt libero rem voluptates, corporis nostrum quos fugit soluta esse aperiam exercitationem neque quibusdam quis incidunt repudiandae quae nesciunt amet.',
                  },
                  {
                    id: '8',
                    key: 'riadte-sa-pokynmi-pohrebnej-sluzby',
                    title: 'Riaďte sa pokynmi pohrebnej služby',
                    description:
                      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id corporis illo rem non amet blanditiis molestias odit, exercitationem quod autem sequi pariatur, ipsa expedita quidem quisquam facere dolore distinctio at!',
                  },
                ]}
                downloadFile={{
                  id: '1',
                  attributes: {
                    __typename: 'UploadFile',
                    url: 'card-example.jpg',
                    name: 'card-example.jpg',
                    size: 65,
                  },
                }}
              />
            </Stack>
          </Wrapper>

          <Wrapper title="Pagination">
            <Stack>
              <Pagination
                count={10}
                selectedPage={paginationSelectedPage}
                onChange={(page) => setPaginationSelectedPage(page)}
              />
            </Stack>
          </Wrapper>

          <Wrapper title="Quantity select">
            <Stack>
              <QuantitySelect
                minValue={0}
                maxValue={10}
                value={quantitySelectValue}
                onChange={(value) => setQuantitySelectValue(value)}
              />
            </Stack>
          </Wrapper>

          <Wrapper title="Radio">
            <Stack>
              <RadioSimpleGroup value={radioValue} onChange={setRadioValue}>
                <RadioSimple value="value-1">Value 1</RadioSimple>
                <RadioSimple value="value-2">Value 2</RadioSimple>
                <RadioSimple value="value-3" disabled>
                  Value 3
                </RadioSimple>
              </RadioSimpleGroup>
            </Stack>
            <Stack>
              <RadioGroup
                value={radioValue}
                onChange={setRadioValue}
                className="flex flex-wrap gap-2"
              >
                <RadioBox value="value-1" className="w-[362px]">
                  Value 1
                </RadioBox>
                <RadioBox value="value-2" className="w-[362px]">
                  Value 2
                </RadioBox>
                <RadioBox value="value-3" className="w-[362px]" disabled>
                  Value 3
                </RadioBox>
              </RadioGroup>
            </Stack>
          </Wrapper>

          <Wrapper title="Checkbox">
            <Stack direction="column">
              <Checkbox isSelected={checkboxValue} onChange={setCheckboxValue}>
                Checkbox
              </Checkbox>
              <Checkbox isSelected={checkboxValue} isDisabled onChange={setCheckboxValue}>
                Disabled checkbox
              </Checkbox>
              <Checkbox isSelected={checkboxValue} isReadOnly onChange={setCheckboxValue}>
                Readonly checkbox
              </Checkbox>
              <Checkbox isSelected={checkboxValue} hasError onChange={setCheckboxValue}>
                Error checkbox
              </Checkbox>
              <Checkbox isSelected={checkboxValue} isDisabled hasError onChange={setCheckboxValue}>
                Disabled checkbox
              </Checkbox>
              <Checkbox isSelected={checkboxValue} isReadOnly hasError onChange={setCheckboxValue}>
                Readonly checkbox
              </Checkbox>
            </Stack>
          </Wrapper>

          <Wrapper title="Cards">
            <Checkbox isSelected={cardsBorder} onChange={setCardsBorder}>
              Show border
            </Checkbox>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <ArticleCard
                image={image}
                border={cardsBorder}
                title="Article card"
                category={{ attributes: { title: 'Category', slug: 'category' } }}
                date={Date.now()}
                linkHref="#"
              />
              <ProductCard
                linkHref="#"
                image={image}
                title="Product card"
                price={500_011_656_161}
                border={cardsBorder}
              />
              <ProductCard
                linkHref="#"
                image={image}
                title="Product card"
                showAddToCartButton
                onAddToCartPress={() => {}}
                price={50}
                border={cardsBorder}
              />
              <CategoryCard border={cardsBorder} title="Category card" linkHref="" />
              <ServiceCard
                title="Headline"
                subtitle="Subtitle"
                linkHref="#"
                image={image}
                border={cardsBorder}
              />
              <FaqThemeCard border={cardsBorder} title="Faq card" subtitle="Subtitle" linkHref="" />
              <PartnerCard title="Partner name" linkHref="#" image={image} border={cardsBorder} />
              <BundleCard
                image={image}
                name="Package name"
                priceFrom={1999}
                claims={[
                  'Lorem ipsum dolor sit amet',
                  'Lorem ipsum dolor sit amet',
                  'Lorem ipsum dolor sit amet',
                ]}
                claimsPlus={['Lorem ipsum dolor sit amet']}
                linkHref=""
                border={cardsBorder}
              />
            </div>
          </Wrapper>

          <Wrapper title="Richtext">
            <RichText content={richText} />
          </Wrapper>

          <Wrapper title="ReviewStars">
            <ReviewStars value={3.3} />
            <ReviewStars value={5} />
            <ReviewStars value={1} />
            <ReviewStars value={2.8} />
            <ReviewStars value={1.5} />
          </Wrapper>

          <Wrapper title="Avatar">
            <Avatar name="John" />
            <Avatar name="John Doe" />
            <Avatar name="John Doe Moe" />
          </Wrapper>

          <div className="h-64" />

          <Wrapper title="Section coloring">
            <Stack direction="row">
              {dummySectionWrappers.map(
                ({ alternateBackground, startBackground, background, count }) => (
                  <div className="p-4">
                    <div className="p-4">
                      <div className="flex w-full justify-between gap-4">
                        <div className="font-semibold">alternateBackground</div>
                        <div>{alternateBackground ? 'true' : 'false'}</div>
                      </div>
                      <div className="flex w-full justify-between gap-4">
                        <div className="font-semibold">startBackground</div>
                        <div>{startBackground ?? 'undefined'}</div>
                      </div>
                      <div className="flex w-full justify-between gap-4">
                        <div className="font-semibold">background</div>
                        <div>{background ?? 'undefined'}</div>
                      </div>
                      <div className="flex w-full justify-between gap-4">
                        <div className="font-semibold">count</div>
                        <div>{count}</div>
                      </div>
                    </div>
                    <SectionsWrapper
                      alternateBackground={alternateBackground}
                      startBackground={startBackground}
                      background={background}
                    >
                      {Array.from({ length: count }, (item, index) => (
                        <Section key={index}>
                          <div className="p-4">Section {index + 1}</div>
                        </Section>
                      ))}
                    </SectionsWrapper>
                  </div>
                ),
              )}
            </Stack>
          </Wrapper>
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({
  locale = 'sk',
}): Promise<GetStaticPropsResult<SSRConfig>> => {
  const translations = await serverSideTranslations(locale, ['common'])
  return {
    props: {
      ...translations,
    },
  }
}

export default Showcase
