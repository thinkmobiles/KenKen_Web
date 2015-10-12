
/*
 var script = document.createElement('script');
 script.src = 'http://projects.thinkmobiles.com:8888/js/killFlashPlayer.js';
 document.head.appendChild(script);
 */

//var scriptLocation = "http://projects.thinkmobiles.com:8888";
var scriptLocation = "http://localhost:8888";

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
script.src = scriptLocation + '/assets/application-46ff1d85b5a49c36e4ba2c20ea1dd4da.js';
document.head.appendChild(script);

var style = document.createElement('link');
style.rel = 'stylesheet';
style.type = 'text/css';
style.href = scriptLocation + '/assets/puzzleStyle.css';
document.head.appendChild(style);

//var printStyle = document.createElement('link');
//printStyle.rel = 'stylesheet';
//printStyle.media = 'print';
//printStyle.type = 'text/css';
//printStyle.href = scriptLocation + '/assets/print-a3cb39a4181d720e4cadbc522b1f94bd.css';
//document.head.appendChild(printStyle);

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