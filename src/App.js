import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

// Samples
import tasks from './sample/tasks.json'; 

// Components
import Tasks from './components/Tasks';
import TaskForm from './components/TaskForm';
import Posts from './components/Posts'

class App extends Component {
  
  state = {
    tasks: tasks
  }

  addTask = (title, description) => {
    const newTask = {
      title: title,
      description: description,
      id: this.state.tasks.lenght
    }
    this.setState({
      tasks: [...this.state.tasks, newTask]
    })
  }

  deleteTask = (id) => {
    const newTasks = this.state.tasks.filter(task => task.id !== id);
    this.setState({
      tasks: newTasks
    });
  }

  checkDone = (id) => {
    const newTasks = this.state.tasks.map(task => {
      if(task.id === id) {
        task.done = !task.done
      }
      return task;
    });
    this.setState({
      tasks: newTasks
    });
  }

  render() {
    return(
      <div>
        <Router>

          <Link to='/'>Home</Link>
          <br/>
          <Link to='/posts'>Posts</Link>

          <Route exact path='/' render={()=>{
            return <div>
              <TaskForm addTask={ this.addTask } /> 
              <Tasks tasks={ this.state.tasks }
                deleteTask={this.deleteTask}
                checkDone={this.checkDone} />
            </div>
          }} > 
          </Route>
          <Route path='/posts' component={Posts}></Route>
        </Router>
      </div>
    )
  }
}

export default App;
