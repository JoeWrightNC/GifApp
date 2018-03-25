var terms = ["kittens", "puppies", "turtles", "pangolins", "kaolas", "sloths"]; 

function displaySearchInfo() {
  event.preventDefault();
  var term = $(this).attr("data-name")
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=wFyG19eSrZNRrZk8FfNyJ0HIpu0KCx16&q=" + term + "&limit=10&lang=en" 
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response)
    var rowCount = response.data[0].id
    $("#userPage").append(
      `
      <h2>${term}</h2>
      <div class="row">
      <div class="rowInner" id="row${response.data[0].id}">
      `
    )
    for (var i = 0; i < 10; i++) {
      $("#row"+rowCount).prepend(
        `
        <div class="tile col resultCard" id="${response.data[i].id}">
          <div class="tileMedia">
            <img class="tileImg" id="still${response.data[i].id}" src="${response.data[i].images.fixed_height_still.url}" alt="Card image cap">
            <img class="tileImgPlayer" id="player${response.data[i].id}" src="${response.data[i].images.fixed_height.url}" alt="Card image cap">
          </div>
          <div class="tileDetails" id="details${response.data[i].id}">
            <h5 class="tileTitle" id>${response.data[i].title}</h5>
            <p class="tileTitle">Rating: ${response.data[i].rating}</p>
            <button class="btn favoriteBtn">&hearts;</button>
          </div>
        </div>
      </div>
      `
      )
    }
    $(".tileImgPlayer").hide()
  })
}

function gifPlayer() {
  console.log("player click")
  var singleMaker = $(this).attr("id")
  console.log(singleMaker)
  $("#still"+singleMaker).hide();
  $("#details"+singleMaker).hide();
  $("#player"+singleMaker).show();
  $("#player"+singleMaker).css("zIndex","100");
  $("#player"+singleMaker).css("opacity","1");
  $(this).mouseleave(function() { 
    $("#player"+singleMaker).hide()
    $("#still"+singleMaker).show()
    $("#details"+singleMaker).show();
  })
}

function renderButtons() {
  $("#buttons-view").empty();
  for (var i = 0; i < terms.length; i++) {
    var a = $("<button>");
    a.addClass("searchTerm");
    a.attr("data-name", terms[i]);
    a.text(terms[i]);
    $("#buttons-view").append(a);
  }
}

$("#add-movie").on("click", function(event) {
  event.preventDefault();
  var term = $("#search-input").val().trim();
  terms.push(term);
  $("#search-input").val("")
  renderButtons();
});

$(document).on("click", ".searchTerm", displaySearchInfo);

$(document).on("click", ".tile", gifPlayer);

renderButtons();