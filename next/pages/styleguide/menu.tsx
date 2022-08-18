import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

import Navigation from '../../components/molecules/Navigation/Navigation'

const Menu = () => {
  return (
    <Navigation
      phoneNumber="+421 901 111 222"
      faqLink="#faq"
      navigationItems={[
        {
          id: 1, // 'vybavenie-pohrebu',
          type: 'WRAPPER',
          title: 'Vybavenie pohrebu',
          path: '#/vybavenie-pohrebu',
          items: [
            {
              id: 2, // 'navod-ako-postupovat',
              type: 'INTERNAL',
              title: 'Návod ako postupovať',
              path: '#/vybavenie-pohrebu/navod-ako-postupovat',
            },
            {
              id: 3, // 'hrobove-miesto',
              type: 'WRAPPER',
              title: 'Hrobové miesto',
              path: '#/vybavenie-pohrebu/hrobove-miesto',
              items: [
                {
                  id: 4, // 'existujuce-hrobove-miesto',
                  type: 'INTERNAL',
                  title: 'Existujúce hrobové miesto',
                  path: '#/vybavenie-pohrebu/hrobove-miesto/existujuce-hrobove-miesto',
                },
                {
                  id: 5, // 'nove-hrobove-miesto',
                  type: 'INTERNAL',
                  title: 'Nové hrobové miesto',
                  path: '#/vybavenie-pohrebu/hrobove-miesto/nove-hrobove-miesto',
                },
                {
                  id: 6, // 'platba-za-miesto',
                  type: 'INTERNAL',
                  title: 'Platba za miesto',
                  path: '#/vybavenie-pohrebu/hrobove-miesto/platba-za-miesto',
                },
                {
                  id: 7, // 'prepis-hroboveho-miesta',
                  type: 'INTERNAL',
                  title: 'Prepis hrobového miesta',
                  path: '#/vybavenie-pohrebu/hrobove-miesto/prepis-hroboveho-miesta',
                },
                {
                  id: 8, // 'vybudovanie-alebo-rekonstrukcia-pomnikov',
                  type: 'INTERNAL',
                  title: 'Vybudovanie alebo rekonštrukcia pomníkov',
                  path: '#/vybavenie-pohrebu/hrobove-miesto/vybudovanie-alebo-rekonstrukcia-pomnikov',
                },
                {
                  id: 9, // 'zoznam-neplaticov',
                  type: 'INTERNAL',
                  title: 'Zoznam neplatičov',
                  path: '#/vybavenie-pohrebu/hrobove-miesto/zoznam-neplaticov',
                },
              ],
            },
            {
              id: 10, // 'cintoriny',
              type: 'INTERNAL',
              title: 'Cintoríny',
              path: '#/vybavenie-pohrebu/cintoriny',
            },
            {
              id: 11, // 'pohrebna-sluzba',
              type: 'INTERNAL',
              title: 'Pohrebná služba',
              path: '#/vybavenie-pohrebu/pohrebna-sluzba',
            },
            {
              id: 12, // 'stretnutie-na-pobocke',
              type: 'INTERNAL',
              title: 'Stretnutie na pobočke',
              path: '#/vybavenie-pohrebu/stretnutie-na-pobocke',
            },
            {
              id: 13, // 'moznosti-pochovania',
              type: 'INTERNAL',
              title: 'Možnosti pochovania',
              path: '#/vybavenie-pohrebu/moznosti-pochovania',
            },
            {
              id: 14, // 'miesto-umrtia',
              type: 'INTERNAL',
              title: 'Miesto úmrtia',
              path: '#/vybavenie-pohrebu/miesto-umrtia',
            },
          ],
        },
        {
          id: 15, // 'sluzby',
          type: 'WRAPPER',
          title: 'Služby',
          path: '#/sluzby',
          items: [
            {
              id: 16, // 'vyvoz-zosnulych',
              type: 'INTERNAL',
              title: 'Vývoz zosnulych',
              path: '#/sluzby/vyvoz-zosnulych',
            },
            {
              id: 17, // 'balicky-pohrebov',
              type: 'INTERNAL',
              title: 'Balíčky pohrebov',
              path: '#/sluzby/balicky-pohrebov',
            },
            {
              id: 18, // 'specialne-pohreby',
              type: 'INTERNAL',
              title: 'Špeciálne pohreby',
              path: '#/sluzby/specialne-pohreby',
            },
            {
              id: 19, // 'socialne-pohreby',
              type: 'INTERNAL',
              title: 'Sociálne pohreby ',
              path: '#/sluzby/socialne-pohreby',
            },
            {
              id: 20, // 'cennik',
              type: 'INTERNAL',
              title: 'Cenník',
              path: '#/sluzby/cennik',
            },
            {
              id: 21, // 'katalog-produktov',
              type: 'WRAPPER',
              title: 'Katalóg produktov',
              path: '#/sluzby/katalog-produktov',
              items: [
                {
                  id: 22, // 'rakvy',
                  type: 'INTERNAL',
                  title: 'Rakvy',
                  path: '#/sluzby/katalog-produktov/rakvy',
                },
                {
                  id: 23, // 'kvety',
                  type: 'INTERNAL',
                  title: 'Kvety',
                  path: '#/sluzby/katalog-produktov/kvety',
                },
                {
                  id: 24, // 'krize',
                  type: 'INTERNAL',
                  title: 'Kríže',
                  path: '#/sluzby/katalog-produktov/krize',
                },
                {
                  id: 25, // 'spomienkove-predmety',
                  type: 'INTERNAL',
                  title: 'Spomienkové predmety',
                  path: '#/sluzby/katalog-produktov/spomienkove-predmety',
                },
              ],
            },
            {
              id: 26, // 'mrazenie',
              type: 'INTERNAL',
              title: 'Mrazenie',
              path: '#/sluzby/mrazenie',
            },
            {
              id: 27, // 'doplnkove-sluzby',
              type: 'WRAPPER',
              title: 'Doplnkové služby',
              path: '#/sluzby/doplnkove-sluzby',
              items: [
                {
                  id: 28, // 'upratovanie-hrobov',
                  type: 'INTERNAL',
                  title: 'Upratovanie hrobov',
                  path: '#/sluzby/doplnkove-sluzby/upratovanie-hrobov',
                },
                {
                  id: 29, // 'vzor-parte',
                  type: 'INTERNAL',
                  title: 'Vzor parte',
                  path: '#/sluzby/doplnkove-sluzby/vzor-parte',
                },
              ],
            },
          ],
        },
        {
          id: 30, // 'aktuality',
          type: 'WRAPPER',
          title: 'Aktuality',
          path: '#/aktuality',
          items: [
            {
              id: 31, // 'novinky',
              type: 'INTERNAL',
              title: 'Novinky',
              path: '#/aktuality/novinky',
            },
            {
              id: 32, // 'zoznam-obradov',
              type: 'INTERNAL',
              title: 'Zoznam obradov',
              path: '#/aktuality/zoznam-obradov',
            },
            {
              id: 33, // 'casto-kladene-otazky',
              type: 'INTERNAL',
              title: 'Často kladené otázky',
              path: '#/aktuality/casto-kladene-otazky',
            },
          ],
        },
        {
          id: 34, // 'o-nas',
          type: 'WRAPPER',
          title: 'O nás',
          path: '#/o-nas',
          items: [
            {
              id: 35, // 'o-spolocnosti',
              type: 'INTERNAL',
              title: 'O spoločnosti',
              path: '#/o-nas/o-spolocnosti',
            },
            {
              id: 36, // 'pobocky',
              type: 'INTERNAL',
              title: 'Pobočky',
              path: '#/o-nas/pobocky',
            },
            {
              id: 37, // 'cintoriny-v-sprave',
              type: 'INTERNAL',
              title: 'Cintoríny v správe',
              path: '#/o-nas/cintoriny-v-sprave',
            },
            {
              id: 38, // 'historia-a-sucasnost-cintorinov',
              type: 'INTERNAL',
              title: 'História a súčasnosť cintorínov',
              path: '#/o-nas/historia-a-sucasnost-cintorinov',
            },
            {
              id: 39, // 'starostlivost-o-pamatniky-a-vojnove-hroby',
              type: 'INTERNAL',
              title: 'Starostlivosť o pamätníky a vojnové hroby',
              path: '#/o-nas/starostlivost-o-pamatniky-a-vojnove-hroby',
            },
            {
              id: 40, // 'transparentne-zverejnovanie',
              type: 'INTERNAL',
              title: 'Transparentné zverejňovanie',
              path: '#/o-nas/transparentne-zverejnovanie',
            },
            {
              id: 41, // 'kariera',
              type: 'INTERNAL',
              title: 'Kariéra',
              path: '#/o-nas/kariera',
            },
            {
              id: 42, // 'otvaracie-hodiny',
              type: 'INTERNAL',
              title: 'Otváracie hodiny',
              path: '#/o-nas/otvaracie-hodiny',
            },
            {
              id: 43, // 'kontakt',
              type: 'INTERNAL',
              title: 'Kontakt',
              path: '#/o-nas/kontakt',
            },
            {
              id: 44, // 'partneri',
              type: 'INTERNAL',
              title: 'Partneri',
              path: '#/o-nas/partneri',
            },
          ],
        },
      ]}
    />
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

export default Menu
