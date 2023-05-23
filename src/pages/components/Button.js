import PropTypes from 'prop-types'

const Button = ({ color, text, onClick }) => {
    return (
      <button
        onClick={onClick}
        style={{ backgroundColor: color }}
        className='btn'
      >
        {text}
      </button>
    )
  }

const Button1 = ({ color, text, onClick }) => {
    return (
      <button
        onClick={onClick}
        style={{ backgroundColor: color }}
        className='btn'
      >
        {text}
      </button>
    )
  }


Button.defaultProps = {
    color: 'steelblue'
}

Button1.defaultProps = {
  color: 'steelblue'
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
}

Button1.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
}

export default Button
