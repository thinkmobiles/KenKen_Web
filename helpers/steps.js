var Steps = function () {
    var history = [];
    var index = -1; //empty history

    this.save = function (data, options) {
        console.log('Steps.saveStep()');
        index++;
        history[index] = data;
    };

    this.undo = function () {
        console.log('Steps.undo();');
        if (index !== -1) {
            index--;
        }
    }

    this.redo = function () {
        console.log('Steps.redo()');
        if (index < (history.length - 1)) {
            index++;
        }
    };

    this.currentState = function () {
        console.log('Steps.currentState()');
        return history[index];
    }

    this.getCurrentIndex = function () {
        console.log('Steps.currentIndex()');
        return index;
    }

    this.getHistory = function () {
        console.log('Steps.getHistory()');
        return history;
    }

};

var steps = new Steps();

console.log(steps.getCurrentIndex());
console.log(steps.getHistory());
console.log('----------');

steps.undo();
console.log(steps.getCurrentIndex());
console.log(steps.currentState());
console.log('----------');

steps.save('foo... 1');
console.log(steps.getCurrentIndex());
console.log(steps.getHistory());
console.log('----------');

steps.undo();
console.log(steps.getCurrentIndex());
console.log(steps.currentState());
console.log('----------');

steps.save('foo... 2');
steps.save('foo... 3');
steps.save('foo... 4');
console.log('----------');

console.log(steps.getCurrentIndex());
console.log(steps.getHistory());
console.log(steps.currentState());
console.log('----------');

steps.undo();
console.log(steps.getCurrentIndex());
console.log(steps.getHistory());
console.log(steps.currentState());
console.log('----------');

steps.redo();
console.log(steps.getCurrentIndex());
console.log(steps.getHistory());
console.log('----------');

steps.redo();
console.log(steps.getCurrentIndex());
console.log(steps.getHistory());
console.log('----------');

console.log(steps.currentState());
console.log('----------');