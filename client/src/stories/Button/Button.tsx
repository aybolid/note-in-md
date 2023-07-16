import React, { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

type ButtonProps = (
  | { as: 'link'; path: string }
  | {
      as: 'btn'
      onClick: (params: never) => void
      type?: 'button' | 'submit' | 'reset'
    }
) & {
  children: ReactNode
  variant: 'primary' | 'secondary' | 'success' | 'danger'
  size: 'small' | 'medium' | 'large'
  className?: string
}

const setVariantStyles = (variant: ButtonProps['variant']) => {
  switch (variant) {
    case 'primary':
      return 'text-stone-50 hover:text-stone-100 bg-purple-500 hover:bg-purple-600'
    case 'secondary':
      return 'text-purple-500 hover:text-stone-100 border border-purple-500 hover:bg-purple-500'
    case 'success':
      return 'text-stone-50 hover:text-stone-100 bg-green-500 hover:bg-green-600'
    case 'danger':
      return 'text-stone-50 hover:text-stone-100 bg-red-500 hover:bg-red-600'
    default:
      return ''
  }
}

const setSizeStyles = (size: ButtonProps['size']) => {
  switch (size) {
    case 'small':
      return 'text-sm px-2 py-1'
    case 'medium':
      return 'text-base px-4 py-2'
    case 'large':
      return 'text-xl px-6 py-3'
    default:
      return ''
  }
}

const Button: React.FC<ButtonProps> = (props) => {
  const btnClassName = `button ${setVariantStyles(props.variant)} ${setSizeStyles(props.size)} ${
    props.className || ''
  } `

  switch (props.as) {
    case 'link':
      return (
        <NavLink className={btnClassName} to={props.path}>
          {props.children}
        </NavLink>
      )
    case 'btn':
      return (
        <button className={btnClassName} type={props.type} onClick={props.onClick}>
          {props.children}
        </button>
      )
    default:
      return null
  }
}

export default Button
