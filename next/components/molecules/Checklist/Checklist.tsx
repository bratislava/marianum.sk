import cx from 'classnames'
import filesize from 'filesize'
import { useTranslation } from 'next-i18next'
import prntr from 'prntr'
import { useCallback, useId, useMemo } from 'react'
import { useLocalStorage } from 'usehooks-ts'

import {
  CheckCircleIcon,
  CheckIcon,
  CloseCircleIcon,
  DownloadIcon,
  PrintIcon,
} from '@/assets/icons'
import { AnimateHeight } from '@/components/atoms/AnimateHeight'
import Button from '@/components/atoms/Button'
import { ComponentGeneralProcedureItem, UploadFileEntityFragment } from '@/graphql'

type ChecklistRadioProps = {
  isOpen?: boolean
  isCompleted?: boolean
  className?: string
}

const ChecklistRadio = ({
  isOpen = false,
  isCompleted = false,
  className,
}: ChecklistRadioProps) => {
  return (
    <div
      className={cx(
        'relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-primary',
        {
          'border-2': !isCompleted,
        },
        className,
      )}
    >
      <div
        className={cx('absolute h-3 w-3 rounded-full bg-primary transition-transform', {
          'scale-0': !isOpen || isCompleted,
          'scale-1': isOpen,
        })}
      />
      <div
        className={cx(
          'absolute flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white transition-transform',
          {
            'scale-0': !isCompleted,
            'scale-1': isCompleted,
          },
        )}
      >
        <CheckIcon />
      </div>
    </div>
  )
}

type ChecklistLineWithRadioProps = {
  hideTopLine?: boolean
  hideBottomLine?: boolean
  isOpen?: boolean
  isCompleted?: boolean
}

const ChecklistLineWithRadio = ({
  hideTopLine = false,
  hideBottomLine = false,
  isOpen = false,
  isCompleted = false,
}: ChecklistLineWithRadioProps) => {
  return (
    <div className="hidden flex-col items-center gap-2 sm:flex">
      <div className={cx('-mt-6 h-10 w-[2px] bg-primary', { invisible: hideTopLine })} />
      <ChecklistRadio isOpen={isOpen} isCompleted={isCompleted} />
      <div className={cx('h-full w-[2px] flex-1 bg-primary', { invisible: hideBottomLine })} />
    </div>
  )
}

const getAriaId = (id: string, index: number) => `checklist-${id}-${index}`

export type ChecklistProps = {
  localStorageId: string
  updatedAt: string
  items: ComponentGeneralProcedureItem[]
  downloadFile: UploadFileEntityFragment | null | undefined
}

