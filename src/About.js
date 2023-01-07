//instead of loading -> instead of using an a tag we should use link 
import { Link } from "react-router-dom"

const About = () => {
  return (
    <div>
        <h4>version : 1.0.0</h4>
        <a href="/"> Go back </a>
    </div>
  )
}

export default About