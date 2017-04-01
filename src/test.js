var deepFreeze = require('deep-freeze');
var expect = require('expect')

/*deepFreeze Example*/
// deepFreeze(Buffer);
// Buffer.x = 5;
// console.log(Buffer.x === undefined);

// Buffer.prototype.z = 3;
// console.log(Buffer.prototype.z === undefined);

const addCounter = (list) => {
    // list.push(0);
    // return list;

    // return list.concat(0); // normal solution
    
    return [...list, 0]
}

const testAddCounter = () => {
    const listBefore = [];
    const listAfter = [0];
    deepFreeze(listBefore);
    expect(
        addCounter(listBefore)
    ).toEqual(listAfter);
}
testAddCounter();

const removeCounter = (list, index) => {
    // list.splice(index, 1);
    // return list;

    // return list
    // .slice(0,index)
    // .concat(list.slice(index+1)); // normal solution

    return [...list.slice(0, index), ...list.slice(index + 1)]
}

const testRemoveCounter = () => {
    const listBefore = [10, 20, 30];
    const listAfter = [10, 30];
    deepFreeze(listBefore);
    expect(
        removeCounter(listBefore, 1)
    ).toEqual(listAfter);
}
testRemoveCounter();

const incrementCounter = (list, index) => {
    // list[index] = list[index]+1;
    // return list;

    // return list
    // .slice(0,index)
    // .concat(list[index]+1)
    // .concat(list.slice(index+1)); // normal solution

    return [...list.slice(0, index),
    list[index] + 1,
    ...list.slice(index + 1)]
}

const testIncrementCounter = () => {
    const listBefore = [10, 20, 30];
    const listAfter = [10, 21, 30];
    deepFreeze(listBefore);
    expect(
        incrementCounter(listBefore, 1)
    ).toEqual(listAfter);
}
testIncrementCounter();

console.log("All Test Passed")