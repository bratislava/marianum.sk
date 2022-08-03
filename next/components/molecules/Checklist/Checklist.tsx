import cx from 'classnames'
import { MouseEvent, useCallback, useReducer } from 'react'

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
        'relative flex shrink-0 h-6 w-6 items-center justify-center rounded-full border-primary',
        {
          'border-2': !isCompleted,
        },
        className,
      )}
    >
      <div
        className={cx('absolute w-3 h-3 rounded-full bg-primary transition-transform', {
          'scale-0': !isOpen || isCompleted,
          'scale-1': isOpen,
        })}
      />
      <div
        className={cx('absolute w-6 h-6 rounded-full bg-primary text-white transition-transform', {
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
      <div className={cx('h-10 w-[2px] bg-primary -mt-6', { invisible: hideTopLine })} />
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

  const openItemHandler = useCallback((itemKey: string, e?: MouseEvent) => {
    if (e) e.stopPropagation()
    dispatchChecklistState({
      type: ChecklistActionKind.OpenItem,
      itemKey,
    })
  }, [])

  const openNextItemHandler = useCallback((itemKey: string, e?: MouseEvent) => {
    if (e) e.stopPropagation()
    dispatchChecklistState({
      type: ChecklistActionKind.OpenNextItem,
      itemKey,
    })
  }, [])

  const completeItemHandler = useCallback((itemKey: string, e?: MouseEvent) => {
    if (e) e.stopPropagation()
    dispatchChecklistState({
      type: ChecklistActionKind.CompleteItem,
      itemKey,
    })
  }, [])

  const uncompleteItemHandler = useCallback((itemKey: string, e?: MouseEvent) => {
    if (e) e.stopPropagation()
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
                'flex w-full flex-col bg-white focus:outline-2 outline-primary outline-offset-2',
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
                    'w-10 opacity-1 pr-4': isCompleted,
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
                    footer ??
                      (isCompleted ? (
                        // completed item buttons
                        <div className="flex flex-col gap-4 sm:flex-row">
                          <Button
                            onClick={(e) => uncompleteItemHandler(key, e)}
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
                            onClick={(e) => completeItemHandler(key, e)}
                            startIcon={<CheckCircleIcon />}
                          >
                            Vybavené
                          </Button>
                          <Button onClick={(e) => openNextItemHandler(key, e)} variant="secondary">
                            Preskočiť
                          </Button>
                        </div>
                      ))
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
