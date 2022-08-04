/* eslint-disable sonarjs/no-duplicate-string */
import Navigation from '../components/molecules/Navigation/Navigation'
import HomepageSlider from '../components/sections/HomepageSlider'
import SectionExample from '../components/sections/SectionExample'

const Home = () => {
  return (
    <div>
      <Navigation
        phoneNumber="+421 987 654 321"
        faqLink="/faq"
        navigationItems={[
          {
            key: 'vybavenie-pohrebu',
            label: 'Vybavenie pohrebu',
            link: '#/vybavenie-pohrebu',
            items: [
              {
                key: 'navod-ako-postupovat',
                label: 'Návod ako postupovať',
                link: '#/vybavenie-pohrebu/navod-ako-postupovat',
              },
              {
                key: 'hrobove-miesto',
                label: 'Hrobové miesto',
                link: '#/vybavenie-pohrebu/hrobove-miesto',
                items: [
                  {
                    key: 'existujuce-hrobove-miesto',
                    label: 'Existujúce hrobové miesto',
                    link: '#/vybavenie-pohrebu/hrobove-miesto/existujuce-hrobove-miesto',
                  },
                  {
                    key: 'nove-hrobove-miesto',
                    label: 'Nové hrobové miesto',
                    link: '#/vybavenie-pohrebu/hrobove-miesto/nove-hrobove-miesto',
                  },
                  {
                    key: 'platba-za-miesto',
                    label: 'Platba za miesto',
                    link: '#/vybavenie-pohrebu/hrobove-miesto/platba-za-miesto',
                  },
                  {
                    key: 'prepis-hroboveho-miesta',
                    label: 'Prepis hrobového miesta',
                    link: '#/vybavenie-pohrebu/hrobove-miesto/prepis-hroboveho-miesta',
                  },
                  {
                    key: 'vybudovanie-alebo-rekonstrukcia-pomnikov',
                    label: 'Vybudovanie alebo rekonštrukcia pomníkov',
                    link: '#/vybavenie-pohrebu/hrobove-miesto/vybudovanie-alebo-rekonstrukcia-pomnikov',
                  },
                  {
                    key: 'zoznam-neplaticov',
                    label: 'Zoznam neplatičov',
                    link: '#/vybavenie-pohrebu/hrobove-miesto/zoznam-neplaticov',
                  },
                ],
              },
              {
                key: 'cintoriny',
                label: 'Cintoríny',
                link: '#/vybavenie-pohrebu/cintoriny',
              },
              {
                key: 'pohrebna-sluzba',
                label: 'Pohrebná služba',
                link: '#/vybavenie-pohrebu/pohrebna-sluzba',
              },
              {
                key: 'stretnutie-na-pobocke',
                label: 'Stretnutie na pobočke',
                link: '#/vybavenie-pohrebu/stretnutie-na-pobocke',
              },
              {
                key: 'moznosti-pochovania',
                label: 'Možnosti pochovania',
                link: '#/vybavenie-pohrebu/moznosti-pochovania',
              },
              {
                key: 'miesto-umrtia',
                label: 'Miesto úmrtia',
                link: '#/vybavenie-pohrebu/miesto-umrtia',
              },
            ],
          },
          {
            key: 'sluzby',
            label: 'Služby',
            link: '#/sluzby',
            items: [
              {
                key: 'vyvoz-zosnulych',
                label: 'Vývoz zosnulych',
                link: '#/sluzby/vyvoz-zosnulych',
              },
              {
                key: 'balicky-pohrebov',
                label: 'Balíčky pohrebov',
                link: '#/sluzby/balicky-pohrebov',
              },
              {
                key: 'specialne-pohreby',
                label: 'Špeciálne pohreby',
                link: '#/sluzby/specialne-pohreby',
              },
              {
                key: 'socialne-pohreby',
                label: 'Sociálne pohreby ',
                link: '#/sluzby/socialne-pohreby',
              },
              {
                key: 'cennik',
                label: 'Cenník',
                link: '#/sluzby/cennik',
              },
              {
                key: 'katalog-produktov',
                label: 'Katalóg produktov',
                link: '#/sluzby/katalog-produktov',
                items: [
                  {
                    key: 'rakvy',
                    label: 'Rakvy',
                    link: '#/sluzby/katalog-produktov/rakvy',
                  },
                  {
                    key: 'kvety',
                    label: 'Kvety',
                    link: '#/sluzby/katalog-produktov/kvety',
                  },
                  {
                    key: 'krize',
                    label: 'Kríže',
                    link: '#/sluzby/katalog-produktov/krize',
                  },
                  {
                    key: 'spomienkove-predmety',
                    label: 'Spomienkové predmety',
                    link: '#/sluzby/katalog-produktov/spomienkove-predmety',
                  },
                ],
              },
              {
                key: 'mrazenie',
                label: 'Mrazenie',
                link: '#/sluzby/mrazenie',
              },
              {
                key: 'doplnkove-sluzby',
                label: 'Doplnkové služby',
                link: '#/sluzby/doplnkove-sluzby',
                items: [
                  {
                    key: 'upratovanie-hrobov',
                    label: 'Upratovanie hrobov',
                    link: '#/sluzby/doplnkove-sluzby/upratovanie-hrobov',
                  },
                  {
                    key: 'vzor-parte',
                    label: 'Vzor parte',
                    link: '#/sluzby/doplnkove-sluzby/vzor-parte',
                  },
                ],
              },
            ],
          },
          {
            key: 'aktuality',
            label: 'Aktuality',
            link: '#/aktuality',
            items: [
              {
                key: 'novinky',
                label: 'Novinky',
                link: '#/aktuality/novinky',
              },
              {
                key: 'zoznam-obradov',
                label: 'Zoznam obradov',
                link: '#/aktuality/zoznam-obradov',
              },
              {
                key: 'casto-kladene-otazky',
                label: 'Často kladené otázky',
                link: '#/aktuality/casto-kladene-otazky',
              },
            ],
          },
          {
            key: 'o-nas',
            label: 'O nás',
            link: '#/o-nas',
            items: [
              {
                key: 'o-spolocnosti',
                label: 'O spoločnosti',
                link: '#/o-nas/o-spolocnosti',
              },
              {
                key: 'pobocky',
                label: 'Pobočky',
                link: '#/o-nas/pobocky',
              },
              {
                key: 'cintoriny-v-sprave',
                label: 'Cintoríny v správe',
                link: '#/o-nas/cintoriny-v-sprave',
              },
              {
                key: 'historia-a-sucasnost-cintorinov',
                label: 'História a súčasnosť cintorínov',
                link: '#/o-nas/historia-a-sucasnost-cintorinov',
              },
              {
                key: 'starostlivost-o-pamatniky-a-vojnove-hroby',
                label: 'Starostlivosť o pamätníky a vojnové hroby',
                link: '#/o-nas/starostlivost-o-pamatniky-a-vojnove-hroby',
              },
              {
                key: 'transparentne-zverejnovanie',
                label: 'Transparentné zverejňovanie',
                link: '#/o-nas/transparentne-zverejnovanie',
              },
              {
                key: 'kariera',
                label: 'Kariéra',
                link: '#/o-nas/kariera',
              },
              {
                key: 'otvaracie-hodiny',
                label: 'Otváracie hodiny',
                link: '#/o-nas/otvaracie-hodiny',
              },
              {
                key: 'kontakt',
                label: 'Kontakt',
                link: '#/o-nas/kontakt',
              },
              {
                key: 'partneri',
                label: 'Partneri',
                link: '#/o-nas/partneri',
              },
            ],
          },
        ]}
      />

      <HomepageSlider
        slides={[
          {
            key: 'slide-1',
            title: 'Slide 1',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
            imageSrc: '',
            buttonText: 'Zistiť viac',
          },
          {
            key: 'slide-2',
            title: 'Slide 2',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
            imageSrc: '',
            buttonText: 'Zistiť viac',
          },
          {
            key: 'slide-3',
            title: 'Slide 3',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
            imageSrc: '',
            buttonText: 'Zistiť viac',
          },
        ]}
      />

      <div className="h-96" />
      <div>Hello from new Marianum website!</div>
      <div className="h-96" />
      <SectionExample />
      <div className="h-96" />
    </div>
  )
}

export default Home
