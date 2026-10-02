import { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useFetchClient } from '@strapi/strapi/admin'
import { Alert, Box, Button, Link, Loader, Flex, Typography } from '@strapi/design-system'

const updateUrls = {
  debtors: '/ceremonies-debtor-list/update-debtors',
  ceremonies: '/ceremonies-debtor-list/update-ceremonies',
  disclosures: '/ceremonies-debtor-list/update-disclosures',
}

const headerTexts = {
  debtors: 'Import dlžníkov',
  ceremonies: 'Import obradov',
  disclosures: 'Import zverejňovania',
}

const importLinks = {
  debtors: (importId: string) =>
    `/content-manager/collection-types/api::debtor.debtor?filters[$and][0][importId][$eq]=${importId}`,
  ceremonies: (importId: string) =>
    `/content-manager/collection-types/api::ceremony.ceremony?filters[$and][0][importId][$eq]=${importId}`,
  disclosures: (importId: string) =>
    `/content-manager/collection-types/api::disclosure.disclosure?filters[$and][0][importId][$eq]=${importId}`,
}

type ImportSectionProps = {
  type: 'debtors' | 'ceremonies' | 'disclosures'
}

const ImportSection = ({ type }: ImportSectionProps) => {
  const inputFileRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<any>(null)
  const [error, setError] = useState<any>(null)
  const { put } = useFetchClient()

  const [showAdditionalMessage, setShowAdditionalMessage] = useState(true)

  const handleSubmit = () => {
    const file = inputFileRef.current!.files![0] // TODO fix !

    const formData = new FormData()
    formData.append('file', file)

    setLoading(true)
    setSuccess(null)
    setError(null)

    put(updateUrls[type], formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        setSuccess(response)
      })
      .catch((error) => {
        setError(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

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
      <Flex direction="column" alignItems="stretch" gap={4}>
        <Typography variant="delta" tag="h2">
          {headerTexts[type]}
        </Typography>
        {loading && <Loader />}
        {success && (
          <Flex direction="column" alignItems="stretch" gap={2}>
            <Alert
              title="Nahrávanie úspešné"
              action={
                success.data?.importId && (
                  <Link tag={NavLink} to={importLinks[type](success.data.importId)}>
                    Zobraziť nahrané dáta
                  </Link>
                )
              }
              variant="success"
              onClose={() => setSuccess(null)}
              closeLabel="Zatvoriť"
            >
              {success.data.message} ({success.data.executionTime}ms)
            </Alert>
            {showAdditionalMessage && success.data.additionalMessage ? (
              <Alert
                title="V dátach sa nachádzajú cintoríny bez záznamu v Strapi: "
                variant="default"
                onClose={() => setShowAdditionalMessage(false)}
                closeLabel="Zatvoriť"
              >
                {success.data.additionalMessage}
              </Alert>
            ) : null}
          </Flex>
        )}
        {error && (
          <Alert
            title="Nahrávanie neúspešné"
            variant="danger"
            onClose={() => setError(null)}
            closeLabel="Zatvoriť"
          >
            {error?.message ?? error.toString()}
          </Alert>
        )}
        <input type="file" ref={inputFileRef} />
        <div>
          <Button onClick={handleSubmit} loading={loading}>
            Nahrať
          </Button>
        </div>
      </Flex>
    </Box>
  )
}

export default ImportSection
