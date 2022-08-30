import { useTranslation } from 'next-i18next'
import slugify from 'slugify'
import useSWR from 'swr'

import { client } from '../../utils/gql'
import { isDefined } from '../../utils/isDefined'
import Tab from '../atoms/Tabs/Tab'
import Tabs from '../atoms/Tabs/Tabs'
import Checklist from './Checklist/Checklist'

const ProcedureTabs = () => {
  const { i18n } = useTranslation()

  const { data, error } = useSWR(['Procedures', i18n.language], (_key, locale) =>
    client.Procedures({ locale }),
  )

  // TODO replace by proper loading and error
  if (!data && !error) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  const { outsideMedicalFacility, atMedicalFacility } = data?.procedures?.data?.attributes ?? {}
  const procedures = [outsideMedicalFacility, atMedicalFacility].filter(isDefined)

  return (
    <Tabs areBig>
      {procedures.map((procedure) => (
        <Tab key={procedure?.title} label={procedure?.title ?? ''}>
          <div className="mt-9">
            <Checklist
              items={
                procedure?.steps?.filter(isDefined).map((step, index) => ({
                  ...step,
                  key: slugify(step.title),
                  isOpen: index === 0,
                })) ?? []
              }
              downloadFile={procedure?.downloadFile?.data}
            />
          </div>
        </Tab>
      ))}
    </Tabs>
  )
}

export default ProcedureTabs
