import React, { Component } from 'react';
import { createStore } from 'redux';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        Welcome to Redux.
      </div>
    );
  }
}

const counter = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}

const store = createStore(counter);
console.log(store.getState());

// store.dispatch({ type: "INCREMENT" });
// console.log(store.getState());

const render = () => {
  document.body.innerHTML = store.getState();
}

// store.subscribe(() => {
//   document.body.innerHTML = store.getState();
// })

store.subscribe(render);
render();

document.addEventListener('click', () => {
  store.dispatch({ type: "INCREMENT" });
});

export default App;
