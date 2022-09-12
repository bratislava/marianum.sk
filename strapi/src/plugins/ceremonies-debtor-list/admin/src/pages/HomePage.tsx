import React from "react";
import ImportSection from "./ImportSection";
import {
  Box,
  Layout,
  HeaderLayout,
  ContentLayout,
  Stack,
} from "@strapi/design-system";

const HomePage = () => {
  return (
    <Box background="neutral100">
      <Layout>
        <HeaderLayout title="Import dlžníkov a obradov"></HeaderLayout>
        <ContentLayout>
          <Stack spacing={4}>
            <ImportSection type="debtors" />
            <ImportSection type="ceremonies" />
          </Stack>
        </ContentLayout>
      </Layout>
    </Box>
  );
};

export default HomePage;
