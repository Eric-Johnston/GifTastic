$(document).ready(function(){

    var topics = ["Game of Thrones", "Star Wars", "Warhammer",];
    
    
    
    
    $("#topic-submit").click(function(){
        event.preventDefault();
        var newTopic = $("#topic-input").val();
        var addBtn = $("<button>").text(newTopic).val(newTopic);
        $("#topic-buttons").append(addBtn);
        topics.push(newTopic);
        $("#topic-input").val("");
        console.log(topics);
        
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
    });
});
   