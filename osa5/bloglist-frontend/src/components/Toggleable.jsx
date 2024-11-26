import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'

const Toggleable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hide = { display: visible ? 'none' : '' }
  const show = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })
  if(props.user) {
    return (
      <div>
        <div style={hide}>
          <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        </div>
        <div style={show}>
          {props.children}
          <button onClick={toggleVisibility}>cancel</button>
        </div>
      </div>
    )
  }
  return null
})

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Toggleable