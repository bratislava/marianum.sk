import { RadioGroup } from '@headlessui/react'
import cx from 'classnames'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ReactNode, useMemo, useState } from 'react'

import AddIcon from '../../assets/add.svg'
import ArrowRightIcon from '../../assets/arrow_forward.svg'
import DownloadIcon from '../../assets/download.svg'
import SearchIcon from '../../assets/search.svg'
import XIcon from '../../assets/x-alt.svg'
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
import Select from '../../components/atoms/Select'
import Tab from '../../components/atoms/Tabs/Tab'
import Tabs from '../../components/atoms/Tabs/Tabs'
import Tag from '../../components/atoms/Tag'
import TagButton from '../../components/atoms/TagButton'
import TextField from '../../components/atoms/TextField'
import AccordionGroup from '../../components/molecules/Accordion/AccordionGroup'
import AccordionItem from '../../components/molecules/Accordion/AccordionItem'
import ArticleCard from '../../components/molecules/Cards/ArticleCard'
import BranchCard from '../../components/molecules/Cards/BranchCard'
import BundleCard from '../../components/molecules/Cards/BundleCard'
import { CategoryCard, FaqThemeCard } from '../../components/molecules/Cards/CategoryFaqThemeCard'
import PartnerCard from '../../components/molecules/Cards/PartnerCard'
import ProductCard from '../../components/molecules/Cards/ProductCard'
import ServiceCard from '../../components/molecules/Cards/ServiceCard'
import Checklist from '../../components/molecules/Checklist/Checklist'
import Row from '../../components/molecules/Row'
import Search from '../../components/molecules/Search'

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
    <div className="overflow-hidden bg-[#E5E5E5]">
      <div className="container mx-auto p-4 pb-64">
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

        <Wrapper title="TagButton">
          <Stack width="full">
            <TagButton>Its</TagButton>
            <TagButton>tag</TagButton>
            <TagButton>button</TagButton>
            <TagButton isActive>now</TagButton>
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
              link="#"
              border={cardsBorder}
            />
            <Row title="Nazov partnera" border={cardsBorder} />
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
              border={cardsBorder}
            />
            <Row
              title="Hladany termin"
              link="#"
              showUrl
              metadata={['Metadata', 'Metadata', 'Metadata']}
              border={cardsBorder}
            />
            <Row title="Hladany termin" link="#" showUrl border={cardsBorder} />
            <Row title="Nazov partnera" link="#" isExternal border={cardsBorder} />
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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure voluptatum inventore
                  at optio reiciendis quasi laborum sed nemo quos! Vel distinctio incidunt
                  blanditiis repellat reiciendis ut impedit optio cupiditate ex.
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
              imageUrl="/card-example.jpg"
              imageAlt="Example image for card"
              border={cardsBorder}
              title="Article card"
              category={{ title: 'Category', linkHref: '#' }}
              date={Date.now()}
              linkHref="#"
            />
            <ProductCard
              linkHref="#"
              imageUrl="/card-example.jpg"
              imageAlt="Example image for card"
              title="Product card"
              price={500_011_656_161}
              border={cardsBorder}
            />
            <ProductCard
              linkHref="#"
              imageUrl="/card-example.jpg"
              imageAlt="Example image for card"
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
              imageUrl="/card-example.jpg"
              imageAlt="Example image for card"
              border={cardsBorder}
            />
            <FaqThemeCard border={cardsBorder} title="Faq card" subtitle="Subtitle" linkHref="" />
            <BranchCard
              branchName="Branch name"
              address="Address"
              openingHoursText="09:00 – 18:00"
              linkHref="#"
            />
            <PartnerCard
              title="Partner name"
              linkHref="#"
              imageUrl="/card-example.jpg"
              imageAlt="Example image for card"
              border={cardsBorder}
            />
            <BundleCard
              imageUrl="/card-example.jpg"
              imageAlt="Example image for card"
              name="Package name"
              priceFrom={1999}
              claims={[
                // eslint-disable-next-line sonarjs/no-duplicate-string
                'Lorem ipsum dolor sit amet',
                'Lorem ipsum dolor sit amet',
                'Lorem ipsum dolor sit amet',
              ]}
              linkHref=""
              border={cardsBorder}
            />
          </div>
        </Wrapper>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale = 'sk' }) => {
  const translations = await serverSideTranslations(locale, ['common']) // TODO: fix any

  return {
    props: {
      ...translations,
    },
  }
}

export default Showcase
