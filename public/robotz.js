'use strict';

var forwardButton = document.querySelector('.forward');
var backwardButton = document.querySelector('.backward');
var turnLeftButton = document.querySelector('.turn-left');
var turnRightButton = document.querySelector('.turn-right');

var commandArea = document.querySelector('.command-list textarea');

var submitButton = document.querySelector('.execute-commands button');

forwardButton.addEventListener('click', function() {
  commandArea.value = commandArea.value + 'Forward\n';
});

backwardButton.addEventListener('click', function() {
  commandArea.value = commandArea.value + 'Backward\n';
});

turnLeftButton.addEventListener('click', function() {
  commandArea.value = commandArea.value + 'Turn Left\n';
});

turnRightButton.addEventListener('click', function() {
  commandArea.value = commandArea.value + 'Turn Right\n';
});

function httpRequest(onSucess, onError) {
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        onSucess(request.responseText);
      }
      else {
        onError();
      }
    }
  };
  return request;
}

var http = {
  post: function(data, onSuccess, onError) {
    var request = httpRequest(onSuccess, onError);
    request.open('POST', '/commands', true);
    request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    request.setRequestHeader('Content-type',     'application/json')
    request.setRequestHeader('Accept',           'application/json')
    request.send(JSON.stringify(data));
  }
};

submitButton.addEventListener('click', function() {
  submitButton.disabled = true;
  var oldSubmitButtonValue = submitButton.innerText;
  submitButton.innerText = 'Moving...';
  var commandList = commandArea.value.split('\n');
  commandList.pop();

  var successFunction = function(responseText) {
    submitButton.disabled = false;
    document.querySelector('.command-result').innerText = 'Command sent!';
    document.querySelector('.command-result').style.color = 'green';
    submitButton.innerText = oldSubmitButtonValue;
  };

  http.post(commandList, successFunction, function() {
    submitButton.disabled = false;
    document.querySelector('.command-result').innerText = 'Error!';
    document.querySelector('.command-result').style.color = 'red';
    submitButton.innerText = oldSubmitButtonValue;
  });
});
