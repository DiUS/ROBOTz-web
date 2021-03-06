'use strict';

var forwardButton = document.querySelector('.forward');
var backwardButton = document.querySelector('.backward');
var turnLeftButton = document.querySelector('.turn-left');
var turnRightButton = document.querySelector('.turn-right');

var commandArea = document.querySelector('.command-list textarea');
var commandNumbers = document.querySelector('.command-list ol');

var submitButton = document.querySelector('.execute-commands button');

forwardButton.addEventListener('click', function() {
  commandArea.value = commandArea.value + 'Forward\n';
  commandNumbers.innerHTML += '<li>Forward <span class="icon-arrow-up2"></span></li>';
  submitButton.style.display = 'block';
});

backwardButton.addEventListener('click', function() {
  commandArea.value = commandArea.value + 'Backward\n';
  commandNumbers.innerHTML += '<li>Backward <span class="icon-arrow-down2"></span></li>';
  submitButton.style.display = 'block';
});

turnLeftButton.addEventListener('click', function() {
  commandArea.value = commandArea.value + 'Turn Left\n';
  commandNumbers.innerHTML += '<li>Turn Left <span class="icon-undo"></span></li>';
  submitButton.style.display = 'block';
});

turnRightButton.addEventListener('click', function() {
  commandArea.value = commandArea.value + 'Turn Right\n';
  commandNumbers.innerHTML += '<li>Turn Right <span class="icon-redo"></span></li>';
  submitButton.style.display = 'block';
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

    commandArea.value = '';
    commandNumbers.innerText = '';
  };

  http.post(commandList, successFunction, function() {
    submitButton.disabled = false;
    document.querySelector('.command-result').innerText = 'Error!';
    document.querySelector('.command-result').style.color = 'red';
    submitButton.innerText = oldSubmitButtonValue;

    commandArea.value = '';
    commandNumbers.innerText = '';
  });
});

var welcomeDiv = document.querySelector('.welcome');
var welcomeText = welcomeDiv.innerText;
welcomeDiv.innerText = '';

var showNextLetter = function() {
  if (welcomeText.length) {
    var nextCharacter = welcomeText.slice(0,1);
    welcomeDiv.innerHTML = welcomeDiv.innerHTML.slice(0, -1) + nextCharacter + '_';
    welcomeText = welcomeText.slice(1);
  } else {
    clearInterval(window.theInterval);
  }
};

window.theInterval = setInterval(showNextLetter, 25);
