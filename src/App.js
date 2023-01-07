//components can be functions or classes 
// import React from 'react';
import Header from './Header'
import Task from './Tasks'
import  {BrowserRouter as Router , Route }  from 'react-router-dom'
//in order to load the db when the page loads , useEffect 
import { useState , useEffect} from "react"
import AddTask from './AddTask'
import Footer from './Footer'
import About from './About'
import { Buffer } from 'buffer';
global.Buffer = Buffer;


function App() {
  const [showAddTasks , setshowAddTasks] = useState(false)
  const [tasks , setTasks] = useState([])

  useEffect(() =>{
    const getTasks = async() => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    } 
    getTasks()
  } , [])
//Fetch Tasks 
  const fetchTasks = async() => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json() 
    return data
    }


//deleting task 
const deleteTask = async (id) =>{
  await fetch(`http://localhost:5000/tasks/${id}` , {
    method:'DELETE'
  }) 
// console.log('delete' , id);
setTasks(tasks.filter((task)=> task.id !== id ))
}

//toggling the reminder in the db as well as the UI 
const fetchTask = async(id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`)
  const data = await res.json() 
  return data
  }
//toggle reminder 
const toggleReminder = async (id) =>{
  const taskToToggle = await fetchTask()
  const updatedTask = {
    ...taskToToggle, reminder : !taskToToggle.reminder
  }
  const res = await fetch(`http://localhost:5000/tasks/${id}` , 
  {
    method:'PUT',
    headers :{
      'contect-type' : 'application/json'
    },
    body: JSON.stringify(updatedTask)
  } 

  )
  const data = await res.json()
  /////
  setTasks(tasks.map((task)=> task.id ===id ? 
  {...task , reminder : !data.reminder} 
  :task) )
}

//Add Task 
const addTask = async (task) => {
const res = await fetch('http://localhost:5000/tasks' , {
  method: 'POST' ,
  headers :{
'content-type': 'application/json',
  },
  //to convert for js object to json 
  body : JSON.stringify(task),
})

const data = await res.json()
setTasks([...tasks , data])
//   const id = Math.floor(Math.random() *10000 ) +1 
//   const newTask = {id ,...task}
//   setTasks([...tasks, newTask])
// console.log(task)
}



//STATES GETS PASSED DOWN , ACTIONS GETS PASSED UP 

  return (
   <Router>
    <div className="container">
   {/* <h1 style={{color: 'red' , background : 'grey'}}> hahaha </h1>
   <h2 style={hidingStyle}>I am here </h2> */}
   <h1>Task Tracker </h1>
    <Header  onAdd ={() => setshowAddTasks (!showAddTasks) } showAdd={showAddTasks}/>
    <Route path='/' exact render={(props) => (
      <>
       { showAddTasks && <AddTask onAdd={addTask}/>}
    { tasks.length >0 ? <Task tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 'No tasks to show '}
      </>
    )}/>
    <Route path='/about'  component={About}/>
    <Footer/>
    </div>  
    </Router>
    //<h1></h1> JSX expression must have one parent element 
    //JSX : javasxript synax extension
  );
}

const hidingStyle = {
  color: 'red' , background : 'grey'
}
// class App extends React.Component{
//   render(){
//     return <h1> hey from a class </h1>
//   }
// }
export default App;
