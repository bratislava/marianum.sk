import cx from 'classnames'
import filesize from 'filesize'
import { useTranslation } from 'next-i18next'
import prntr from 'prntr'
import { useCallback, useReducer } from 'react'

import CheckIcon from '../../../assets/check.svg'
import CheckCircleIcon from '../../../assets/check_circle.svg'
import DownloadIcon from '../../../assets/download.svg'
import PrintIcon from '../../../assets/print.svg'
import XIcon from '../../../assets/x-alt.svg'
import { UploadFileEntityFragment } from '../../../graphql'
import { AnimateHeight } from '../../atoms/AnimateHeight'
import Button from '../../atoms/Button'
import { ChecklistActionKind, ChecklistItem, checklistReducer } from './checklistReducer'

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

export type ChecklistProps = {
  items: ChecklistItem[]
  downloadFile: UploadFileEntityFragment | null | undefined
}

const Checklist = ({ items, downloadFile }: ChecklistProps) => {
  const { t } = useTranslation()

  const [checklistState, dispatchChecklistState] = useReducer(checklistReducer, { items })

  const openItemHandler = useCallback((itemKey: string) => {
    dispatchChecklistState({
      type: ChecklistActionKind.OpenItem,
      itemKey,
    })
  }, [])

  const openNextItemHandler = useCallback((itemKey: string) => {
    dispatchChecklistState({
      type: ChecklistActionKind.OpenNextItem,
      itemKey,
    })
  }, [])

  const completeItemHandler = useCallback((itemKey: string) => {
    dispatchChecklistState({
      type: ChecklistActionKind.CompleteItem,
      itemKey,
    })
  }, [])

  const uncompleteItemHandler = useCallback((itemKey: string) => {
    dispatchChecklistState({
      type: ChecklistActionKind.UncompleteItem,
      itemKey,
    })
  }, [])

  const handlePrint = useCallback(() => {
    // we can only print pdf files
    if (downloadFile?.attributes?.ext === '.pdf' && downloadFile?.attributes?.url) {
      prntr({ printable: downloadFile.attributes.url, type: 'pdf' })
    }
  }, [downloadFile?.attributes])

  return (
    <div className="flex w-full flex-col gap-6">
      {checklistState.items.map(
        ({ key, title, description, isOpen = false, isCompleted = false }, index) => (
          <div className="flex gap-10" key={key}>
            <ChecklistLineWithRadio
              hideTopLine={index === 0}
              hideBottomLine={index + 1 === items.length}
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
                onKeyUp={(e) => (e.code === 'Enter' || e.code === 'Space') && openItemHandler(key)}
                onClick={() => openItemHandler(key)}
                className="flex items-center p-6"
              >
                <div
                  className={cx('transition-all sm:hidden', {
                    'opacity-1 w-10 pr-4': isCompleted,
                    'w-0 opacity-0': !isCompleted,
                  })}
                >
                  <ChecklistRadio className="sm:hidden" isOpen={false} isCompleted={isCompleted} />
                </div>
                <h4>{title}</h4>
              </button>
              <AnimateHeight isVisible={isOpen}>
                <div className="flex w-full flex-col gap-6 px-6 pb-6">
                  {/* item description */}
                  {description && <div className="mt-4">{description}</div>}
                  {
                    // download buttons for last item
                    index + 1 === items.length ? (
                      downloadFile?.attributes?.url ? (
                        <div className="flex flex-col gap-4 sm:flex-row">
                          {/* TODO make the file really downloadable and printable */}
                          <Button
                            startIcon={<DownloadIcon />}
                            target="_blank"
                            href={downloadFile.attributes.url}
                            // TODO format size to MB if needed
                            /* eslint-disable @typescript-eslint/restrict-template-expressions */
                            aria-label={`${t('components.molecules.Checklist.download')} ${
                              downloadFile.attributes.name
                            } ${filesize(downloadFile.attributes.size * 1000)}`}
                            /* eslint-enable @typescript-eslint/restrict-template-expressions */
                          >
                            {t('components.molecules.Checklist.download')}
                          </Button>
                          {/* we can only print pdf files */}
                          {downloadFile.attributes.ext === '.pdf' && (
                            <Button
                              startIcon={<PrintIcon />}
                              variant="secondary"
                              onPress={handlePrint}
                            >
                              {t('components.molecules.Checklist.print')}
                            </Button>
                          )}
                        </div>
                      ) : null
                    ) : isCompleted ? (
                      // completed item buttons
                      <div className="flex flex-col gap-4 sm:flex-row">
                        <Button
                          onPress={() => uncompleteItemHandler(key)}
                          variant="secondary"
                          startIcon={<XIcon />}
                          aria-label={t('components.molecules.Checklist.aria.markAsUncomplete')}
                        >
                          {t('components.molecules.Checklist.markAsUncomplete')}
                        </Button>
                      </div>
                    ) : (
                      // uncompleted item buttons
                      <div className="flex flex-col gap-4 sm:flex-row">
                        <Button
                          onPress={() => completeItemHandler(key)}
                          startIcon={<CheckCircleIcon />}
                          aria-label={t('components.molecules.Checklist.aria.markAsComplete')}
                        >
                          {t('components.molecules.Checklist.markAsComplete')}
                        </Button>
                        <Button
                          onPress={() => openNextItemHandler(key)}
                          variant="secondary"
                          aria-label={t('components.molecules.Checklist.aria.skip')}
                        >
                          {t('components.molecules.Checklist.skip')}
                        </Button>
                      </div>
                    )
                  }
                </div>
              </AnimateHeight>
            </div>
          </div>
        ),
      )}
    </div>
  )
}

export default Checklist
