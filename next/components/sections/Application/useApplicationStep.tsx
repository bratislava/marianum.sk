import Button from '@components/atoms/Button'
import Spinner from '@components/atoms/Spinner'
import { yupResolver } from '@hookform/resolvers/yup'
import { PropsWithChildren, useCallback, useEffect, useMemo } from 'react'
import { DeepPartial, FieldValues, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { AnySchema } from 'yup'

export const useApplicationStep = <T extends FieldValues>({
  yupShape,
  values,
  defaultValues,
  onContinue,
  onFormChange,
  sending,
  sendStep = false,
}: {
  yupShape: Record<keyof T, AnySchema>
  values?: DeepPartial<T>
  defaultValues: T
  onContinue: (values: T) => void
  onFormChange: (values: DeepPartial<T>) => void
  sending?: boolean
  sendStep?: boolean
}) => {
  const schema = useMemo(() => yup.object().shape(yupShape).required(), [yupShape])

  const useFormResult = useForm<T>({
    resolver: yupResolver(schema),
    defaultValues: (values ?? defaultValues) as DeepPartial<T>,
  })

  useEffect(() => {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const subscription = useFormResult.watch((value) => onFormChange(value))
    return () => subscription.unsubscribe()
  }, [onFormChange, useFormResult, useFormResult.watch])

  const Wrapper = useCallback(
    // eslint-disable-next-line @typescript-eslint/ban-types
    ({ children }: PropsWithChildren<{}>) => (
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      <form onSubmit={useFormResult.handleSubmit(onContinue)} className="w-full">
        <div>
          {children}
          {sendStep ? (
            <Button className="w-full" type="submit" disabled={sending}>
              <div className="flex items-center gap-2">
                {sending ? <Spinner /> : null}
                <span>Odoslať</span>
              </div>
            </Button>
          ) : (
            <Button className="w-full" type="submit">
              Pokračovať
            </Button>
          )}
        </div>
      </form>
    ),
    [onContinue, sendStep, sending, useFormResult],
  )

  // TODO: fix type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return { ...useFormResult, control: useFormResult.control as any, Wrapper }
}
