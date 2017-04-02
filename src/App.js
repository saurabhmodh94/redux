import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import './App.css';

class App extends Component {
  render() {
    return (
      <div></div>
    );
  }
}

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id != action.id)
        return state;
      return Object.assign({}, state, { completed: !state.completed });
    default:
      return state;
  }
}

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;
  }
}


const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
}
const todoApp = (state = [], action) => {
  return {
    todos: todo(state.todos, action),
    visibilityFilter: visibilityFilter(state.visibilityFilter, action)
  }
}

const store = createStore(todoApp);
console.log(store.getState());

store.dispatch({
  type: 'ADD_TODO',
  id: 0,
  text: 'Redux Learn'
})
console.log(store.getState());

store.dispatch({
  type: 'TOGGLE_TODO',
  id: 0
})
console.log(store.getState());

store.dispatch({
  type: 'SET_VISIBILITY_FILTER',
  filter: 'SHOW_COMPLETED'
})
console.log(store.getState());

export default App;
