import React, { useRef, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import {
  Alert,
  Box,
  Button,
  Link,
  Loader,
  Stack,
  Typography,
} from "@strapi/design-system";

const updateUrls = {
  debtors: "/ceremonies-debtor-list/update-debtors",
  ceremonies: "/ceremonies-debtor-list/update-ceremonies",
  disclosures: "/ceremonies-debtor-list/update-disclosures",
};

const headerTexts = {
  debtors: "Import dlžníkov",
  ceremonies: "Import obradov",
  disclosures: "Import zverejňovania",
};

const importLinks = {
  debtors: (importId: string) =>
    `/content-manager/collectionType/api::debtor.debtor?filters[$and][0][importId][$eq]=${importId}`,
  ceremonies: (importId: string) =>
    `/content-manager/collectionType/api::ceremony.ceremony?filters[$and][0][importId][$eq]=${importId}`,
  disclosures: (importId: string) =>
    `/content-manager/collectionType/api::disclosure.disclosure?filters[$and][0][importId][$eq]=${importId}`,
};

type ImportSectionProps = {
  type: "debtors" | "ceremonies" | "disclosures";
};

const ImportSection: React.FC<ImportSectionProps> = ({ type }) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = () => {
    const file = inputFileRef.current.files[0];

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setSuccess(null);
    setError(null);

    axiosInstance
      .put(updateUrls[type], formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setSuccess(response);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box
      background="neutral0"
      hasRadius
      shadow="filterShadow"
      paddingTop={6}
      paddingBottom={6}
      paddingLeft={7}
      paddingRight={7}
    >
      <Stack spacing={4}>
        <Typography variant="delta" as="h2">
          {headerTexts[type]}
        </Typography>
        {loading && <Loader />}
        {success && (
          <Alert
            title="Nahrávanie úspešné"
            action={
              success.data?.importId && (
                <Link to={importLinks[type](success.data.importId)}>
                  Zobraziť nahrané data
                </Link>
              )
            }
            variant="success"
            onClose={() => setSuccess(null)}
          >
            {success.data.message}
          </Alert>
        )}
        {error && (
          <Alert
            title="Nahrávanie neúspešné"
            variant="danger"
            onClose={() => setError(null)}
          >
            {error?.response?.data?.message ?? error.toString()}
          </Alert>
        )}
        <input type="file" ref={inputFileRef} />
        <div>
          <Button onClick={handleSubmit} disabled={loading}>
            Nahrať
          </Button>
        </div>
      </Stack>
    </Box>
  );
};

export default ImportSection;
