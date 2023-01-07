import React from 'react'
import propTypes from 'prop-types'

const Button = ({color , text , onClick}) => {
    // const onClick = () =>{
    //     console.log('click pressed ');
    // }
  return ( <button  onClick= {onClick}  className='btn btnn' style={{backgroundColor :color}}>{text}</button> )
}

Button.defaultProps = {
color : 'steelblue'
}

Button.propTypes ={
    color : propTypes.string,
    text : propTypes.string,
    onClick : propTypes.func.isRequired
}
export default Button
