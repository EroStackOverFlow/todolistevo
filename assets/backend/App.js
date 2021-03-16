import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import TodoList from './components/Todo/TodoList';
import Login from './components/Login';
import Signup from './components/Signup';
function App() {
  return (
    <Router>
       <Header/>
       <Switch>
         <Route exact path="/backend" component={Login}/>
         <Route path="/backend/todolist" component={TodoList}/>
         <Route path="/backend/signup" component={Signup}/>
       </Switch>

       <Footer/>
    </Router>
  );
}

export default App;
