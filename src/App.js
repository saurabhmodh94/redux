import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import './App.css';

class App extends Component {
  render() {
    return (
      <Counter
        value={store.getState()}
        onIncrement={() =>
          store.dispatch({ type: "INCREMENT" })
        }
        onDecrement={() =>
          store.dispatch({ type: "DECREMENT" })
        }
      />
    );
  }
}

class Counter extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.value}</h1>
        <button onClick={this.props.onIncrement}>+</button>
        <button onClick={this.props.onDecrement}>-</button>
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
  // document.body.innerHTML = store.getState();
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() =>
        store.dispatch({ type: "INCREMENT" })
      }
      onDecrement={() =>
        store.dispatch({ type: "DECREMENT" })
      }
    />,
    document.getElementById('root')
  );
}

// store.subscribe(() => {
//   document.body.innerHTML = store.getState();
// })

store.subscribe(render);
render();

// document.addEventListener('click', () => {
//   store.dispatch({ type: "INCREMENT" });
// });

export default App;
