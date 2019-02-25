import React from 'react'
import './LinkButton.css'

export default function NavLinkButton(props) {
  const { tag, className, childrenm, ...otherProps } = props

  return React.createElement(
    props.tag,
    {
      className: ['NavLinkButton', props.className].join(' '),
      ...otherProps
    },
    props.children
  )
}

NavLinkButton.defaultProps ={
  tag: 'a',
}