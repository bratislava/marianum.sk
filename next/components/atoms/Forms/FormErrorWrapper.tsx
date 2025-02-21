import { ErrorMessage } from '@hookform/error-message'
import fromPairs from 'lodash/fromPairs'
import get from 'lodash/get'
import { useTranslation } from 'next-i18next'
import React, { PropsWithChildren, useMemo } from 'react'
import { FormState } from 'react-hook-form'

import { ErrorIcon } from '@/assets/icons'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FormErrorWrapperProps = { formState: FormState<any>; name?: string }

const FormErrorWrapper = ({
  name,
  formState,
  children,
}: PropsWithChildren<FormErrorWrapperProps>) => {
  const { t } = useTranslation()

  const translatedErrors = useMemo(
    () =>
      fromPairs(
        Object.entries(formState.errors ?? {}).map(([key, value]) => [key, t(value) || value]),
      ),
    // https://react-hook-form.com/api/useform/formstate
    // formState.errors would not work
    [formState, t],
  )
  const hasError = Boolean(name && translatedErrors && get(translatedErrors, name))

  return (
    <div className={hasError ? 'border-l-4 border-error pl-4' : undefined}>
      {children}
      {hasError ? (
        <span className="mt-2 block text-error">
          <ErrorIcon className="mr-2 inline h-5 w-5" />
          {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
          <ErrorMessage errors={translatedErrors} name={name!} />
        </span>
      ) : null}
    </div>
  )
}

export default FormErrorWrapper
