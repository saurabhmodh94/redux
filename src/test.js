var deepFreeze = require('deep-freeze');
var expect = require('expect')

const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    completed: false
                }
            ];
        case 'TOGGLE_TODO':
            return state.map(todo => {
                if (todo.id != action.id)
                    return todo;
                return Object.assign({}, todo, { completed: !todo.completed })
            })
        default:
            return state;
    }
}

const testAddTodo = () => {
    const stateBefore = [];
    const action = {
        type: 'ADD_TODO',
        id: 0,
        text: 'Redux Learn'
    }
    const stateAfter = [{
        id: 0,
        text: 'Redux Learn',
        completed: false
    }]
    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(
        todos(stateBefore, action)
    ).toEqual(stateAfter);
}
testAddTodo();

const testToggleTodo = () => {
    const stateBefore = [{
        id: 0,
        text: 'Redux Learn - 1',
        completed: false
    }, {
        id: 1,
        text: 'Redux Learn - 2',
        completed: false
    }];
    const action = {
        type: 'TOGGLE_TODO',
        id: 1
    }
    const stateAfter = [{
        id: 0,
        text: 'Redux Learn - 1',
        completed: false
    }, {
        id: 1,
        text: 'Redux Learn - 2',
        completed: true
    }]
    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(
        todos(stateBefore, action)
    ).toEqual(stateAfter);
}
testToggleTodo();

console.log("All Test Passed")