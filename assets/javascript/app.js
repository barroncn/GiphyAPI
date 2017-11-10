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
                "Melissa McCarthy"
             ];

var isClicked;

//FUNCTIONS
//==================================================================================================================================

function loadButtons(){
    $("#theButtons").empty();
    for (i = 0; i < topics.length; i++){
        $("#theButtons").append("<button class='aButton'>" + topics[i] + "</button>")
    }
}

function getGif(){
    $("#theGifs").empty();
    
    var theActor = $(this).text();
    console.log(theActor);
    var queryURL = ("///api.giphy.com/v1/gifs/search?api_key=SZTMpT0w5toNd0bhMaCH7PtiSNaDKlu1&limit=10&q=" + theActor);
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response){
        console.log(queryURL);
        console.log(response);
        console.log(response.data.length);
        console.log(response.data[0]);
        for(i = 0; i < response.data.length; i++)
        $("#theGifs").append("<div class='aNewGif clearfix'>"
                            + "<p><img src='" + response.data[i].images.fixed_width_still.url + "' alt='looping gif' /></p>"
                            +"<p id='rating'>Rating: " + response.data[i].rating + "</p>"
                            + "</div>");
        
    });
}

function addButton(){
    topics.push($("#newActor").val().trim());
}


//MAIN PROCESS
//==================================================================================================================================
loadButtons();

$("#submit").on("click", function(){
    event.preventDefault();
    addButton();
    loadButtons();
   $("#newActor").val("");
});

$("#theButtons").on("click", "button", getGif);
    
$("#theGifs").on("click", "img", function(){
    
})
    
}); //End of document.ready