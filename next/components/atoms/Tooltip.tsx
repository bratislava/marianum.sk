import React, { PropsWithChildren, ReactNode, useRef } from 'react'
import { AriaTooltipProps, mergeProps, useTooltip, useTooltipTrigger } from 'react-aria'
import { TooltipTriggerProps, TooltipTriggerState, useTooltipTriggerState } from 'react-stately'
import { twMerge } from 'tailwind-merge'

/*
  Based on:
  https://stackoverflow.com/a/72578035
  https://react-spectrum.adobe.com/react-aria/useTooltipTrigger.html#example
  https://github.com/adobe/react-spectrum/blob/main/packages/%40react-spectrum/tooltip/src/Tooltip.tsx

  TODO: Mobile focusable + accesibility.
 */

const TooltipPopover = ({
  state,
  className,
  ...props
}: PropsWithChildren<{ state: TooltipTriggerState; className?: string } & AriaTooltipProps>) => {
  const { tooltipProps } = useTooltip(props, state)

  return (
    <div
      className={twMerge('absolute left-0 top-full -mt-[2px] flex flex-col', className)}
      {...mergeProps(props, tooltipProps)}
    >
      <div className="mb-[-1px] ml-4 inline-block overflow-hidden">
        <div className="h-3 w-3 origin-bottom-left rotate-45 bg-background-dark" />
      </div>

      <div className="flex flex-col rounded bg-background-dark px-4 py-3 text-white">
        {props.children}
      </div>
    </div>
  )
}

const Tooltip = ({
  children,
  tooltip,
  className,
  popoverClassname,
  delay = 0,
  ...rest
}: PropsWithChildren<TooltipTriggerProps> & {
  tooltip: ReactNode
  className?: string
  popoverClassname?: string
}) => {
  const propsWithDelay = { ...rest, delay }
  const state = useTooltipTriggerState(propsWithDelay)
  const ref = useRef<HTMLSpanElement>(null)

  const { triggerProps, tooltipProps } = useTooltipTrigger(propsWithDelay, state, ref)

  return (
    <span className={twMerge('relative', className)} ref={ref} {...triggerProps}>
      {children}
      {state.isOpen && (
        <TooltipPopover state={state} className={popoverClassname} {...tooltipProps}>
          {tooltip}
        </TooltipPopover>
      )}
    </span>
  )
}

export default Tooltip
