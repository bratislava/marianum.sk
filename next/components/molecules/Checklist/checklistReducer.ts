/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable consistent-return */
/* eslint-disable default-case */

import { ComponentGeneralProcedureItem } from '../../../graphql'

export enum ChecklistActionKind {
  OpenItem = 'OpenItem',
  OpenNextItem = 'OpenNextItem',
  CloseItem = 'CloseItem',
  CompleteItem = 'CompleteItem',
  UncompleteItem = 'UncompleteItem',
}

interface ChecklistOpenItemActionProps {
  type: ChecklistActionKind.OpenItem
  itemKey: string
}

interface ChecklistOpenNextItemActionProps {
  type: ChecklistActionKind.OpenNextItem
  itemKey: string
}

interface ChecklistCloseItemActionProps {
  type: ChecklistActionKind.CloseItem
  itemKey: string
}

interface ChecklistCompleteItemActionProps {
  type: ChecklistActionKind.CompleteItem
  itemKey: string
}

interface ChecklistUncompleteItemActionProps {
  type: ChecklistActionKind.UncompleteItem
  itemKey: string
}

export type ChecklistAction =
  | ChecklistOpenItemActionProps
  | ChecklistOpenNextItemActionProps
  | ChecklistCloseItemActionProps
  | ChecklistCompleteItemActionProps
  | ChecklistUncompleteItemActionProps

export type ChecklistItem = ComponentGeneralProcedureItem & {
  isOpen?: boolean
  isCompleted?: boolean
  key: string
}

export interface ChecklistState {
  items: ChecklistItem[]
}

export const checklistReducer = (
  state: ChecklistState,
  action: ChecklistAction,
): ChecklistState => {
  const currentItemIndex = state.items.findIndex((item) => item.key === action.itemKey)

  switch (action.type) {
    // open item based on key and close all others
    case ChecklistActionKind.OpenItem:
      return {
        ...state,
        items: state.items.map((item) =>
          item.key === action.itemKey ? { ...item, isOpen: true } : { ...item, isOpen: false },
        ),
      }

    // open next item based on key and close all others
    case ChecklistActionKind.OpenNextItem:
      if (currentItemIndex >= 0) {
        return {
          ...state,
          items: state.items.map((item, index) =>
            index === currentItemIndex + 1 ? { ...item, isOpen: true } : { ...item, isOpen: false },
          ),
        }
      }
      return state

    // open item based on key and close all others
    case ChecklistActionKind.CloseItem:
      return {
        ...state,
        items: state.items.map((item) =>
          item.key === action.itemKey ? { ...item, isOpen: false } : item,
        ),
      }

    // complete item based on key and also open next item (and close all others)
    case ChecklistActionKind.CompleteItem:
      if (currentItemIndex >= 0) {
        return {
          ...state,
          items: state.items.map((item, index) => ({
            ...item,
            isOpen: index === currentItemIndex + 1, // open next one
            isCompleted: index === currentItemIndex ? true : item.isCompleted,
          })),
        }
      }
      return state

    // uncomplete item based on key
    case ChecklistActionKind.UncompleteItem:
      return {
        ...state,
        items: state.items.map((item) =>
          item.key === action.itemKey ? { ...item, isCompleted: false } : item,
        ),
      }
  }
}
