import cx from 'classnames'
import { useCallback, useReducer } from 'react'

import CheckIcon from '../../../assets/check.svg'
import CheckCircleIcon from '../../../assets/check_circle.svg'
import XIcon from '../../../assets/x-alt.svg'
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
        className={cx('absolute h-6 w-6 rounded-full bg-primary text-white transition-transform', {
          'scale-0': !isCompleted,
          'scale-1': isCompleted,
        })}
      >
        <CheckIcon className="scale-75" />
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
}

const Checklist = ({ items }: ChecklistProps) => {
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

  return (
    <div className="flex w-full flex-col gap-6">
      {checklistState.items.map(
        (
          { key, title, description, isOpen = false, isCompleted = false, footer = null },
          index,
        ) => (
          <div className="flex gap-10" key={key}>
            <ChecklistLineWithRadio
              hideTopLine={index === 0}
              hideBottomLine={index + 1 === items.length}
              isOpen={isOpen}
              isCompleted={isCompleted}
            />
            <div
              className={cx(
                'flex w-full flex-col bg-white outline-offset-2 outline-primary focus:outline-2',
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
                  <div className="pt-4">{description}</div>
                  {
                    // custom item footer
                    index + 1 === items.length ? (
                      // TODO add download buttons to last step
                      <div />
                    ) : (
                      footer ||
                      (isCompleted ? (
                        // completed item buttons
                        <div className="flex flex-col gap-4 sm:flex-row">
                          <Button
                            onPress={() => uncompleteItemHandler(key)}
                            variant="secondary"
                            startIcon={<XIcon />}
                          >
                            Označť ako nevybavené
                          </Button>
                        </div>
                      ) : (
                        // uncompleted item buttons
                        <div className="flex flex-col gap-4 sm:flex-row">
                          <Button
                            onPress={() => completeItemHandler(key)}
                            startIcon={<CheckCircleIcon />}
                          >
                            Vybavené
                          </Button>
                          <Button onPress={() => openNextItemHandler(key)} variant="secondary">
                            Preskočiť
                          </Button>
                        </div>
                      ))
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
