$(document).ready(function() {
  var topics = [
    "Arnold Schwarzenegger",
    "Nicolas Cage",
    "Ben Stiller",
    "Jennifer Lawrence",
    "Jackie Chan",
    "Emma Stone",
    "Harrison Ford",
    "Megan Fox",
    "Bruce Willis",
    "Julianne Moore",
    "Angelina Jolie",
    "Tina Fey",
    "Chuck Norris",
    "Cillian Murphy"
  ];
  var maxNumber = 10;
  var apiKey = "&api_key=jcEJ7gPFb7MlueUoMmwWHrHv8X8v1kqw";
  function starButtons() {
    $("#buttonblock").empty();
    for (var i = 0; i < topics.length; i++) {
      var stars = $("<button>");
      stars.addClass("nameb btn btn-warning");
      stars.attr("data-person", topics[i]);
      stars.text(topics[i]);
      $("#buttonblock").append(stars);
    }
  }

  $("#submitb").on("click", function(event) {
    event.preventDefault();
    var inputName = $("#cbox")
      .val()
      .trim();
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      inputName +
      apiKey +
      "&limit=" +
      maxNumber;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      if (response.data.length == 0) {
        alert("No Gifs found for topic");
      } else if (topics.indexOf(inputName) != -1) {
        alert("Topic already exists");
      } else {
        topics.push(inputName);
        starButtons();
      }
    });
  });

  function displayGifs() {
    var person = $(this).attr("data-person");
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      person +
      apiKey +
      "&limit=" +
      maxNumber;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);

      $("#gifblock").empty();
      for (var i = 0; i < response.data.length; i++) {
        var gifDiv = $("<div>");
        gifDiv.addClass("gifDiv");
        gifDiv.html(
          "<p>Rating: " + response.data[i].rating.toUpperCase() + "</p>"
        );

        var gifImage = $(
          "<img src='" + response.data[i].images.fixed_height_still.url + "'>"
        );
        gifImage.addClass("gif");

        var imageDiv = $("<div>");
        imageDiv.addClass("play");
        imageDiv.attr("data-state", "still");
        imageDiv.attr("data-name", person);
        imageDiv.attr(
          "data-still",
          response.data[i].images.fixed_height_still.url
        );
        imageDiv.attr("data-animate", response.data[i].images.fixed_height.url);

        $(imageDiv).append(gifImage);
        $(gifDiv).append(imageDiv);
        $("#gifblock").append(gifDiv);
      }
    });
  }

  function playGif() {
    if ($(this).attr("data-state") == "still") {
      $(this).html("<img src='" + $(this).attr("data-animate") + "'>");
      $(this).attr("data-state", "animate");
    } else {
      $(this).html("<img src='" + $(this).attr("data-still") + "'>");
      $(this).attr("data-state", "still");
    }
  }

  $(document).on("click", ".nameb", displayGifs);
  $(document).on("click", ".play", playGif);

  starButtons();
});
