$(document).ready(function () {
  console.log("jQuery: Document Ready!");
  var tUsers = ["ESL_SC2", "OgamingSC2", "cretetion", "esl_csgo", "freecodecamp", "comster404", "storbeck", "habathcx", "brunofin", "RobotCaleb", "noobs2ninjas", "netherrealm"];
  var progress = 100 / tUsers.length;
  var progressPercent = 0;
  for (var i = 0; i < tUsers.length; i++) {
    getUserData(tUsers[i]);
  }

  function getUserData(username) {
    $.getJSON("https://wind-bow.gomix.me/" + username + "?callback=?", function (data) {
      if (data.status === 422) {
        console.log(username + "Unavailable");
        userUnavailable(username);
      } else if (!data.stream) {
        console.log(username + "Offline");
        userOffline(username);
      } else {
        console.log(username + "Online");
        userOnline(username, data);
      }
    });
  }

  function userUnavailable(username) {
    $("#results").append("<div class='list-group-item list-group-item-danger'><h4 class='list-group-item-heading'>" + username + "</h4></div>");
    $("#results div:last").append("<p class='list-group-item-text'>User Not Found</p>");
    increaseProgressBar()
  }

  function userOffline(username) {
    $("#results, #results-offline").append("<a href='https://www.twitch.tv/" + username + "' class='list-group-item list-group-item-warning' target='_blank'></a>");
    $("#results a:last, #results-offline a:last").append("<h4 class='list-group-item-heading'>" + username + "</h4>");
    $("#results a:last, #results-offline a:last").append("<p class='list-group-item-text'>Offline</p>");
    increaseProgressBar()
  }

  function userOnline(username, data) {
    $("#results, #results-online").append("<a href='https://www.twitch.tv/" + username + "' class='list-group-item list-group-item-success' target='_blank'></a>");
    $("#results a:last, #results-online a:last").append("<h4 class='list-group-item-heading'>" + username + "</h4>");
    $("#results a:last, #results-online a:last").append("<p class='list-group-item-text'>" + data.stream.channel.status + "</p>");
    $("#results a:last, #results-online a:last").append("<p class='list-group-item-text'>" + data.stream.channel.game + "</p>");
    increaseProgressBar()
  }

  function increaseProgressBar() {
    progressPercent += progress;
    $(".progress-bar").animate({
      width: progressPercent + "%"
    }, 0);
    $(".progress-bar span").text(progressPercent + "% Complete");
  }
});
