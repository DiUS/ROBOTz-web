'use strict';

var forwardButton = document.querySelector('.forward');
var backwardButton = document.querySelector('.backward');
var turnLeftButton = document.querySelector('.turn-left');
var turnRightButton = document.querySelector('.turn-right');

var commandList = document.querySelector('.command-list textarea');

forwardButton.addEventListener('click', function() {
  commandList.value = commandList.value + 'Forward\n';
});

backwardButton.addEventListener('click', function() {
  commandList.value = commandList.value + 'Backward\n';
});

turnLeftButton.addEventListener('click', function() {
  commandList.value = commandList.value + 'Turn Left\n';
});

turnRightButton.addEventListener('click', function() {
  commandList.value = commandList.value + 'Turn Right\n';
});
