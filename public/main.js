
  var $loginPage = $('.login.page');
  var $chatPage = $('.chat.page');

  var username;
  var connected = false;
  var typing = false;
  var lastTypingTime;
  var $currentInput = $usernameInput;

  var socket = io();

  function addParticipantsMessage(data) {
    var message = '';
    if (data.numUsers === 1) {
      message += "Your The Only Person Here!";
    } else {
      message += "There Are " + data.numUsers + " People Here!";
    }
    log(message);
  }

  function setUsername() {
    username = cleanInput($usernameInput.val().trim());
    if (username) {
      $loginPage.fadeOut();
