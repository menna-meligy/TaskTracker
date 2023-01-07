 //rafce enter 
 import PropTypes from 'prop-types' 
import Button from './Button' 
import { useLocation } from 'react-router-dom'

 const Header = ({title , onAdd , showAdd }) => {
  const location = useLocation()


   return (
     <div>
       <header className='header'>
   { location.pathname === '/' && (
   <Button  color={showAdd ? 'red' : 'green'} text={showAdd ? 'close' : 'Add'} onClick= {onAdd}/>
   )}
   {/* <Button color='red' text='Addd'/>
   <Button color='blue' text='Addd'/> */}
       </header>
     </div>
   )
 }

 Header.defaultProps = {
   title : 'Task Tracker'
 }
 
 Header.prototypes = {
 title : PropTypes.string.isRequired
 }
 export default Header
 