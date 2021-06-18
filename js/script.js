/* 
## Js script first take on trying to get the APIs to work. 
*/
$(document).foundation(); // use to start foundation js utilities
//setup any variables that are needed
/*
var key = "b9b5183d85msh693e7ff1575baf9p1c92abjsnf938cef3869b";
var host = "travel-advisor.p.rapidapi.com";
var location = "";
var endpoint = "locations";
var api = "https://travel-advisor.p.rapidapi.com";
*/
// switch($endpoint){
//      case "locations":
//           endpoint = "locations";
//           break;
//      case "restaurants":
//           endpoint = "restaurants";
//           break;
// }
// setup a refactored api function to be used with all api requests
/*
var travelAPI = function(key,host,endpoint){
     fetch().then().catch();
} */
// setup endpoint functions for all api requests.
// var theLocationId = function(){
//      endpoint = "location";
//      city = document.getElementById("city");//create a field for the citi
//      apiURL = api+"/"+endpoint+"/search?query="+city+"&limit=5&offset=0&units=mi&location_id=1&currency=USD&sort=relevance&lang=en_US"

//      fetch(apiURL, { "method":"GET",
//      "headers": {
//           "x-rapidapi-key": key,
//           "x-rapidapi-host": host
//           }
//      })
//      .then(response => {
//           console.log(response);
//      })
//      .catch(err => {
//           console.error(err);
//      });
// }


// end

/*
var getLocationId = function(){
     var data = {
          "method": "GET",
          "headers": {
               "x-rapidapi-key": "b9b5183d85msh693e7ff1575baf9p1c92abjsnf938cef3869b",
               "x-rapidapi-host": "travel-advisor.p.rapidapi.com"
               }
          };
     fetch("https://travel-advisor.p.rapidapi.com/locations/search?query=irving&limit=5&offset=0&units=mi&location_id=1&currency=USD&sort=relevance&lang=en_US", JSON.stringify(data))
     .then(response => {
          console.log(response);
     })
     .catch(err => {
          console.error(err);
     });
};

*/
//searched only for location ID generated for the Irving TX area.
// I hope nobody steals my key that would suck. I wish we could protect them.
fetch("https://travel-advisor.p.rapidapi.com/restaurants/list?location_id=56032&restaurant_tagcategory=10591&restaurant_tagcategory_standalone=10591&currency=USD&lunit=mi&limit=5&open_now=false&lang=en_US", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "b9b5183d85msh693e7ff1575baf9p1c92abjsnf938cef3869b",
		"x-rapidapi-host": "travel-advisor.p.rapidapi.com"
	}
})
.then(response => {
     if(!response.ok){
          throw Error("ERROR with the response from API");
     }
	return response.json();
})
.then(data => {
     console.log(data.data);
    
     var restaurantName = data.data
     .map(restaurant => {
          console.log(restaurant.name);
          if(restaurant.name != undefined){
          return `
          <div class="media-object" data-animate="slide-in-down">
          <div class="media-object-section">
            <img class="thumbnail" src="${pictures(restaurant.photo)}">
          </div>
          <div class="media-object-section">
            <h5>${restaurant.name}</h5>
            <p><span class="label primary">${restaurant.parent_display_name}</span>
            ${restaurant.is_closed ? '<span class="label success">Open</span>': '<span class="label success">Open</span>'}
            </p>
            <p>Address: ${restaurant.address}</p>
            <p>${restaurant.description}</p>
            <p>Restaurant Website: <a href="${restaurant.web_url}">${restaurant.website}</a><br>
            <i class="fas fa-phone"></i> ${restaurant.phone}<br>
            Price Level: ${restaurant.price_level}
            <p>
            <p>Cuisine: ${cuisine(restaurant.cuisine)}</p>
          </div>
        </div>`
          };
          
     }).join("");
     document.querySelector("#restaurants").insertAdjacentHTML("afterbegin",restaurantName);
})
.catch(err => {
	console.error(err);
});

var cuisine = function(cuisine){
     return `
     ${cuisine.map(function(food){
          return `
          <span class="label primary">${food.name}</span> 
          `
     }).join('')}
     `
}

var pictures = function(pictures){
      return pictures.images['small'].url;
}

// google map inclusion
var map;
  function initMap() {
  var mapCenter = new google.maps.LatLng(47.6145, -122.3418); //Google map Coordinates
  map = new google.maps.Map($("#map")[0], {
      center: mapCenter,
      zoom: 8
      });
  }
  
  $("#find_btn").click(function (){
    if ("geolocation" in navigator){ //this line check to see if geolocation is in the DOM.
        navigator.geolocation.getCurrentPosition(function(position){ //this line gets current position
            infoWindow = new google.maps.InfoWindow({map: map}); //this is setting the information window within the map
            var pos = {lat: position.coords.latitude, lng: position.coords.longitude}; //this sets the lat lon object
            infoWindow.setPosition(pos); //this writes to the info window your lat lon and on the second line it tells the viewer it found their lat lon
            infoWindow.setContent("Found your location <br />Lat : "+position.coords.latitude+" </br>Lang :"+ position.coords.longitude);
            map.panTo(pos); //this pans the map over to the location.
          });
      }else{
        console.log("Browser doesn't support geolocation!");
    }
  });