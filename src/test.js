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

console.log("All Test Passed")