$(document).ready(function(){
    
    // Array of topics
    var topics = ["game of thrones", "star wars", "warhammer", "lord of the rings", "hiking", "snowboarding", "fractals", "the matrix", "elder scrolls", "fallout"];

    // This function queries giphy for images and appends them to HTML elements
    function gifDisplay(){
        $("button").click(function(){
            $("#gifs").empty();
            var topic = $(this).val();
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            topic + "&api_key=VAv72t9cFdirlQwvVfF5kxIMlFkrH0QS&rating=pg&limit=10";
            console.log(topic);
            $.ajax({
                url: queryURL,
                method: "GET"
              })
              .then(function(response){
                console.log(queryURL);
                console.log(response);
                var results = response.data
                for (var i = 0; i < results.length; i++){
                    var newDiv = $("<div>")
                    var p = $("<p>").text("Rating: " + results[i].rating);
                    var topicImage = $("<img>");
                    topicImage.attr("src", results[i].images.fixed_height.url);
                    newDiv.append(p);
                    newDiv.append(topicImage);
                    $("#gifs").append(newDiv); 
                }
                $("<img>").click(function(){
                    var src = $(this())
                })
            });
        });
    }
    
    // This creates buttons for every string in the array.
    for (var j = 0; j < topics.length; j++){
        var newBtn = $("<button>").text(topics[j]).val(topics[j]);
        $("#topic-buttons").append(newBtn);
    }
    gifDisplay();
    
    // Allows the user to add new topics to the array.
    $("#topic-submit").click(function(){
        event.preventDefault();
        var newTopic = $("#topic-input").val();
        var addBtn = $("<button>").text(newTopic).val(newTopic);
        $("#topic-buttons").append(addBtn);
        topics.push(newTopic);
        $("#topic-input").val("");
        console.log(topics);
        
        gifDisplay();
    });

    // Not working yet
    $("<img>").click(function() {
    	var src = $(this).attr("src");
      if($(this).hasClass('playing')){
          //play
        $(this).addClass('playing');
        $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
      } else {
        //stop
        $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
        $(this).removeClass('playing');
      }
    });
});