import { useTranslation } from 'next-i18next'

import { useProcedures } from '../../utils/useProcedures'
import Tab from '../atoms/Tabs/Tab'
import Tabs from '../atoms/Tabs/Tabs'
import Checklist from '../molecules/Checklist/Checklist'

const ProceduresSection = () => {
  const { i18n } = useTranslation()

  const { procedures, isLoading, error } = useProcedures({
    locale: i18n.language,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error</div>
  }

  return (
    <Tabs areBig>
      {procedures.map((procedure) => (
        <Tab label={procedure?.title ?? ''}>
          <div className="mt-9">
            <Checklist items={procedure.steps} />
          </div>
        </Tab>
      ))}
    </Tabs>
  )
}

export default ProceduresSection
