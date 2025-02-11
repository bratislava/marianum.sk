declare module '@strapi/design-system' {
    import { FC, ReactNode } from 'react'

    export interface BoxProps {
        background?: string
        hasRadius?: boolean
        shadow?: string
        paddingTop?: number
        paddingBottom?: number
        paddingLeft?: number
        paddingRight?: number
        children?: ReactNode
    }

    export interface TypographyProps {
        variant?: string
        as?: string
        children?: ReactNode
    }

    export interface AlertProps {
        title?: string
        action?: ReactNode
        variant?: 'success' | 'danger'
        onClose?: () => void
        children?: ReactNode
    }

    export interface ButtonProps {
        onClick?: () => void
        disabled?: boolean
        children?: ReactNode
    }

    export interface LinkProps {
        to: string
        children?: ReactNode
    }

    export interface LayoutProps {
        children?: ReactNode
    }

    export interface HeaderLayoutProps {
        title: string
        subtitle?: string
        navigationAction?: ReactNode
        primaryAction?: ReactNode
    }

    export interface ContentLayoutProps {
        children?: ReactNode
    }

    export const Box: FC<BoxProps>
    export const Typography: FC<TypographyProps>
    export const Alert: FC<AlertProps>
    export const Button: FC<ButtonProps>
    export const Link: FC<LinkProps>
    export const Stack: FC<{ spacing?: number; children?: ReactNode }>
    export const Loader: FC
    export const Layout: FC<LayoutProps>
    export const HeaderLayout: FC<HeaderLayoutProps>
    export const ContentLayout: FC<ContentLayoutProps>
}
