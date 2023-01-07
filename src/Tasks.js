import Task from "./Task"
const Tasks = ({tasks , onDelete , onToggle }) => {
    
  return (
    //tasks.push() we cannot do that as state is immutable we cannot change it we recreate it , restore all what is inside 
   // setTasks([...tasks , {}])
    <>
   {tasks.map( (task , index ) => (<Task key={index} task={task} onDelete={onDelete} onToggle={onToggle}/> ) )}
    </>
 
  )
}

export default Tasks
