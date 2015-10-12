
/*
 var script = document.createElement('script');
 script.src = 'http://projects.thinkmobiles.com:8888/js/killFlashPlayer.js';
 document.head.appendChild(script);
 */

var flashWarn = document.querySelector('#flash_warn');
var KenKenFlash = document.querySelector('#KenKen');
var mainContainer = document.querySelector('.mainContainer');

if (flashWarn) flashWarn.remove();
if (KenKenFlash) KenKenFlash.remove();
if (mainContainer) mainContainer.remove();

console.log('>>> killFlashPlayer');

function getScriptContent() {
    var scripts = document.getElementsByTagName('script');

    for (var i = 0; i < scripts.length; i++) {
        var script = scripts[i];
        var content = script.innerHTML;
        var searchValue = 'base64_decode';

        if (content.indexOf(searchValue) !== -1) {
            return script;
        }
    }
}

console.log('document.appendChild(script); //http://localhost:8829/assets/application-46ff1d85b5a49c36e4ba2c20ea1dd4da.js');
var script = document.createElement('script');
script.src = 'http://localhost:8829/assets/application-46ff1d85b5a49c36e4ba2c20ea1dd4da.js';
document.head.appendChild(script);

var style = document.createElement('link');
style.rel = 'stylesheet';
style.type = 'text/css';
style.href = 'http://localhost:8829/assets/puzzleStyle.css';
document.head.appendChild(style);


delete kenken.game;

setTimeout(function removeOld() {
    console.log('re-run the create game script');
    var createGameScript = getScriptContent();
    createGameScript.innerHTML += '//my custom script';
    eval(createGameScript.innerHTML);
}, 1000);

function congratulation() {
 alert('congratulation');
}

function checkIsFinished() {
 var answer = self.puzzleData.dataObj.A;
 var currentState = self.steps.getCurrentState();
 var size = currentState.size;
 var values = currentState.values;

 for (var i=0; i<size; i++) {
  for (var j=0; j<size; j++) {
   if (values[i][j] != answer[i][j]) {
    return;
   }
  }
 }

 congratulation();
}

/*function onRedo() {
 var steps = self.steps;
 var history = steps.redo();
 var type;
 var selector;
 var value;

 if (!history) {
 return;
 }

 type = history.type;

 if (type === 'values') {
 selector = "#p" + (history.x + 1) + (history.y + 1) + ' .itemValue';
 value = (history.newValue) ? history.newValue : ''; //number or ""
 $(selector).text(value);
 } else if (type === 'notes') {

 } else {
 //invalid
 }

 console.log(history);
 };*/

/*
this.redo = function () {
    console.log('Steps.redo()');
    var data;
    var type;
    var target;

    if (index < (history.length - 1)) {
        index++;

        data = history[index];
        type = data.type;

        target = currentState[type];
        target[data.x][data.y] = data.newValue;
    }

    return data;
};*/
