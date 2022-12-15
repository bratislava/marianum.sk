import React from "react";
import ImportSection from "./ImportSection";
import {
  Box,
  ContentLayout,
  HeaderLayout,
  Layout,
  Stack,
} from "@strapi/design-system";

const HomePage = () => {
  return (
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
  );
};

export default HomePage;
