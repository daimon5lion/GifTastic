$(document).ready(function() {
  var topics = [
    "arnold schwarzenegger",
    "nicolas cage",
    "ben stiller",
    "jennifer lawrence",
    "jackie chan",
    "emma stone",
    "harrison ford",
    "megan fox",
    "bruce willis",
    "julianne moore",
    "angelina jolie",
    "tina fey",
    "chuck norris",
    "cillian murphy"
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
      .toLowerCase()
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
        alert("No Gifs found for your topic");
      } else if (topics.indexOf(inputName) != -1) {
        alert("Topic already exists");
      } else {
        topics.push(inputName);
        starButtons();
      }
    });
  });

  /*
 
*/

  function showGifs() {
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
        gifDiv.addClass("gifdiv");
        gifDiv.html(
          "<p>Title: " +
            response.data[i].title +
            "</p> <p> Rating: " +
            response.data[i].rating.toUpperCase() +
            "</P>"
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

  function playGifs() {
    if ($(this).attr("data-state") == "still") {
      $(this).html("<img src='" + $(this).attr("data-animate") + "'>");
      $(this).attr("data-state", "animate");
    } else {
      $(this).html("<img src='" + $(this).attr("data-still") + "'>");
      $(this).attr("data-state", "still");
    }
  }
  /*
  $("#addmore").on("click", function() {
    showGifs();
  });
  
  */
  function runGifs() {
    $(document).on("click", ".nameb", showGifs);
    $(document).on("click", ".play", playGifs);
  }

  runGifs();

  starButtons();
});
