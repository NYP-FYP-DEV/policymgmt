import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'



const Header = ({ title, onAdd, showAdd }) => {
  return (
    <header className='header'>
        <h1>{title}</h1>
        <Button color={showAdd ? 'red':'green' } text={showAdd ? 
        'Close': 'Add'} onClick={onAdd}/>
    </header>
  )
}

const Header2 = ({ title, onAdd, showAdd }) => {
  return (
    <header className='header'>
        <h1>{title}</h1>
        <Button color={showAdd ? 'red':'green' } text={showAdd ? 
        'Close': 'Add'} onClick={onAdd}/>
    </header>
  )
}

Header2.defaultProps = {
  title: 'Make Payment',
}

Header2.propTypes = {
  title: PropTypes.string.isRequired
}

Header.defaultProps = {
    title: 'Create Client Policy',
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

// CSS in JS
// const headingStyle = {
//     color: 'red', 
//     backgroundColor: 'black'
// } -- alternative way

export default Header
