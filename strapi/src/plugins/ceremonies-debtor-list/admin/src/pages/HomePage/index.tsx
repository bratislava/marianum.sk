import { Box, Flex } from '@strapi/design-system'
import { Layouts } from '@strapi/strapi/admin'
import ImportSection from '../../components/ImportSection'

const HomePage = () => {
  return (
    <div>
      <Box background="neutral100">
        <Layouts.Root>
          <Layouts.Header title="Import Excel súborov"></Layouts.Header>
          <Layouts.Content>
            <Flex direction="column" alignItems="stretch" gap={4}>
              <ImportSection type="debtors" />
              <ImportSection type="ceremonies" />
              <ImportSection type="disclosures" />
            </Flex>
          </Layouts.Content>
        </Layouts.Root>
      </Box>
    </div>
  )
}

export default HomePage
