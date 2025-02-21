import React from "react";
import { Box, ContentLayout, HeaderLayout, Layout, Stack } from '@strapi/design-system'
import ImportSection from '../../components/ImportSection'

const HomePage = () => {
  return (
    <div>
      <Box background="neutral100">
        <Layout>
        <HeaderLayout title="Import Excel súborov"></HeaderLayout>
        <ContentLayout>
          <Stack spacing={4}>
            <ImportSection type="debtors" />
            <ImportSection type="ceremonies" />
            <ImportSection type="disclosures" />
          </Stack>
        </ContentLayout>
      </Layout>
      </Box>
    </div>
  )
}

export default HomePage
