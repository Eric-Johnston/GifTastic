$(document).ready(function(){

    var topics = [];
    
    $("#animal-submit").click(function(){
        event.preventDefault();
        var newBtn = $("#animal-input").val();
        var addBtn = $("<button>").text(newBtn).val(newBtn);
        $("#animal-buttons").append(addBtn);
        topics.push(addBtn);
        $("#animal-input").val("");
        console.log(topics);
        
        $("button").click(function(){
            $("#animal-gifs").empty();
            var animal = $(this).val();
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            animal + "&api_key=VAv72t9cFdirlQwvVfF5kxIMlFkrH0QS&rating=pg&limit=10";
            console.log(animal);
    
            $.ajax({
                url: queryURL,
                method: "GET"
              })
            
              .then(function(response){
                console.log(queryURL);
    
                console.log(response);
                var results = response.data
    
                for (var i = 0; i < results.length; i++){
    
                    var animalDiv = $("<div>")
                    var p = $("<p>").text("Rating: " + results[i].rating);
                    var animalImage = $("<img>");
                    animalImage.attr("src", results[i].images.fixed_height.url);
                    animalDiv.append(p);
                    animalDiv.append(animalImage);
                    $("#animal-gifs").append(animalDiv);
                    $("#animal-gifs").click(function(){
            
                        var state = $(this).attr("src", results[i].images.fixed_height_still.url);
                        if (state === true) {
                            $(this).attr("src", $(this).attr(results[i].images.fixed_height_still.url));
                            $(this).attr("data-state", "animate");
                        } else {
                            $(this).attr("src", $(this).attr(results[i].images.fixed_height.url));
                            $(this).attr("data-state", "still");
                        }
                    });
                }
              });
        });
    });
});
   