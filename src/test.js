var deepFreeze = require('deep-freeze');
var expect = require('expect')

const toggleTodo = (todo) => {
    // todo.completed = !todo.completed
    // return todo;

    // return {
    //     id:0,
    //     text: 'Learn Redux',
    //     completed: !todo.completed
    // }; // normal solution

    return Object.assign({},todo,{completed:!todo.completed})

    // return {
    //     ...todo,
    //     completed: !todo.completed
    // } //not working
}

const testToggleTodo = () => {
    const todoBefore = {
        id: 0,
        text: 'Learn Redux',
        completed: false
    };
    const todoAfter = {
        id: 0,
        text: 'Learn Redux',
        completed: true
    };
    deepFreeze(todoBefore);
    expect(
        toggleTodo(todoBefore)
    ).toEqual(todoAfter);
}
testToggleTodo();

console.log("All Test Passed")