const Checklist = ({ localStorageId, updatedAt, items, downloadFile }: ChecklistProps) => {
  const { t, i18n } = useTranslation()

  // The saved state is valid up until we change anything in procedures in Strapi. Therefore, we can save only indexes
  // instead of keys as when something changes the id will be regenerated.
  const checklistId = useMemo(() => {
    return `marianum-${localStorageId}-${updatedAt}`
  }, [localStorageId, updatedAt])

  const id = useId()

  // The state is persisted in local storage for future sessions.
  const [localChecklistState, setLocalChecklistState] = useLocalStorage(checklistId, {
    completedStepsIndexes: [] as number[],
    openStepIndex: 0,
  })

  const handleItemOpen = (index: number) => {
    setLocalChecklistState((state) => ({ ...state, openStepIndex: index }))
  }

  const handleNextItemOpen = () => {
    const newIndex = localChecklistState.openStepIndex + 1
    if (newIndex > items.length) {
      return
    }
    setLocalChecklistState((state) => ({ ...state, openStepIndex: newIndex }))
  }

  const handleItemComplete = (index: number) => {
    const newIndex = localChecklistState.openStepIndex + 1

    setLocalChecklistState((state) => ({
      ...state,
      completedStepsIndexes: [...state.completedStepsIndexes, index],
      ...(newIndex > items.length ? {} : { openStepIndex: newIndex }),
    }))
  }

  const handleItemUncomplete = (index: number) => {
    setLocalChecklistState((state) => ({
      ...state,
      completedStepsIndexes: state.completedStepsIndexes.filter((i) => i !== index),
    }))
  }

  const handlePrint = useCallback(() => {
    // we can only print pdf files
    if (downloadFile?.attributes?.ext === '.pdf' && downloadFile?.attributes?.url) {
      prntr({ printable: downloadFile.attributes.url, type: 'pdf' })
    }
  }, [downloadFile?.attributes])

  return (
    <div className="flex w-full flex-col gap-6">
      {items.map(({ title, description }, index) => {
        const isOpen = localChecklistState.openStepIndex === index
        const isCompleted = localChecklistState.completedStepsIndexes.includes(index)
        const isLast = index + 1 === items.length

        return (
          // eslint-disable-next-line react/no-array-index-key
          <div className="flex gap-10" key={index}>
            <ChecklistLineWithRadio
              hideTopLine={index === 0}
              hideBottomLine={isLast}
              isOpen={isOpen}
              isCompleted={isCompleted}
            />
            <div
              className={cx(
                'flex w-full flex-col border border-border bg-white outline-offset-2 outline-primary focus:outline-2',
                {
                  'cursor-auto': isOpen,
                },
              )}
            >
              {/* item title */}
              <button
                type="button"
                onKeyUp={(e) => (e.code === 'Enter' || e.code === 'Space') && handleItemOpen(index)}
                onClick={() => handleItemOpen(index)}
                className="flex items-center p-6"
                aria-expanded={isOpen}
                aria-controls={getAriaId(id, index)}
              >
                <div
                  className={cx('transition-all sm:hidden', {
                    'opacity-1 w-10 pr-4': isCompleted,
                    'w-0 opacity-0': !isCompleted,
                  })}
                >
                  <ChecklistRadio className="sm:hidden" isOpen={false} isCompleted={isCompleted} />
                </div>
                <h4 className="text-left">{title}</h4>
              </button>
              <AnimateHeight isVisible={isOpen}>
                <div className="flex w-full flex-col gap-6 px-6 pb-6" id={getAriaId(id, index)}>
                  {/* item description */}
                  {description && <div className="text-lg">{description}</div>}
                  {
                    // download buttons for last item
                    isLast ? (
                      downloadFile?.attributes?.url ? (
                        <div className="flex flex-col gap-4 sm:flex-row">
                          <Button
                            startIcon={<DownloadIcon />}
                            target="_blank"
                            href={downloadFile.attributes.url}
                            // TODO use hook for filesize
                            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                            aria-label={`${t('Checklist.aria.download')} ${
                              downloadFile.attributes.name
                            } ${filesize(downloadFile.attributes.size * 1000, {
                              round: 1,
                              locale: i18n.language,
                            })}`}
                          >
                            {t('Checklist.download')}
                          </Button>
                          {/* we can only print pdf files */}
                          {downloadFile.attributes.ext === '.pdf' && (
                            <Button
                              startIcon={<PrintIcon />}
                              variant="secondary"
                              onPress={handlePrint}
                            >
                              {t('Checklist.print')}
                            </Button>
                          )}
                        </div>
                      ) : null
                    ) : isCompleted ? (
                      // completed item buttons
                      <div className="flex flex-col gap-4 sm:flex-row">
                        <Button
                          onPress={() => handleItemUncomplete(index)}
                          variant="secondary"
                          startIcon={<CloseCircleIcon />}
                          aria-label={t('Checklist.aria.markAsUncomplete')}
                        >
                          {t('Checklist.markAsUncomplete')}
                        </Button>
                      </div>
                    ) : (
                      // uncompleted item buttons
                      <div className="flex flex-col gap-4 sm:flex-row">
                        <Button
                          onPress={() => handleItemComplete(index)}
                          startIcon={<CheckCircleIcon />}
                          aria-label={t('Checklist.aria.markAsComplete')}
                        >
                          {t('Checklist.markAsComplete')}
                        </Button>
                        <Button
                          onPress={() => handleNextItemOpen()}
                          variant="secondary"
                          aria-label={t('Checklist.aria.skip')}
                        >
                          {t('Checklist.skip')}
                        </Button>
                      </div>
                    )
                  }
                </div>
              </AnimateHeight>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Checklist
