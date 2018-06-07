$(document).ready(function(){
    
    // Array of topics
    var topics = ["game of thrones", "star wars", "warhammer", "lord of the rings", "hiking", "snowboarding", "fractals", "the matrix", "elder scrolls", "fallout"];
    // This creates buttons for every string in the array.
    for (var j = 0; j < topics.length; j++){
        var newBtn = $("<button>").text(topics[j]).val(topics[j]);
        $("#topic-buttons").append(newBtn);
    }
    // This function queries giphy for images and appends them to our HTML elements
    function gifDisplay(){
        $("button").on("click", function(){
            event.preventDefault();
            $("#gifs").empty();
            var topic = $(this).val();
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            topic + "&api_key=VAv72t9cFdirlQwvVfF5kxIMlFkrH0QS&rating=pg&limit=10";
            $.ajax({
                url: queryURL,
                method: "GET"
              })
              .then(function(response){
                var results = response.data
                for (var i = 0; i < results.length; i++){
                    var p = $("<p>").text("Rating: " + results[i].rating);
                    $("#gifs").append("<img class='gif still' src='" + response.data[i].images.fixed_height_still.url + "'>").append(p);
                }
            });
        });
    }
    
    gifDisplay();
    // Allows the user to add new topics to the array.
    $("#topic-submit").on("click", function(){
        event.preventDefault();
        // If the input field is empty, display an alert
        if ($("#topic-input").val().trim() == ""){
            alert("Field can't be empty")
        }
        // Otherwise add new topic
        else {
        var newTopic = $("#topic-input").val();
        var addBtn = $("<button>").text(newTopic).val(newTopic);
        $("#topic-buttons").append(addBtn);
        // Pushes new topic into our array
        topics.push(newTopic);
        $("#topic-input").val("");
        }
        
        gifDisplay();
    });
    // Initiates the pause/play function -- For some reasong using "img" or "<img>" as a selector wouldn't work, so I made it select any element in the body with a class of ".gif"
    $("body").on("click", ".gif", function() {
        var src = $(this).attr("src");
        // Checks the image for the class "still"
      if($(this).hasClass("still")){
        // Replaces gif with images.fixed_height_still.url
         $(this).attr("src", src.replace(/\_s.gif/i, ".gif"))
         $(this).removeClass("still");
      } else {
        // Replaces still images with images.fixed_height.url
        $(this).addClass("still");
        $(this).attr("src", src.replace(/\.gif/i, "_s.gif"))
      }
    });
});