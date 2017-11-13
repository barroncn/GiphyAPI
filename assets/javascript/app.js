$( document ).ready(function() {

//GLOBAL VARIABLES
//==================================================================================================================================

    var topics = [
                    "Will Ferrell",
                    "Steve Carell",
                    "Bruce Willis",
                    "Jennifer Lawrence",
                    "Sandra Bullock",
                    "Kevin Hart",
                    "Kevin James",
                    "Melissa McCarthy",
                    "Julia Roberts",
                    "Jennifer Lopez",
                    "Shia Lebeouf",
                    "Taylor Swift",
                    "Brad Pitt",
                    "Angelina Jolie",
                    "Matt Damon",
                    "Leonardo DeCaprio",
                    "Jennifer Aniston",
                    "Vince Vaughn"
                 ];
    
    
//FUNCTIONS
//==================================================================================================================================
    
    //This function goes through the topics array and creates a button for each string
    function loadButtons(){
        $("#theButtons").empty();
        for (i = 0; i < topics.length; i++){
            $("#theButtons").append("<button class='aButton'>" + topics[i] + "</button>")
        }
    }
    
    //This function requests information from the GIPHY API and then creates display elements for the gifs and the rating
    function getGif(){
        $("#theGifs").empty();
        
        var theActor = $(this).text();
        var queryURL = encodeURI("///api.giphy.com/v1/gifs/search?api_key=SZTMpT0w5toNd0bhMaCH7PtiSNaDKlu1&limit=10&q=" + theActor);
        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response){
            
            for(i = 0; i < response.data.length; i++){
            $("#theGifs").append("<div class='aNewGif clearfix'>"
                                + "<p><img val='theActor' src='" + response.data[i].images.fixed_width_still.url + "' alt='looping gif' data-animate='" + response.data[i].images.fixed_width.url + "'data-still='" + response.data[i].images.fixed_width_still.url + "' data-state='still' /></p>"
                                +"<p id='rating'>Rating: " + response.data[i].rating + "</p>"
                                + "</div>");
            }
        });
    }
    
    //This function changes the src from the still version to the animated version of the gif or vice versa when an image is clicked
    function getMove(){
        if($(this).attr("data-state") === "still"){
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        
        else{
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }
  
    //This function adds the users input to the array of topics
    function addButton(){
        var theInput = $("#newActor").val().trim();
        if(theInput !== ""){
            topics.push(theInput);
        }
    }
    
    
//MAIN PROCESS
//==================================================================================================================================
    
    //When the page loads buttons for each string in topic are loaded
    loadButtons();
    
    //When the submit button is clicked the new button will display
    $("#submit").on("click", function(){
        event.preventDefault();
        addButton();
        loadButtons();
       $("#newActor").val("");
    });
    
    //When a button is clicked the gif images will populate
    $("#theButtons").on("click", "button", getGif);
     
    //When an image is clicked it will animate or become still
    $("#theGifs").on("click", "img", getMove);
        
    
}); //End of document.ready