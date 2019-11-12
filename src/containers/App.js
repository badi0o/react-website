import React, { Component } from 'react';
import classes from './App.css';
import Cockpit from '../components/Cockpit/Cockpit'
import Persons from '../components/Persons/Persons'
import withClass from './hoc/withClass';
import Aux from './hoc/Auxiliary'
import AuthContext from '../containers/context/auth-context'

class App extends Component {
  constructor(props) {
    super(props);
    console.log('[app.js] constructor')
  };
  state = {
    persons: [
      {id: 'dss', name:'Max', age:28 },
      {id: 'as123', name:'manu', age:29 },
      // {id: 'vfvae', name:'steph', age:22 }
    ],
    showPersons: false,
    word:'',
    cockpit:true,
    changeCounter: 0,
    authenticated: false,
  };

static getDerivedStateFromProps (props, state){
  console.log('[App.js] getDerivedStateFromProps', props)
  return state;
};

deletePersonHandler = (personIndex) => {
  const persons = [...this.state.persons];
  persons.splice(personIndex, 1);
  this.setState({persons: persons});
  console.log(this.state);
};

  nameHandler = (event, personsIndex) => {
    // const personsIndex = this.state.persons.findIndex(p => {
    //   return p.id === id;
    // });
    const person = {...this.state.persons[personsIndex]};
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personsIndex] = person;
    this.setState((prevState, props) =>{
      return{
        persons:persons, 
        changeCounter: prevState.changeCounter + 1 
      };
    })
    
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons:!doesShow});
  };

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  };
  shouldComponentUpdate(nextProps, nextState){
    console.log('[App.js] shouldComponentUpdate');
    return true;
  };
  componentDidUpdate(){
    console.log('[App.js] componentDidUpdate');
  };

  toggleCockpit = () => {
    const show = this.state.cockpit;
    this.setState({cockpit: !show});
  };

  loginHandler = () =>{ 
    this.setState({authenticated:true});
  };

  render() {
    
    console.log('[App.js] render')
    let cockpit = null;
    if(this.state.cockpit){
      cockpit = (
        <Cockpit 
        title={this.props.appTitle}
        showPersons={this.state.showPersons}
        personsLength={this.state.persons.length}
        clicked={this.togglePersonsHandler}
        />
      );
    }
    let persons = null;
    if  (this.state.showPersons){
      persons =  (
        <Persons
          clicked={this.deletePersonHandler}
          changed={this.nameHandler}
          persons={this.state.persons}
          isAuthenticated={this.state.authenticated}
        />
      );
      
    }
    
    
    return (   
      <Aux>

        <button onClick={this.toggleCockpit}>Remove Cockpit</button>
        <AuthContext.Provider value={{
          authenticated: this.state.authenticated, 
          login: this.loginHandler
        }}>
          {cockpit}
        
          {persons}  
        </AuthContext.Provider>
      </Aux>
      
    );
  }
  
}

export default withClass(App, classes.App);
